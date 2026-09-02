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

const DEFAULT_ALUMNI = [
  {
    name: "Rahul Sharma",
    batchYear: "2005",
    currentRole: "Software Engineer",
    company: "Google, Bangalore",
    message: "The discipline and values instilled at LFS shaped the person I am today.",
    imageUrl: "",
  },
  {
    name: "Priya Singh",
    batchYear: "2008",
    currentRole: "Civil Services (IAS)",
    company: "Government of India",
    message: "My teachers believed in me before I believed in myself. Forever grateful.",
    imageUrl: "",
  },
  {
    name: "Amit Kumar",
    batchYear: "2010",
    currentRole: "Doctor (MBBS, MD)",
    company: "AIIMS, New Delhi",
    message: "LFS gave me the foundation to dream big and the courage to achieve it.",
    imageUrl: "",
  },
  {
    name: "Sneha Mishra",
    batchYear: "2012",
    currentRole: "Chartered Accountant",
    company: "Deloitte, Mumbai",
    message: "From morning assemblies to boardrooms — the LFS spirit never leaves you.",
    imageUrl: "",
  },
  {
    name: "Vikash Yadav",
    batchYear: "2003",
    currentRole: "Army Officer",
    company: "Indian Army",
    message: "The motto 'For God and Man' taught me service before self.",
    imageUrl: "",
  },
  {
    name: "Anjali Gupta",
    batchYear: "2015",
    currentRole: "Research Scientist",
    company: "IIT Kanpur",
    message: "My curiosity was first nurtured in the science labs of Little Flower School.",
    imageUrl: "",
  },
];

export const getAlumni = createServerFn({ method: 'GET' })
  .handler(async () => {
    await connectToDatabase();
    let alumni = await AlumniModel.find().sort({ _id: -1 }).lean();
    if (alumni.length === 0) {
      await AlumniModel.insertMany(DEFAULT_ALUMNI);
      alumni = await AlumniModel.find().sort({ _id: -1 }).lean();
    }
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

const DEFAULT_EXAM_SCHEDULE = [
  { term: "Unit Test I", classes: "LKG – XII", date: "15 Jul – 22 Jul 2025", status: "completed" },
  { term: "Half Yearly Examination", classes: "LKG – XII", date: "16 Sep – 30 Sep 2025", status: "completed" },
  { term: "Unit Test II", classes: "LKG – XII", date: "25 Nov – 02 Dec 2025", status: "completed" },
  { term: "Annual Examination", classes: "LKG – IX & XI", date: "17 Feb – 05 Mar 2026", status: "completed" },
  { term: "ICSE Board Exam", classes: "Class X", date: "19 Feb – 28 Mar 2026", status: "completed" },
  { term: "ISC Board Exam", classes: "Class XII", date: "13 Feb – 24 Apr 2026", status: "completed" },
  { term: "Unit Test I (2026-27)", classes: "LKG – XII", date: "14 Jul – 21 Jul 2026", status: "upcoming" },
];

const DEFAULT_EXAM_RESULTS = [
  { title: "Annual Exam Results 2025-26", classes: "LKG – IX & XI", date: "March 2026", fileUrl: "" },
  { title: "ICSE Board Results 2025-26", classes: "Class X", date: "May 2026", fileUrl: "" },
  { title: "ISC Board Results 2025-26", classes: "Class XII", date: "May 2026", fileUrl: "" },
  { title: "Half Yearly Results 2025-26", classes: "LKG – XII", date: "October 2025", fileUrl: "" },
];

const DEFAULT_EXAM_NOTICES = [
  { title: "Unit Test I Date Sheet (2026-27) Released", date: new Date("2026-07-05"), type: "Schedule" },
  { title: "Annual Exam 2025-26 Results Declared", date: new Date("2026-03-12"), type: "Result" },
  { title: "ICSE & ISC Board Exam Admit Cards Available", date: new Date("2026-02-01"), type: "Important" },
  { title: "Half Yearly Exam Revised Date Sheet", date: new Date("2025-09-10"), type: "Schedule" },
  { title: "Grading System Updated for Academic Session 2025-26", date: new Date("2025-04-20"), type: "Important" },
];

const DEFAULT_EXAM_GUIDELINES = [
  { text: "Students must carry their Admit Card to every examination.", order: 1 },
  { text: "Reach the examination hall at least 15 minutes before the scheduled time.", order: 2 },
  { text: "Use of electronic devices, including mobile phones, is strictly prohibited.", order: 3 },
  { text: "Any form of malpractice will result in immediate disqualification.", order: 4 },
  { text: "Requests for re-examination or re-evaluation must be submitted within 7 working days.", order: 5 },
  { text: "Report cards will be issued only to parents or authorized guardians during PTM.", order: 6 },
];

export const getExamSchedules = createServerFn({ method: 'GET' })
  .handler(async () => {
    await connectToDatabase();
    let schedules = await ExamScheduleModel.find().lean();
    if (schedules.length === 0) {
      await ExamScheduleModel.insertMany(DEFAULT_EXAM_SCHEDULE);
      schedules = await ExamScheduleModel.find().lean();
    }
    return schedules.map(s => ({ ...s, _id: s._id?.toString() }));
  });

export const getExamResults = createServerFn({ method: 'GET' })
  .handler(async () => {
    await connectToDatabase();
    let results = await ExamResultModel.find().sort({ _id: -1 }).lean();
    if (results.length === 0) {
      await ExamResultModel.insertMany(DEFAULT_EXAM_RESULTS);
      results = await ExamResultModel.find().sort({ _id: -1 }).lean();
    }
    return results.map(r => ({ ...r, _id: r._id?.toString() }));
  });

export const getExamNotices = createServerFn({ method: 'GET' })
  .handler(async () => {
    await connectToDatabase();
    let notices = await ExamNoticeModel.find().sort({ date: -1 }).lean();
    if (notices.length === 0) {
      await ExamNoticeModel.insertMany(DEFAULT_EXAM_NOTICES);
      notices = await ExamNoticeModel.find().sort({ date: -1 }).lean();
    }
    return notices.map(n => ({ ...n, _id: n._id?.toString() }));
  });

export const getExamGuidelines = createServerFn({ method: 'GET' })
  .handler(async () => {
    await connectToDatabase();
    let guidelines = await ExamGuidelineModel.find().sort({ order: 1 }).lean();
    if (guidelines.length === 0) {
      await ExamGuidelineModel.insertMany(DEFAULT_EXAM_GUIDELINES);
      guidelines = await ExamGuidelineModel.find().sort({ order: 1 }).lean();
    }
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

