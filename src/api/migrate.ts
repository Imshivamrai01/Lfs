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
  ExamGuidelineModel
} from '../lib/models';
import { ACHIEVERS, MANAGEMENT, EVENTS, GALLERY } from '../lib/lfs-data';

const EXAM_SCHEDULE = [
  { term: "Unit Test I", classes: "LKG – XII", date: "15 Jul – 22 Jul 2025", status: "completed" },
  { term: "Half Yearly Examination", classes: "LKG – XII", date: "16 Sep – 30 Sep 2025", status: "completed" },
  { term: "Unit Test II", classes: "LKG – XII", date: "25 Nov – 02 Dec 2025", status: "completed" },
  { term: "Annual Examination", classes: "LKG – IX & XI", date: "17 Feb – 05 Mar 2026", status: "completed" },
  { term: "ICSE Board Exam", classes: "Class X", date: "19 Feb – 28 Mar 2026", status: "completed" },
  { term: "ISC Board Exam", classes: "Class XII", date: "13 Feb – 24 Apr 2026", status: "completed" },
  { term: "Unit Test I (2026-27)", classes: "LKG – XII", date: "14 Jul – 21 Jul 2026", status: "upcoming" },
];

const EXAM_RESULTS = [
  { title: "Annual Exam Results 2025-26", classes: "LKG – IX & XI", date: "March 2026" },
  { title: "ICSE Board Results 2025-26", classes: "Class X", date: "May 2026" },
  { title: "ISC Board Results 2025-26", classes: "Class XII", date: "May 2026" },
  { title: "Half Yearly Results 2025-26", classes: "LKG – XII", date: "October 2025" },
];

const EXAM_NOTICES = [
  { title: "Unit Test I Date Sheet (2026-27) Released", date: "05 Jul 2026", type: "Schedule" },
  { title: "Annual Exam 2025-26 Results Declared", date: "12 Mar 2026", type: "Result" },
  { title: "ICSE & ISC Board Exam Admit Cards Available", date: "01 Feb 2026", type: "Important" },
  { title: "Half Yearly Exam Revised Date Sheet", date: "10 Sep 2025", type: "Schedule" },
  { title: "Grading System Updated for Academic Session 2025-26", date: "20 Apr 2025", type: "Important" },
];

const EXAM_GUIDELINES = [
  "Students must carry their Admit Card to every examination.",
  "Reach the examination hall at least 15 minutes before the scheduled time.",
  "Use of electronic devices, including mobile phones, is strictly prohibited.",
  "Any form of malpractice will result in immediate disqualification.",
  "Requests for re-examination or re-evaluation must be submitted within 7 working days.",
  "Report cards will be issued only to parents or authorized guardians during PTM.",
];

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
        if (m.role.includes('President') || m.role.includes('Secretary')) role = 'Manager';

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

    // 5. Migrate Exams
    const examScheduleCount = await ExamScheduleModel.countDocuments();
    if (examScheduleCount === 0) {
      await ExamScheduleModel.insertMany(EXAM_SCHEDULE);
    }

    const examResultCount = await ExamResultModel.countDocuments();
    if (examResultCount === 0) {
      await ExamResultModel.insertMany(EXAM_RESULTS);
    }

    const examNoticeCount = await ExamNoticeModel.countDocuments();
    if (examNoticeCount === 0) {
      const noticeDocs = EXAM_NOTICES.map(n => ({
        ...n,
        date: new Date(n.date)
      }));
      await ExamNoticeModel.insertMany(noticeDocs);
    }

    const examGuidelineCount = await ExamGuidelineModel.countDocuments();
    if (examGuidelineCount === 0) {
      const guidelineDocs = EXAM_GUIDELINES.map((g, index) => ({
        text: g,
        order: index
      }));
      await ExamGuidelineModel.insertMany(guidelineDocs);
    }

    return { success: true, message: "Migration completed successfully!" };
  });
