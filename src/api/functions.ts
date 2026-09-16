import { createServerFn } from '@tanstack/react-start';
import connectToDatabase from '../lib/db';
import { 
  AlumniModel, 
  AchieverModel, 
  EventModel, 
  AlbumModel, 
  PhotoModel, 
  ManagementModel,
  ExamScheduleModel,
  ExamResultModel,
  ExamNoticeModel,
  ExamGuidelineModel,
  PopupModel
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
    const alumni = await AlumniModel.find().sort({ _id: -1 }).lean();
    return alumni.map(a => ({ ...a, _id: a._id?.toString() }));
  });

export const registerAlumni = createServerFn({ method: 'POST' })
  .validator((data: any) => data)
  .handler(async ({ data }) => {
    await connectToDatabase();
    const newAlumni = await AlumniModel.create({
      name: data.name,
      email: data.email || '',
      phone: data.phone || '',
      batchYear: data.batchYear || 'Alumnus',
      currentRole: data.currentRole || 'Alumnus',
      company: data.company || '',
      city: data.city || '',
      message: data.message || '',
      linkedinUrl: data.linkedinUrl || '',
      imageUrl: data.imageUrl || '',
    });
    return { success: true, id: newAlumni._id.toString() };
  });

export const getAchievers = createServerFn({ method: 'GET' })
  .handler(async () => {
    await connectToDatabase();
    const achievers = await AchieverModel.find().sort({ rank: 1, pct: -1, _id: 1 }).lean();
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

export const getExamSchedules = createServerFn({ method: 'GET' })
  .handler(async () => {
    await connectToDatabase();
    const schedules = await ExamScheduleModel.find().lean();
    return schedules.map(s => ({ ...s, _id: s._id?.toString() }));
  });

export const getExamResults = createServerFn({ method: 'GET' })
  .handler(async () => {
    await connectToDatabase();
    const results = await ExamResultModel.find().sort({ _id: -1 }).lean();
    return results.map(r => ({ ...r, _id: r._id?.toString() }));
  });

export const getExamNotices = createServerFn({ method: 'GET' })
  .handler(async () => {
    await connectToDatabase();
    const notices = await ExamNoticeModel.find().sort({ date: -1 }).lean();
    return notices.map(n => ({ ...n, _id: n._id?.toString() }));
  });

export const getExamGuidelines = createServerFn({ method: 'GET' })
  .handler(async () => {
    await connectToDatabase();
    const guidelines = await ExamGuidelineModel.find().sort({ order: 1 }).lean();
    return guidelines.map(g => ({ ...g, _id: g._id?.toString() }));
  });

// --- POPUP / ANNOUNCEMENT MODAL ---
export const getActivePopup = createServerFn({ method: 'GET' })
  .handler(async () => {
    await connectToDatabase();
    const popup = await PopupModel.findOne({ isActive: true }).sort({ createdAt: -1 }).lean();
    if (!popup) return null;
    return { ...popup, _id: popup._id?.toString() };
  });

export const getPopups = createServerFn({ method: 'GET' })
  .handler(async () => {
    await connectToDatabase();
    const popups = await PopupModel.find().sort({ createdAt: -1 }).lean();
    return popups.map(p => ({ ...p, _id: p._id?.toString() }));
  });
