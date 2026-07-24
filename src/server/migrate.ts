import { createServerFn } from '@tanstack/react-start';
import connectToDatabase from '../lib/db';
import { 
  AlumniModel, 
  AchieverModel, 
  EventModel, 
  AlbumModel, 
  PhotoModel, 
  ManagementModel 
} from '../lib/models';
import { ACHIEVERS, MANAGEMENT, EVENTS, GALLERY } from '../lib/lfs-data';

export const runMigration = createServerFn({ method: 'POST' })
  .handler(async () => {
    await connectToDatabase();

    // 1. Migrate Achievers
    const achieverCount = await AchieverModel.countDocuments();
    if (achieverCount === 0) {
      const achieverDocs = ACHIEVERS.map(a => ({
        name: a.name,
        batchYear: a.exam.includes('2025-26') ? '2025-26' : 'Unknown',
        achievement: `${a.pct} in ${a.exam}`,
        category: 'Academic'
      }));
      await AchieverModel.insertMany(achieverDocs);
    }

    // 2. Migrate Management
    const mgmtCount = await ManagementModel.countDocuments();
    if (mgmtCount === 0) {
      const mgmtDocs = MANAGEMENT.map((m, index) => {
        let role = 'Staff';
        if (m.role.includes('Principal')) role = 'Principal';
        if (m.role.includes('Manager')) role = 'Manager';
        if (m.role.includes('President') || m.role.includes('Secretary')) role = 'Manager'; // mapping higher ups to Manager role for simplicity

        return {
          role,
          name: m.name,
          message: m.role,
          order: index
        };
      });
      await ManagementModel.insertMany(mgmtDocs);
    }

    // 3. Migrate Events
    const eventCount = await EventModel.countDocuments();
    if (eventCount === 0) {
      const eventDocs = EVENTS.map(e => ({
        title: e.title,
        date: new Date(e.date),
        location: e.place,
        description: `${e.time} - ${e.tag}`,
        isImportant: e.tag === 'Admissions' || e.tag === 'Results'
      }));
      await EventModel.insertMany(eventDocs);
    }

    // 4. Migrate Gallery
    const albumCount = await AlbumModel.countDocuments();
    if (albumCount === 0 && GALLERY.length > 0) {
      // Create a default album for existing gallery images
      const defaultAlbum = await AlbumModel.create({
        title: 'School Events Gallery',
        date: new Date(),
        description: 'General photos of the school events and campus.',
        coverImageUrl: GALLERY[0]
      });

      const photoDocs = GALLERY.map(url => ({
        albumId: defaultAlbum._id,
        imageUrl: url,
        caption: 'School Activity'
      }));
      await PhotoModel.insertMany(photoDocs);
    }

    return { success: true, message: "Migration completed successfully!" };
  });
