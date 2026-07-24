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

const getModel = (modelName: string) => {
  switch (modelName) {
    case 'Alumni': return AlumniModel;
    case 'Achiever': return AchieverModel;
    case 'Event': return EventModel;
    case 'Album': return AlbumModel;
    case 'Photo': return PhotoModel;
    case 'Management': return ManagementModel;
    case 'ExamSchedule': return ExamScheduleModel;
    case 'ExamResult': return ExamResultModel;
    case 'ExamNotice': return ExamNoticeModel;
    case 'ExamGuideline': return ExamGuidelineModel;
    default: throw new Error('Invalid model name');
  }
};

export const deleteDocument = createServerFn({ method: 'POST' })
  .validator((data: { modelName: string; id: string }) => data)
  .handler(async ({ data }) => {
    await connectToDatabase();
    const Model = getModel(data.modelName);
    await Model.findByIdAndDelete(data.id);
    return { success: true };
  });

export const updateDocument = createServerFn({ method: 'POST' })
  .validator((data: { modelName: string; id: string; updateData: any }) => data)
  .handler(async ({ data }) => {
    await connectToDatabase();
    const Model = getModel(data.modelName);
    await Model.findByIdAndUpdate(data.id, data.updateData);
    return { success: true };
  });

export const createDocument = createServerFn({ method: 'POST' })
  .validator((data: { modelName: string; createData: any }) => data)
  .handler(async ({ data }) => {
    await connectToDatabase();
    const Model = getModel(data.modelName);
    const doc = new Model(data.createData);
    await doc.save();
    return { success: true, id: doc._id.toString() };
  });

export const getDashboardStats = createServerFn({ method: 'GET' })
  .handler(async () => {
    await connectToDatabase();
    const [eventsCount, alumniCount, achieversCount, galleryCount] = await Promise.all([
      EventModel.countDocuments(),
      AlumniModel.countDocuments(),
      AchieverModel.countDocuments(),
      AlbumModel.countDocuments(),
    ]);

    return {
      students: "1,200+", // Hardcoded placeholder or derive from another collection
      events: eventsCount,
      alumni: alumniCount,
      achievers: achieversCount,
      albums: galleryCount,
    };
  });
