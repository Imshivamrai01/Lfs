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
    case 'Popup': return PopupModel;
    default: throw new Error(`Invalid model name: ${modelName}`);
  }
};

export const deleteDocument = createServerFn({ method: 'POST' })
  .validator((data: { modelName: string; id: string }) => data)
  .handler(async ({ data }) => {
    await connectToDatabase();
    const Model = getModel(data.modelName);
    const result = await Model.findByIdAndDelete(data.id);
    if (!result) {
      await Model.deleteOne({ _id: data.id });
    }
    return { success: true };
  });

export const updateDocument = createServerFn({ method: 'POST' })
  .validator((data: { modelName: string; id: string; updateData: any }) => data)
  .handler(async ({ data }) => {
    await connectToDatabase();
    const Model = getModel(data.modelName);
    const updateData = { ...data.updateData };
    delete updateData._id;
    delete updateData.__v;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    if (data.modelName === 'Management') {
      if (!updateData.role) updateData.role = 'Management';
      if (updateData.details && !updateData.message) updateData.message = updateData.details;
      if (!updateData.message && !updateData.details) updateData.message = '';
    }
    if ((data.modelName === 'ExamNotice' || data.modelName === 'Event' || data.modelName === 'Album') && updateData.date) {
      updateData.date = new Date(updateData.date);
    }
    if (data.modelName === 'ExamSchedule' && updateData.status) {
      updateData.status = updateData.status.toLowerCase().trim();
    }
    if (data.modelName === 'ExamGuideline' && updateData.order !== undefined) {
      updateData.order = Number(updateData.order) || 0;
    }
    if (data.modelName === 'Achiever') {
      if (updateData.rank !== undefined && updateData.rank !== '') {
        updateData.rank = Number(updateData.rank) || undefined;
      }
    }
    await Model.findByIdAndUpdate(data.id, updateData, { new: true });
    return { success: true };
  });

export const createDocument = createServerFn({ method: 'POST' })
  .validator((data: { modelName: string; createData: any }) => data)
  .handler(async ({ data }) => {
    await connectToDatabase();
    const Model = getModel(data.modelName);
    const createData = { ...data.createData };
    delete createData._id;
    delete createData.__v;

    if (data.modelName === 'Management') {
      if (!createData.role) createData.role = 'Management';
      if (!createData.details) createData.details = '';
      if (!createData.message) createData.message = createData.details || '';
      if (!createData.imageUrl) createData.imageUrl = '';
      if (createData.order === undefined) createData.order = 0;
    }
    if ((data.modelName === 'ExamNotice' || data.modelName === 'Event' || data.modelName === 'Album') && createData.date) {
      createData.date = new Date(createData.date);
    }
    if (data.modelName === 'ExamSchedule' && createData.status) {
      createData.status = createData.status.toLowerCase().trim();
    }
    if (data.modelName === 'ExamGuideline' && createData.order !== undefined) {
      createData.order = Number(createData.order) || 0;
    }
    if (data.modelName === 'Achiever') {
      if (createData.rank !== undefined && createData.rank !== '') {
        createData.rank = Number(createData.rank) || undefined;
      }
    }
    const doc = new Model(createData);
    await doc.save();
    return { success: true, id: doc._id.toString() };
  });

export const createPhotos = createServerFn({ method: 'POST' })
  .validator((data: { albumId: string; photos: Array<{ imageUrl: string; caption?: string }> }) => data)
  .handler(async ({ data }) => {
    await connectToDatabase();
    if (!data.photos || data.photos.length === 0) {
      return { success: true, count: 0 };
    }
    const docs = data.photos.map(p => ({
      albumId: data.albumId,
      imageUrl: p.imageUrl,
      caption: p.caption || '',
    }));
    await PhotoModel.insertMany(docs);
    return { success: true, count: docs.length };
  });

export const getDashboardStats = createServerFn({ method: 'GET' })
  .handler(async () => {
    await connectToDatabase();
    const [eventsCount, alumniCount, achieversCount, galleryCount, schedulesCount, resultsCount, noticesCount] = await Promise.all([
      EventModel.countDocuments(),
      AlumniModel.countDocuments(),
      AchieverModel.countDocuments(),
      AlbumModel.countDocuments(),
      ExamScheduleModel.countDocuments(),
      ExamResultModel.countDocuments(),
      ExamNoticeModel.countDocuments(),
    ]);

    return {
      students: "1,200+",
      events: eventsCount,
      alumni: alumniCount,
      achievers: achieversCount,
      albums: galleryCount,
      examSchedules: schedulesCount,
      examResults: resultsCount,
      examNotices: noticesCount,
    };
  });
