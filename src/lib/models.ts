import mongoose, { Schema, Document } from "mongoose";

// --- Alumni Schema ---
export interface IAlumni extends Document {
  name: string;
  batchYear: string;
  currentRole: string;
  company: string;
  message: string;
  imageUrl?: string;
  linkedinUrl?: string;
}

const AlumniSchema: Schema = new Schema({
  name: { type: String, required: true },
  batchYear: { type: String, required: true },
  currentRole: { type: String, required: true },
  company: { type: String, required: true },
  message: { type: String, required: true },
  imageUrl: { type: String },
  linkedinUrl: { type: String },
});

// --- Achievers Schema ---
export interface IAchiever extends Document {
  name: string;
  batchYear: string;
  achievement: string;
  exam?: string;
  pct?: string;
  rank?: number;
  imageUrl?: string;
  category: "Academic" | "Sports" | "Extracurricular";
}

const AchieverSchema: Schema = new Schema({
  name: { type: String, required: true },
  batchYear: { type: String, required: true },
  achievement: { type: String, required: true },
  exam: { type: String },
  pct: { type: String },
  rank: { type: Number },
  imageUrl: { type: String },
  category: { type: String, required: true, enum: ["Academic", "Sports", "Extracurricular"] },
});

// --- Event/Notice Schema ---
export interface IEvent extends Document {
  title: string;
  date: Date;
  location?: string;
  description: string;
  coverImage?: string;
  isImportant: boolean;
}

const EventSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String },
  description: { type: String, required: true },
  coverImage: { type: String },
  isImportant: { type: Boolean, default: false },
});

// --- Gallery Folder (Album) Schema ---
export interface IAlbum extends Document {
  title: string;
  coverImageUrl?: string;
  date: Date;
  description?: string;
}

const AlbumSchema: Schema = new Schema({
  title: { type: String, required: true },
  coverImageUrl: { type: String },
  date: { type: Date, required: true },
  description: { type: String },
});

// --- Gallery Photo Schema ---
export interface IPhoto extends Document {
  albumId: mongoose.Types.ObjectId;
  imageUrl: string;
  caption?: string;
}

const PhotoSchema: Schema = new Schema({
  albumId: { type: Schema.Types.ObjectId, ref: 'Album', required: true },
  imageUrl: { type: String, required: true },
  caption: { type: String },
});

// --- Management Schema ---
export interface IManagement extends Document {
  role: "Principal" | "Manager" | "Staff";
  name: string;
  message: string;
  imageUrl?: string;
  order: number;
}

const ManagementSchema: Schema = new Schema({
  role: { type: String, required: true },
  name: { type: String, required: true },
  message: { type: String, required: true },
  imageUrl: { type: String },
  order: { type: Number, default: 0 },
});

// --- Exam Models ---
export interface IExamSchedule extends Document {
  term: string;
  classes: string;
  date: string;
  status: "upcoming" | "ongoing" | "completed";
}

const ExamScheduleSchema: Schema = new Schema({
  term: { type: String, required: true },
  classes: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true, enum: ["upcoming", "ongoing", "completed"] },
});

export interface IExamResult extends Document {
  title: string;
  classes: string;
  date: string;
  fileUrl?: string;
}

const ExamResultSchema: Schema = new Schema({
  title: { type: String, required: true },
  classes: { type: String, required: true },
  date: { type: String, required: true },
  fileUrl: { type: String },
});

export interface IExamNotice extends Document {
  title: string;
  date: Date;
  type: "Important" | "Schedule" | "Result" | "General";
}

const ExamNoticeSchema: Schema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true, enum: ["Important", "Schedule", "Result", "General"] },
});

export interface IExamGuideline extends Document {
  text: string;
  order: number;
}

const ExamGuidelineSchema: Schema = new Schema({
  text: { type: String, required: true },
  order: { type: Number, default: 0 },
});

// --- Announcement / Event Popup Schema ---
export interface IPopup extends Document {
  title: string;
  imageUrl: string;
  description?: string;
  linkUrl?: string;
  linkText?: string;
  showText?: boolean;
  isActive: boolean;
  createdAt: Date;
}

const PopupSchema: Schema = new Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  description: { type: String },
  linkUrl: { type: String },
  linkText: { type: String, default: "Learn More" },
  showText: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Export Models (using mongoose.models to prevent OverwriteModelError in hot reload)
export const AlumniModel = mongoose.models.Alumni || mongoose.model<IAlumni>("Alumni", AlumniSchema);
export const AchieverModel = mongoose.models.Achiever || mongoose.model<IAchiever>("Achiever", AchieverSchema);
export const EventModel = mongoose.models.Event || mongoose.model<IEvent>("Event", EventSchema);
export const AlbumModel = mongoose.models.Album || mongoose.model<IAlbum>("Album", AlbumSchema);
export const PhotoModel = mongoose.models.Photo || mongoose.model<IPhoto>("Photo", PhotoSchema);
export const ManagementModel = mongoose.models.Management || mongoose.model<IManagement>("Management", ManagementSchema);
export const ExamScheduleModel = mongoose.models.ExamSchedule || mongoose.model<IExamSchedule>("ExamSchedule", ExamScheduleSchema);
export const ExamResultModel = mongoose.models.ExamResult || mongoose.model<IExamResult>("ExamResult", ExamResultSchema);
export const ExamNoticeModel = mongoose.models.ExamNotice || mongoose.model<IExamNotice>("ExamNotice", ExamNoticeSchema);
export const ExamGuidelineModel = mongoose.models.ExamGuideline || mongoose.model<IExamGuideline>("ExamGuideline", ExamGuidelineSchema);
export const PopupModel = mongoose.models.Popup || mongoose.model<IPopup>("Popup", PopupSchema);

