import { createFileRoute, useRouterState } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { runMigration } from '../../api/migrate';
import { getManagement, getAchievers, getAlumni, getEvents, getAlbums, getPhotosByAlbum, getExamSchedules, getExamResults, getExamNotices, getExamGuidelines } from '../../api/functions';
import { deleteDocument, updateDocument, createDocument, getDashboardStats } from '../../api/admin';
import { Plus, Trash2, Edit2, Loader2, X, Users, Award, GraduationCap, CalendarDays, ImageIcon, ChevronLeft, ImagePlus } from 'lucide-react';

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
});

function AdminDashboard() {
  const routerState = useRouterState();
  const currentTab = new URLSearchParams(routerState.location.search).get('tab') || 'dashboard';

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {currentTab === 'dashboard' && <DashboardTab />}
      {currentTab === 'management' && <CrudTab title="Management" modelName="Management" fetchData={getManagement} defaultState={{ name: '', role: '', details: '', imageUrl: '' }} />}
      {currentTab === 'achievers' && <CrudTab title="Achievers" modelName="Achiever" fetchData={getAchievers} defaultState={{ name: '', batchYear: '', achievement: '', exam: '', pct: '', rank: 99, category: 'Academic', imageUrl: '' }} />}
      {currentTab === 'alumni' && <CrudTab title="Alumni" modelName="Alumni" fetchData={getAlumni} defaultState={{ name: '', batchYear: '', currentRole: '', company: '', message: '', imageUrl: '', linkedinUrl: '' }} />}
      {currentTab === 'events' && <CrudTab title="Events & Notices" modelName="Event" fetchData={getEvents} defaultState={{ title: '', date: new Date().toISOString().split('T')[0], description: '', location: '', coverImage: '', isImportant: false }} />}
      {currentTab === 'gallery' && <CrudTab title="Gallery" modelName="Album" fetchData={getAlbums} defaultState={{ title: '', coverImageUrl: '', date: new Date().toISOString().split('T')[0], description: '' }} />}
      
      {currentTab === 'exam-schedules' && <CrudTab title="Exam Schedules" modelName="ExamSchedule" fetchData={getExamSchedules} defaultState={{ term: '', classes: '', date: '', status: 'upcoming' }} />}
      {currentTab === 'exam-results' && <CrudTab title="Exam Results" modelName="ExamResult" fetchData={getExamResults} defaultState={{ title: '', classes: '', date: '', fileUrl: '' }} />}
      {currentTab === 'exam-notices' && <CrudTab title="Exam Notices" modelName="ExamNotice" fetchData={getExamNotices} defaultState={{ title: '', date: new Date().toISOString().split('T')[0], type: 'General' }} />}
      {currentTab === 'exam-guidelines' && <CrudTab title="Exam Guidelines" modelName="ExamGuideline" fetchData={getExamGuidelines} defaultState={{ text: '', order: 0 }} />}
      
      {currentTab === 'enquiries' && <div className="p-12 text-center text-gray-500 bg-white rounded-xl shadow-sm border border-gray-200">Enquiries not yet connected to database.</div>}
    </div>
  );
}

function DashboardTab() {
  const [migrationStatus, setMigrationStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    getDashboardStats().then(res => setStats(res)).catch(console.error);
  }, []);

  const handleMigration = async () => {
    try {
      setLoading(true);
      const res = await runMigration();
      setMigrationStatus(res.message);
    } catch (error: any) {
      setMigrationStatus("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h2>
        <p className="text-gray-500 mt-1">Welcome to the Little Flower School Admin Portal.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <StatCard title="Events & Notices" value={stats?.events ?? '-'} icon={CalendarDays} color="from-blue-500 to-blue-600" />
        <StatCard title="Alumni Network" value={stats?.alumni ?? '-'} icon={GraduationCap} color="from-purple-500 to-purple-600" />
        <StatCard title="Top Achievers" value={stats?.achievers ?? '-'} icon={Award} color="from-amber-500 to-amber-600" />
        <StatCard title="Gallery Albums" value={stats?.albums ?? '-'} icon={ImageIcon} color="from-emerald-500 to-emerald-600" />
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-yellow-200/60 mt-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-full opacity-50 blur-3xl pointer-events-none" />
        <h3 className="text-xl font-bold text-yellow-900 mb-2 relative z-10">System Tools: Data Migration</h3>
        <p className="text-sm text-gray-600 mb-6 max-w-2xl relative z-10">
          Click the button below to migrate the hardcoded data from the old website into the new MongoDB database. You only need to run this ONCE to initially populate the system.
        </p>
        <button 
          onClick={handleMigration}
          disabled={loading}
          className="relative z-10 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-md shadow-yellow-500/20 disabled:opacity-50"
        >
          {loading ? 'Migrating Data...' : 'Run Migration Now'}
        </button>
        {migrationStatus && (
          <p className="mt-4 text-sm font-medium text-blue-800 bg-blue-50 p-4 rounded-xl border border-blue-100 relative z-10">{migrationStatus}</p>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string, value: string | number, icon: any, color: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
      <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${color}`} />
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-semibold text-gray-500">{title}</h3>
          <p className="text-4xl font-black text-gray-900 mt-2 tracking-tight">{value}</p>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white shadow-sm group-hover:scale-110 transition-transform`}>
          <Icon size={22} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}

function CrudTab({ title, modelName, fetchData, defaultState }: { title: string, modelName: string, fetchData: any, defaultState: any }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(defaultState);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [manageAlbum, setManageAlbum] = useState<any>(null);

  const loadData = () => {
    setLoading(true);
    fetchData().then((res: any) => {
      setData(res || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, [modelName]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this record?')) return;
    await deleteDocument({ data: { modelName, id }});
    loadData();
  };

  const openEdit = (record: any) => {
    setEditingId(record._id);
    const formValues = { ...defaultState };
    Object.keys(defaultState).forEach(k => {
      if (record[k] !== undefined) formValues[k] = record[k];
    });
    setFormData(formValues);
    setModalOpen(true);
  };

  const openCreate = () => {
    setEditingId(null);
    setFormData(defaultState);
    setModalOpen(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (editingId) {
      await updateDocument({ data: { modelName, id: editingId, updateData: formData }});
    } else {
      await createDocument({ data: { modelName, createData: formData }});
    }
    setModalOpen(false);
    loadData();
  };

  const handleFileUpload = async (e: any, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    setUploadingField(field);
    const formDataUpload = new FormData();
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dulns8qug';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'lfs_preset';

    formDataUpload.append('file', file);
    formDataUpload.append('upload_preset', uploadPreset);
  
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: 'POST',
        body: formDataUpload,
      });
      const data = await res.json();
      if (data.secure_url) {
        setFormData((prev: any) => ({ ...prev, [field]: data.secure_url }));
      } else {
        alert("Failed to upload: " + (data.error?.message || "Unknown error"));
      }
    } catch (err) {
      alert("Error uploading file. Make sure 'lfs_preset' is created as an Unsigned Upload Preset in your Cloudinary account.");
    } finally {
      setUploadingField(null);
    }
  };

  const columns = Object.keys(defaultState);

  if (manageAlbum) {
    return <AlbumPhotosManager album={manageAlbum} onBack={() => setManageAlbum(null)} />;
  }

  return (
    <div className="space-y-6 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-500 mt-1">Manage {title.toLowerCase()} records.</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-md shadow-blue-500/20">
          <Plus size={18} />
          Add New {modelName}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
        {loading ? (
          <div className="p-16 text-center text-gray-400 flex flex-col items-center">
            <Loader2 className="animate-spin mb-3" size={32} />
            <p className="font-medium text-sm tracking-wide uppercase">Loading Data...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="p-16 text-center text-gray-400">
            <p className="font-medium text-sm tracking-wide uppercase mb-3">No {title.toLowerCase()} found</p>
            <button onClick={openCreate} className="text-blue-600 hover:underline text-sm font-medium">Create your first entry</button>
          </div>
        ) : (
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/80 border-b border-gray-100 text-gray-500">
              <tr>
                {columns.map(c => <th key={c} className="p-4 font-semibold uppercase tracking-wider text-xs">{c}</th>)}
                <th className="p-4 font-semibold uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.map((row: any) => (
                <tr key={row._id} className="hover:bg-gray-50/50 transition-colors">
                  {columns.map(c => {
                    const isMedia = c.toLowerCase().includes('image') || c.toLowerCase().includes('video') || c.toLowerCase().includes('cover');
                    const isVideo = row[c] && typeof row[c] === 'string' && row[c].match(/\.(mp4|webm)$/i);
                    return (
                      <td key={c} className="p-4 max-w-[200px] truncate text-ellipsis overflow-hidden">
                        {isMedia && row[c] ? (
                          isVideo ? (
                            <video src={row[c]} className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200" />
                          ) : (
                            <img src={row[c]} alt="thumbnail" className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200" />
                          )
                        ) : (
                          String(row[c] || '')
                        )}
                      </td>
                    );
                  })}
                  <td className="p-4 flex justify-end items-center gap-1">
                    {modelName === 'Album' && (
                      <button onClick={() => setManageAlbum(row)} className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 rounded-lg text-xs font-bold transition-colors mr-2">
                        <ImagePlus size={14} /> Add/View Photos
                      </button>
                    )}
                    <button onClick={() => openEdit(row)} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(row._id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[100] bg-gray-900/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-black/5">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-xl font-bold text-gray-900">{editingId ? 'Edit' : 'Create'} {modelName}</h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 custom-scrollbar">
              {modelName === 'Album' && (
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-emerald-800 text-sm flex gap-3">
                  <ImagePlus className="shrink-0 mt-0.5" size={18} />
                  <p><strong>Note:</strong> Here you only set the Album cover and title. To upload photos inside this album, save this form and click the <strong>"Add/View Photos"</strong> button in the table.</p>
                </div>
              )}
              {columns.map(c => {
                const isMedia = c.toLowerCase().includes('image') || c.toLowerCase().includes('video') || c.toLowerCase().includes('cover');
                const isVideo = formData[c] && typeof formData[c] === 'string' && formData[c].match(/\.(mp4|webm)$/i);
                
                return (
                  <div key={c}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 capitalize">{c}</label>
                    {typeof defaultState[c] === 'boolean' ? (
                      <label className="relative inline-flex items-center cursor-pointer mt-1">
                        <input type="checkbox" className="sr-only peer" checked={formData[c]} onChange={(e) => setFormData({...formData, [c]: e.target.checked})} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    ) : isMedia ? (
                      <div className="space-y-3 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                        {formData[c] && (
                          <div className="relative w-full h-36 rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm">
                            {isVideo ? (
                              <video src={formData[c]} controls className="w-full h-full object-cover" />
                            ) : (
                              <img src={formData[c]} alt="preview" className="w-full h-full object-cover" />
                            )}
                          </div>
                        )}
                        <div className="flex gap-3 items-center">
                          <label className="cursor-pointer relative overflow-hidden bg-white border border-gray-200 text-sm font-medium text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm inline-block">
                            {uploadingField === c ? 'Uploading...' : 'Upload File'}
                            <input 
                              type="file" 
                              accept={c.toLowerCase().includes('video') ? "video/*" : "image/*,video/*"}
                              onChange={(e) => handleFileUpload(e, c)}
                              disabled={uploadingField === c}
                              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            />
                          </label>
                          {uploadingField === c && <Loader2 className="animate-spin text-blue-600" size={20} />}
                        </div>
                        <div className="pt-2 border-t border-gray-200/60">
                          <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1">Or Paste URL</p>
                          <input 
                            type="text" 
                            placeholder="https://..."
                            value={formData[c] || ''} 
                            onChange={(e) => setFormData({...formData, [c]: e.target.value})}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all bg-white"
                          />
                        </div>
                      </div>
                    ) : (
                      <input 
                        type={c === 'date' ? 'date' : 'text'} 
                        value={formData[c] || ''} 
                        onChange={(e) => setFormData({...formData, [c]: e.target.value})}
                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all shadow-sm text-sm"
                      />
                    )}
                  </div>
                );
              })}
              <div className="pt-6 pb-2 flex justify-end gap-3 sticky bottom-0 bg-white">
                <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-semibold text-sm transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/30">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AlbumPhotosManager({ album, onBack }: { album: any, onBack: () => void }) {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const loadPhotos = async () => {
    setLoading(true);
    try {
      const res = await getPhotosByAlbum({ data: album._id });
      setPhotos(res || []);
    } catch(e) {
      console.error(e);
    }
    setLoading(false);
  };

  useEffect(() => { loadPhotos(); }, [album._id]);

  const handleUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dulns8qug';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'lfs_preset';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: 'POST', body: formData
      });
      const data = await res.json();
      if (data.secure_url) {
        await createDocument({ data: { modelName: 'Photo', createData: { albumId: album._id, imageUrl: data.secure_url, caption: '' } } });
        loadPhotos();
      } else {
        alert("Upload failed: " + (data.error?.message || ""));
      }
    } catch(err) {
      alert("Upload error. Make sure 'lfs_preset' is created as an Unsigned Upload Preset in your Cloudinary account.");
    }
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this photo?')) return;
    await deleteDocument({ data: { modelName: 'Photo', id } });
    loadPhotos();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"><ChevronLeft size={20} /></button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Photos: {album.title}</h2>
          <p className="text-gray-500 mt-1">Upload and delete photos for this album.</p>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="mb-6 flex justify-between items-center">
           <h3 className="text-lg font-semibold">Album Photos</h3>
           <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl cursor-pointer flex items-center gap-2 text-sm font-medium transition-colors shadow-md shadow-blue-500/20">
             {uploading ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
             {uploading ? 'Uploading...' : 'Upload Photo'}
             <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
           </label>
        </div>
        
        {loading ? (
          <div className="p-12 text-center text-gray-400 flex flex-col items-center">
            <Loader2 className="animate-spin mb-3" size={24} />
            <p>Loading photos...</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="p-16 text-center text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <p className="font-medium text-sm tracking-wide uppercase mb-3">No photos in this album</p>
            <p className="text-sm">Click the upload button above to add photos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map(p => (
              <div key={p._id} className="relative group rounded-xl overflow-hidden aspect-square border border-gray-200 bg-gray-50">
                <img src={p.imageUrl} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <button onClick={() => handleDelete(p._id)} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 hover:scale-110 shadow-xl">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
