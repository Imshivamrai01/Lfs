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
import jwt from 'jsonwebtoken';

// --- AUTHENTICATION ---
export const loginAdmin = createServerFn({ method: 'POST' })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    const { email, password } = data;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ admin: true }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
      return { success: true, token };
    }
    throw new Error('Invalid credentials');
  });

// --- FETCH FUNCTIONS (Public) ---

export const getAlumni = createServerFn({ method: 'GET' })
  .handler(async () => {
    await connectToDatabase();
    const alumni = await AlumniModel.find().lean();
    return alumni.map(a => ({ ...a, _id: a._id?.toString() }));
  });

export const getAchievers = createServerFn({ method: 'GET' })
  .handler(async () => {
    await connectToDatabase();
    const achievers = await AchieverModel.find().lean();
    return achievers.map(a => ({ ...a, _id: a._id?.toString() }));
  });

export const getEvents = createServerFn({ method: 'GET' })
  .handler(async () => {
    await connectToDatabase();
    const events = await EventModel.find().sort({ date: -1 }).lean();
    return events.map(e => ({ ...e, _id: e._id?.toString() }));
  });

export const getAlbums = createServerFn({ method: 'GET' })
  .handler(async () => {
    await connectToDatabase();
    const albums = await AlbumModel.find().sort({ date: -1 }).lean();
    return albums.map(a => ({ ...a, _id: a._id?.toString() }));
  });

export const getPhotosByAlbum = createServerFn({ method: 'GET' })
  .validator((albumId: string) => albumId)
  .handler(async ({ data: albumId }) => {
    await connectToDatabase();
    const photos = await PhotoModel.find({ albumId }).lean();
    return photos.map(p => ({ ...p, _id: p._id?.toString(), albumId: p.albumId?.toString() }));
  });

export const getManagement = createServerFn({ method: 'GET' })
  .handler(async () => {
    await connectToDatabase();
    const management = await ManagementModel.find().sort({ order: 1 }).lean();
    return management.map(m => ({ ...m, _id: m._id?.toString() }));
  });
