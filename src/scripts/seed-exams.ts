import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/little-flower-school";

const EXAM_SCHEDULE = [
  {
    term: "Unit Test I",
    classes: "LKG – XII",
    date: "15 Jul – 22 Jul 2025",
    status: "completed",
  },
  {
    term: "Half Yearly Examination",
    classes: "LKG – XII",
    date: "16 Sep – 30 Sep 2025",
    status: "completed",
  },
  {
    term: "Unit Test II",
    classes: "LKG – XII",
    date: "25 Nov – 02 Dec 2025",
    status: "completed",
  },
  {
    term: "Annual Examination",
    classes: "LKG – IX & XI",
    date: "17 Feb – 05 Mar 2026",
    status: "completed",
  },
  {
    term: "ICSE Board Exam",
    classes: "Class X",
    date: "19 Feb – 28 Mar 2026",
    status: "completed",
  },
  {
    term: "ISC Board Exam",
    classes: "Class XII",
    date: "13 Feb – 24 Apr 2026",
    status: "completed",
  },
  {
    term: "Unit Test I (2026-27)",
    classes: "LKG – XII",
    date: "14 Jul – 21 Jul 2026",
    status: "upcoming",
  },
];

const RESULTS = [
  {
    title: "Annual Exam Results 2025-26",
    classes: "LKG – IX & XI",
    date: "March 2026",
  },
  {
    title: "ICSE Board Results 2025-26",
    classes: "Class X",
    date: "May 2026",
  },
  {
    title: "ISC Board Results 2025-26",
    classes: "Class XII",
    date: "May 2026",
  },
  {
    title: "Half Yearly Results 2025-26",
    classes: "LKG – XII",
    date: "October 2025",
  },
];

const NOTICES = [
  {
    title: "Unit Test I Date Sheet (2026-27) Released",
    date: "05 Jul 2026",
    type: "Schedule",
  },
  {
    title: "Annual Exam 2025-26 Results Declared",
    date: "12 Mar 2026",
    type: "Result",
  },
  {
    title: "ICSE & ISC Board Exam Admit Cards Available",
    date: "01 Feb 2026",
    type: "Important",
  },
  {
    title: "Half Yearly Exam Revised Date Sheet",
    date: "10 Sep 2025",
    type: "Schedule",
  },
  {
    title: "Grading System Updated for Academic Session 2025-26",
    date: "20 Apr 2025",
    type: "Important",
  },
];

const GUIDELINES = [
  "Students must carry their Admit Card to every examination.",
  "Reach the examination hall at least 15 minutes before the scheduled time.",
  "Use of electronic devices, including mobile phones, is strictly prohibited.",
  "Any form of malpractice will result in immediate disqualification.",
  "Requests for re-examination or re-evaluation must be submitted within 7 working days.",
  "Report cards will be issued only to parents or authorized guardians during PTM.",
];

// Re-defining models here to avoid running Next.js/React code in a standalone script
const Schema = mongoose.Schema;

const ExamScheduleSchema = new Schema({
  term: { type: String, required: true },
  classes: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true, enum: ["upcoming", "ongoing", "completed"] },
});
const ExamScheduleModel = mongoose.models.ExamSchedule || mongoose.model("ExamSchedule", ExamScheduleSchema);

const ExamResultSchema = new Schema({
  title: { type: String, required: true },
  classes: { type: String, required: true },
  date: { type: String, required: true },
  fileUrl: { type: String },
});
const ExamResultModel = mongoose.models.ExamResult || mongoose.model("ExamResult", ExamResultSchema);

const ExamNoticeSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true, enum: ["Important", "Schedule", "Result", "General"] },
});
const ExamNoticeModel = mongoose.models.ExamNotice || mongoose.model("ExamNotice", ExamNoticeSchema);

const ExamGuidelineSchema = new Schema({
  text: { type: String, required: true },
  order: { type: Number, default: 0 },
});
const ExamGuidelineModel = mongoose.models.ExamGuideline || mongoose.model("ExamGuideline", ExamGuidelineSchema);


async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB...");
    
    // Clear existing data
    await ExamScheduleModel.deleteMany({});
    await ExamResultModel.deleteMany({});
    await ExamNoticeModel.deleteMany({});
    await ExamGuidelineModel.deleteMany({});
    
    // Insert Schedule
    await ExamScheduleModel.insertMany(EXAM_SCHEDULE);
    console.log("Inserted Exam Schedules");
    
    // Insert Results
    await ExamResultModel.insertMany(RESULTS);
    console.log("Inserted Exam Results");
    
    // Insert Notices
    const formattedNotices = NOTICES.map(n => ({ ...n, date: new Date(n.date) }));
    await ExamNoticeModel.insertMany(formattedNotices);
    console.log("Inserted Exam Notices");
    
    // Insert Guidelines
    const formattedGuidelines = GUIDELINES.map((g, i) => ({ text: g, order: i }));
    await ExamGuidelineModel.insertMany(formattedGuidelines);
    console.log("Inserted Exam Guidelines");
    
    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
}

seed();
