import mongoose from "mongoose";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable inside .env");
  }

  if (cached.conn && cached.conn.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    console.log("[MongoDB] Connecting to database...");
    cached.promise = mongoose.connect(MONGO_URI, opts).then((m) => {
      console.log("✅ [MongoDB] Connected successfully to:", m.connection.name);
      return m;
    }).catch((err) => {
      console.error("❌ [MongoDB] Connection error:", err.message);
      cached.promise = null;
      cached.conn = null;
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    cached.conn = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;

