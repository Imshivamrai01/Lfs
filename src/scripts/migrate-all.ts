import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

/**
 * MIGRATION SCRIPT:
 * 1. Reads all data from Source MongoDB
 * 2. Uploads all images found in documents / static data to Destination Cloudinary
 * 3. Updates image URLs to the new Cloudinary URLs
 * 4. Inserts all updated documents into Destination MongoDB
 *
 * HOW TO RUN:
 * Pass the new credentials as environment variables or update the CONFIG below, then run:
 * npx tsx src/scripts/migrate-all.ts
 */

const CONFIG = {
  // SOURCE (Old) Credentials
  SOURCE_MONGO_URI: process.env.SOURCE_MONGO_URI || process.env.MONGO_URI || '',
  
  // DESTINATION (New) Credentials
  DEST_MONGO_URI: process.env.DEST_MONGO_URI || '',
  
  DEST_CLOUDINARY: {
    cloud_name: process.env.DEST_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || '',
    api_key: process.env.DEST_CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY || '',
    api_secret: process.env.DEST_CLOUDINARY_API_SECRET || process.env.CLOUDINARY_API_SECRET || '',
  },
  
  DEST_FOLDER: 'lfs', // Folder name in new Cloudinary
};

// Configure destination cloudinary
cloudinary.config({
  cloud_name: CONFIG.DEST_CLOUDINARY.cloud_name,
  api_key: CONFIG.DEST_CLOUDINARY.api_key,
  api_secret: CONFIG.DEST_CLOUDINARY.api_secret,
});

// Cache uploaded URLs to prevent duplicate uploads of the same image
const urlCache = new Map<string, string>();

async function uploadToNewCloudinary(oldUrl: string): Promise<string> {
  if (!oldUrl || typeof oldUrl !== 'string' || !oldUrl.startsWith('http')) {
    return oldUrl;
  }

  // If already uploaded during this run, return cached new URL
  if (urlCache.has(oldUrl)) {
    return urlCache.get(oldUrl)!;
  }

  try {
    console.log(`  [Cloudinary] Uploading: ${oldUrl.slice(0, 70)}...`);
    const result = await cloudinary.uploader.upload(oldUrl, {
      folder: CONFIG.DEST_FOLDER,
      resource_type: 'auto',
    });
    console.log(`  [Cloudinary] -> Uploaded successfully to: ${result.secure_url}`);
    urlCache.set(oldUrl, result.secure_url);
    return result.secure_url;
  } catch (error: any) {
    console.warn(`  [Cloudinary] Failed to upload ${oldUrl}: ${error?.message || error}. Keeping original URL.`);
    return oldUrl;
  }
}

async function migrate() {
  console.log('==================================================');
  console.log('🚀 Starting Little Flower School Migration Process');
  console.log('==================================================');

  if (!CONFIG.SOURCE_MONGO_URI) {
    console.error('❌ Error: SOURCE_MONGO_URI is missing in environment or config.');
    process.exit(1);
  }

  if (!CONFIG.DEST_MONGO_URI) {
    console.error('❌ Error: DEST_MONGO_URI is missing. Please provide your new MongoDB connection string.');
    console.error('   Example: DEST_MONGO_URI="mongodb+srv://..." npx tsx src/scripts/migrate-all.ts');
    process.exit(1);
  }

  if (!CONFIG.DEST_CLOUDINARY.cloud_name || !CONFIG.DEST_CLOUDINARY.api_key || !CONFIG.DEST_CLOUDINARY.api_secret) {
    console.warn('⚠️ Warning: DEST_CLOUDINARY credentials are not fully set. Images may not migrate.');
  }

  // 1. Connect to Source Mongo
  console.log('\n📦 Connecting to Source MongoDB...');
  const sourceConn = await mongoose.createConnection(CONFIG.SOURCE_MONGO_URI).asPromise();
  console.log('✅ Connected to Source MongoDB.');

  // 2. Connect to Destination Mongo
  console.log('\n📦 Connecting to Destination MongoDB...');
  const destConn = await mongoose.createConnection(CONFIG.DEST_MONGO_URI).asPromise();
  console.log('✅ Connected to Destination MongoDB.');

  // List all collections in Source DB
  const collections = await sourceConn.db?.listCollections().toArray();
  const collectionNames = (collections || []).map((c) => c.name).filter((name) => !name.startsWith('system.'));

  console.log(`\n📋 Found ${collectionNames.length} collections in Source DB:`, collectionNames);

  for (const colName of collectionNames) {
    console.log(`\n--------------------------------------------------`);
    console.log(`🔄 Migrating collection: "${colName}"`);
    console.log(`--------------------------------------------------`);

    const sourceCol = sourceConn.collection(colName);
    const destCol = destConn.collection(colName);

    const docs = await sourceCol.find({}).toArray();
    console.log(`Found ${docs.length} documents in "${colName}".`);

    if (docs.length === 0) continue;

    const updatedDocs = [];

    for (const doc of docs) {
      const cloned = { ...doc };

      // Check known image fields and migrate them to new Cloudinary
      if (cloned.imageUrl) {
        cloned.imageUrl = await uploadToNewCloudinary(cloned.imageUrl);
      }
      if (cloned.coverImage) {
        cloned.coverImage = await uploadToNewCloudinary(cloned.coverImage);
      }
      if (cloned.coverImageUrl) {
        cloned.coverImageUrl = await uploadToNewCloudinary(cloned.coverImageUrl);
      }
      if (cloned.fileUrl) {
        cloned.fileUrl = await uploadToNewCloudinary(cloned.fileUrl);
      }

      updatedDocs.push(cloned);
    }

    // Insert or replace into Destination collection
    // Using bulkWrite with upsert by _id so existing IDs & relationships (e.g., albumId) are preserved
    const bulkOps = updatedDocs.map((doc) => ({
      replaceOne: {
        filter: { _id: doc._id },
        replacement: doc,
        upsert: true,
      },
    }));

    if (bulkOps.length > 0) {
      await destCol.bulkWrite(bulkOps);
      console.log(`✅ Successfully synced ${updatedDocs.length} documents into destination collection "${colName}".`);
    }
  }

  console.log('\n==================================================');
  console.log('🎉 Migration Completed Successfully!');
  console.log(`🖼️ Total Unique Images Migrated: ${urlCache.size}`);
  console.log('==================================================\n');

  await sourceConn.close();
  await destConn.close();
  process.exit(0);
}

migrate().catch((err) => {
  console.error('❌ Migration failed with error:', err);
  process.exit(1);
});
