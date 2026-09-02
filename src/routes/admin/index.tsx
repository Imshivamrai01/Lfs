import { createFileRoute, useRouterState } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { runMigration } from '../../api/migrate';
import { getManagement, getAchievers, getAlumni, getEvents, getAlbums, getPhotosByAlbum, getExamSchedules, getExamResults, getExamNotices, getExamGuidelines, getPopups } from '../../api/functions';
import { deleteDocument, updateDocument, createDocument, createPhotos, getDashboardStats } from '../../api/admin';
import { Plus, Trash2, Edit2, Loader2, X, Users, Award, GraduationCap, CalendarDays, ImageIcon, ChevronLeft, ImagePlus, Megaphone, Eye, ExternalLink, Sparkles, Check, Power, UploadCloud, AlertCircle, CheckCircle2 } from 'lucide-react';

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
});

function AdminDashboard() {
  const routerState = useRouterState();
  const currentTab = new URLSearchParams(routerState.location.search).get('tab') || 'dashboard';

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {currentTab === 'dashboard' && <DashboardTab />}
      {currentTab === 'popup' && <PopupTab />}
      {currentTab === 'management' && <CrudTab title="Management" modelName="Management" fetchData={getManagement} defaultState={{ name: '', role: '', details: '', imageUrl: '', order: 0 }} />}
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard title="Exam Schedules" value={stats?.examSchedules ?? '-'} icon={CalendarDays} color="from-indigo-500 to-indigo-600" />
        <StatCard title="Exam Results" value={stats?.examResults ?? '-'} icon={Award} color="from-teal-500 to-teal-600" />
        <StatCard title="Exam Notices" value={stats?.examNotices ?? '-'} icon={Megaphone} color="from-rose-500 to-rose-600" />
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
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

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
    setFormError(null);
    const formValues = { ...defaultState };
    Object.keys(defaultState).forEach(k => {
      if (record[k] !== undefined) {
        if (k === 'date' && (modelName === 'Event' || modelName === 'ExamNotice')) {
          try {
            formValues[k] = new Date(record[k]).toISOString().split('T')[0];
          } catch {
            formValues[k] = record[k];
          }
        } else {
          formValues[k] = record[k];
        }
      }
    });
    setFormData(formValues);
    setModalOpen(true);
  };

  const openCreate = () => {
    setEditingId(null);
    setFormError(null);
    setFormData(defaultState);
    setModalOpen(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    try {
      if (editingId) {
        await updateDocument({ data: { modelName, id: editingId, updateData: formData }});
      } else {
        await createDocument({ data: { modelName, createData: formData }});
      }
      setModalOpen(false);
      loadData();
    } catch (err: any) {
      console.error("Save error:", err);
      setFormError(err?.message || "Failed to save. Please make sure all required fields are filled.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileUpload = async (e: any, field: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    setUploadingField(field);
    const formDataUpload = new FormData();
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dulns8qug';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'lfssalempur';

    formDataUpload.append('file', file);
    formDataUpload.append('upload_preset', uploadPreset);
  
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
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
      alert("Error uploading file. Make sure 'lfssalempur' upload preset is configured.");
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
                    const isFile = c.toLowerCase().includes('file') || c.toLowerCase().includes('pdf') || c.toLowerCase().includes('doc');
                    const isVideo = row[c] && typeof row[c] === 'string' && row[c].match(/\.(mp4|webm)$/i);
                    return (
                      <td key={c} className="p-4 max-w-[220px] truncate text-ellipsis overflow-hidden">
                        {isMedia && row[c] ? (
                          isVideo ? (
                            <video src={row[c]} className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200" />
                          ) : (
                            <img src={row[c]} alt="thumbnail" className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200" />
                          )
                        ) : isFile && row[c] ? (
                          <a href={row[c]} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-medium transition-colors">
                            <ExternalLink size={12} /> View File
                          </a>
                        ) : c === 'status' ? (
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            row[c] === 'upcoming' 
                              ? 'bg-amber-100 text-amber-800' 
                              : row[c] === 'ongoing' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100 text-gray-700'
                          }`}>
                            {row[c] === 'upcoming' ? 'Upcoming' : row[c] === 'ongoing' ? 'Ongoing' : 'Completed'}
                          </span>
                        ) : c === 'type' && modelName === 'ExamNotice' ? (
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            row[c] === 'Important' 
                              ? 'bg-red-100 text-red-800' 
                              : row[c] === 'Result' 
                                ? 'bg-emerald-100 text-emerald-800' 
                                : row[c] === 'Schedule'
                                  ? 'bg-indigo-100 text-indigo-800'
                                  : 'bg-gray-100 text-gray-700'
                          }`}>
                            {row[c]}
                          </span>
                        ) : c === 'date' && (modelName === 'ExamNotice' || modelName === 'Event') && row[c] ? (
                          new Date(row[c]).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
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
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-start gap-2.5">
                  <AlertCircle className="shrink-0 mt-0.5 text-red-500" size={18} />
                  <div>
                    <p className="font-semibold">Error saving record</p>
                    <p className="text-xs text-red-600 mt-0.5">{formError}</p>
                  </div>
                </div>
              )}
              {modelName === 'Album' && (
                <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-emerald-800 text-sm flex gap-3">
                  <ImagePlus className="shrink-0 mt-0.5" size={18} />
                  <p><strong>Note:</strong> Here you only set the Album cover and title. To upload photos inside this album, save this form and click the <strong>"Add/View Photos"</strong> button in the table.</p>
                </div>
              )}
              {columns.map(c => {
                const isMedia = c.toLowerCase().includes('image') || c.toLowerCase().includes('video') || c.toLowerCase().includes('cover');
                const isFile = c.toLowerCase().includes('file') || c.toLowerCase().includes('pdf') || c.toLowerCase().includes('doc');
                const isVideo = formData[c] && typeof formData[c] === 'string' && formData[c].match(/\.(mp4|webm)$/i);
                
                return (
                  <div key={c}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 capitalize">{c}</label>
                    {typeof defaultState[c] === 'boolean' ? (
                      <label className="relative inline-flex items-center cursor-pointer mt-1">
                        <input type="checkbox" className="sr-only peer" checked={formData[c]} onChange={(e) => setFormData({...formData, [c]: e.target.checked})} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    ) : c === 'status' && modelName === 'ExamSchedule' ? (
                      <select
                        value={formData[c] || 'upcoming'}
                        onChange={(e) => setFormData({...formData, [c]: e.target.value})}
                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all shadow-sm text-sm bg-white"
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                      </select>
                    ) : c === 'type' && modelName === 'ExamNotice' ? (
                      <select
                        value={formData[c] || 'General'}
                        onChange={(e) => setFormData({...formData, [c]: e.target.value})}
                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all shadow-sm text-sm bg-white"
                      >
                        <option value="General">General</option>
                        <option value="Important">Important</option>
                        <option value="Schedule">Schedule</option>
                        <option value="Result">Result</option>
                      </select>
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
                    ) : isFile ? (
                      <div className="space-y-3 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                        {formData[c] && (
                          <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                            <span className="text-xs text-gray-600 truncate max-w-[280px]">{formData[c]}</span>
                            <a href={formData[c]} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 text-xs font-semibold flex items-center gap-1">
                              <ExternalLink size={12} /> Test Link
                            </a>
                          </div>
                        )}
                        <div className="flex gap-3 items-center">
                          <label className="cursor-pointer relative overflow-hidden bg-white border border-gray-200 text-sm font-medium text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm inline-block">
                            {uploadingField === c ? 'Uploading PDF...' : 'Upload PDF / Result Document'}
                            <input 
                              type="file" 
                              accept=".pdf,.doc,.docx,application/pdf,image/*"
                              onChange={(e) => handleFileUpload(e, c)}
                              disabled={uploadingField === c}
                              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            />
                          </label>
                          {uploadingField === c && <Loader2 className="animate-spin text-blue-600" size={20} />}
                        </div>
                        <div className="pt-2 border-t border-gray-200/60">
                          <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-1">Or Direct Link (Google Drive / Cloudinary / Web)</p>
                          <input 
                            type="text" 
                            placeholder="https://... (URL to result PDF)"
                            value={formData[c] || ''} 
                            onChange={(e) => setFormData({...formData, [c]: e.target.value})}
                            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none transition-all bg-white"
                          />
                        </div>
                      </div>
                    ) : (
                      <input 
                        type={
                          c === 'date' && (modelName === 'Event' || modelName === 'ExamNotice')
                            ? 'date' 
                            : c === 'order' || c === 'rank' 
                              ? 'number' 
                              : 'text'
                        } 
                        placeholder={
                          c === 'date' && modelName === 'ExamSchedule' 
                            ? 'e.g. 15 Jul – 22 Jul 2026' 
                            : c === 'date' && modelName === 'ExamResult'
                              ? 'e.g. March 2026 or May 2026'
                              : ''
                        }
                        value={formData[c] ?? ''} 
                        onChange={(e) => setFormData({...formData, [c]: c === 'order' || c === 'rank' ? Number(e.target.value) : e.target.value})}
                        className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none transition-all shadow-sm text-sm"
                      />
                    )}
                  </div>
                );
              })}
              <div className="pt-6 pb-2 flex justify-end gap-3 sticky bottom-0 bg-white">
                <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-semibold text-sm transition-colors">Cancel</button>
                <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-semibold text-sm shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-2">
                  {submitting && <Loader2 className="animate-spin" size={16} />}
                  {submitting ? 'Saving...' : 'Save Changes'}
                </button>
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
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number; percentage: number }>({ current: 0, total: 0, percentage: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const loadPhotos = async () => {
    setLoading(true);
    try {
      const res = await getPhotosByAlbum({ data: album._id });
      setPhotos(res || []);
    } catch(e) {
      console.error("Failed to load album photos:", e);
    }
    setLoading(false);
  };

  useEffect(() => { loadPhotos(); }, [album._id]);

  const processFiles = async (fileList: FileList | File[]) => {
    const rawFiles = Array.from(fileList);
    const validImageFiles = rawFiles.filter(f => f.type.startsWith('image/'));
    
    if (validImageFiles.length === 0) {
      alert("Please select valid image files (JPG, PNG, WEBP, etc.)");
      return;
    }

    setUploading(true);
    setStatusMessage(null);
    setUploadProgress({ current: 0, total: validImageFiles.length, percentage: 0 });

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dulns8qug';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'lfs_preset';

    const uploadedUrls: string[] = [];
    let completedCount = 0;

    // Upload in batches of 3 concurrently for fast and reliable performance
    const BATCH_SIZE = 3;
    for (let i = 0; i < validImageFiles.length; i += BATCH_SIZE) {
      const batch = validImageFiles.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', uploadPreset);

          try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
              method: 'POST',
              body: formData
            });
            const data = await res.json();
            if (data.secure_url) {
              uploadedUrls.push(data.secure_url);
            } else {
              console.error(`Upload error for ${file.name}:`, data.error);
            }
          } catch (err) {
            console.error(`Failed to upload ${file.name}:`, err);
          } finally {
            completedCount++;
            setUploadProgress({
              current: completedCount,
              total: validImageFiles.length,
              percentage: Math.round((completedCount / validImageFiles.length) * 100)
            });
          }
        })
      );
    }

    if (uploadedUrls.length > 0) {
      try {
        await createPhotos({
          data: {
            albumId: album._id,
            photos: uploadedUrls.map(url => ({ imageUrl: url, caption: '' }))
          }
        });
        setStatusMessage({
          text: `Successfully uploaded and saved ${uploadedUrls.length} photo(s)!`,
          type: 'success'
        });
        loadPhotos();
      } catch (err: any) {
        console.error("Error saving photos to database:", err);
        setStatusMessage({
          text: "Photos uploaded to cloud but failed to save to database. " + (err?.message || ''),
          type: 'error'
        });
      }
    } else {
      setStatusMessage({
        text: "Could not upload images. Please verify your Cloudinary upload preset.",
        type: 'error'
      });
    }

    setUploading(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      e.target.value = ''; // Reset input so same files can be re-selected if needed
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this photo from album?')) return;
    await deleteDocument({ data: { modelName: 'Photo', id } });
    loadPhotos();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors shadow-sm text-gray-700">
            <ChevronLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">{album.title}</h2>
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 font-semibold text-xs rounded-full border border-blue-200/60">
                {photos.length} photos
              </span>
            </div>
            <p className="text-gray-500 text-sm mt-0.5">Select and upload multiple photos at once for this gallery album.</p>
          </div>
        </div>

        <label className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl cursor-pointer flex items-center justify-center gap-2 text-sm font-medium transition-all shadow-md shadow-blue-500/20 shrink-0">
          {uploading ? <Loader2 className="animate-spin" size={16} /> : <UploadCloud size={18} />}
          {uploading ? `Uploading (${uploadProgress.current}/${uploadProgress.total})...` : 'Select Multiple Photos'}
          <input 
            type="file" 
            accept="image/*" 
            multiple 
            className="hidden" 
            onChange={handleFileInputChange} 
            disabled={uploading} 
          />
        </label>
      </div>

      {/* Drag & Drop Upload Box */}
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
          isDragging 
            ? 'border-blue-500 bg-blue-50/60 ring-4 ring-blue-500/10 scale-[0.99]' 
            : 'border-gray-300 hover:border-gray-400 bg-white/70 shadow-sm'
        }`}
      >
        <div className="max-w-md mx-auto flex flex-col items-center">
          <div className={`p-3.5 rounded-2xl mb-3 transition-colors ${isDragging ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-600'}`}>
            <UploadCloud size={28} />
          </div>
          <h3 className="font-bold text-gray-900 text-base">Drag & Drop multiple images here</h3>
          <p className="text-gray-500 text-xs mt-1 mb-4">
            Upload single or bulk photos at once (JPG, PNG, WebP). Max 10MB per file.
          </p>
          <label className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold px-4 py-2 rounded-xl text-xs cursor-pointer shadow-sm transition-colors">
            Browse Files on Computer
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              className="hidden" 
              onChange={handleFileInputChange} 
              disabled={uploading} 
            />
          </label>
        </div>
      </div>

      {/* Upload Progress Card */}
      {uploading && (
        <div className="bg-blue-50/90 border border-blue-200 p-5 rounded-2xl shadow-sm space-y-3">
          <div className="flex justify-between items-center text-sm font-semibold text-blue-900">
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin text-blue-600" size={18} />
              <span>Uploading images to cloud... ({uploadProgress.current} / {uploadProgress.total} completed)</span>
            </div>
            <span className="text-blue-700 font-bold">{uploadProgress.percentage}%</span>
          </div>
          <div className="w-full h-3 bg-blue-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 rounded-full"
              style={{ width: `${uploadProgress.percentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Status Alert Banner */}
      {statusMessage && (
        <div className={`p-4 rounded-xl text-sm font-medium flex items-center justify-between gap-3 ${
          statusMessage.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          <div className="flex items-center gap-2">
            {statusMessage.type === 'success' ? <CheckCircle2 size={18} className="text-emerald-600 shrink-0" /> : <AlertCircle size={18} className="text-red-600 shrink-0" />}
            <span>{statusMessage.text}</span>
          </div>
          <button onClick={() => setStatusMessage(null)} className="text-gray-400 hover:text-gray-600">
            <X size={16} />
          </button>
        </div>
      )}
      
      {/* Photos Grid */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="mb-5 flex justify-between items-center">
           <h3 className="text-lg font-bold text-gray-900">Album Photos ({photos.length})</h3>
        </div>
        
        {loading ? (
          <div className="p-16 text-center text-gray-400 flex flex-col items-center">
            <Loader2 className="animate-spin mb-3 text-blue-500" size={28} />
            <p className="text-sm font-medium">Loading photos...</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="p-16 text-center text-gray-400 bg-gray-50/70 rounded-2xl border border-dashed border-gray-200">
            <ImageIcon className="mx-auto mb-3 text-gray-300" size={40} />
            <p className="font-semibold text-sm text-gray-600 mb-1">No photos in this album yet</p>
            <p className="text-xs text-gray-400">Drag & drop photos above or use the "Select Multiple Photos" button.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {photos.map(p => (
              <div key={p._id} className="relative group rounded-xl overflow-hidden aspect-square border border-gray-200 bg-gray-50 shadow-sm">
                <img src={p.imageUrl} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <button 
                  onClick={() => handleDelete(p._id)} 
                  title="Delete Photo"
                  className="absolute bottom-2.5 right-2.5 bg-red-500 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 hover:scale-105 shadow-md"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PopupTab() {
  const [popups, setPopups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewPopup, setPreviewPopup] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
    description: '',
    linkUrl: '',
    linkText: 'Learn More',
    showText: true,
    isActive: true,
  });

  const loadPopups = async () => {
    setLoading(true);
    try {
      const res = await getPopups();
      setPopups(res || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPopups();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setFormData({
      title: '',
      imageUrl: '',
      description: '',
      linkUrl: '',
      linkText: 'Learn More',
      showText: true,
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEdit = (p: any) => {
    setEditingId(p._id);
    setFormData({
      title: p.title || '',
      imageUrl: p.imageUrl || '',
      description: p.description || '',
      linkUrl: p.linkUrl || '',
      linkText: p.linkText || 'Learn More',
      showText: p.showText ?? true,
      isActive: p.isActive ?? true,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this popup?')) return;
    try {
      await deleteDocument({ data: { modelName: 'Popup', id } });
      loadPopups();
    } catch (err: any) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const handleToggleActive = async (p: any) => {
    try {
      await updateDocument({
        data: {
          modelName: 'Popup',
          id: p._id,
          updateData: { isActive: !p.isActive },
        },
      });
      loadPopups();
    } catch (err: any) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleImageUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

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
        setFormData((prev) => ({ ...prev, imageUrl: data.secure_url }));
      } else {
        alert('Failed to upload image: ' + (data.error?.message || 'Unknown error'));
      }
    } catch (err) {
      alert('Error uploading file. Make sure Cloudinary preset is configured.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl) {
      alert('Please provide a Title and an Image.');
      return;
    }

    try {
      if (editingId) {
        await updateDocument({
          data: {
            modelName: 'Popup',
            id: editingId,
            updateData: formData,
          },
        });
      } else {
        await createDocument({
          data: {
            modelName: 'Popup',
            createData: formData,
          },
        });
      }
      setModalOpen(false);
      loadPopups();
    } catch (err: any) {
      alert('Failed to save: ' + err.message);
    }
  };

  const activePopup = popups.find((p) => p.isActive);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl shadow-blue-950/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 text-yellow-400 text-xs font-bold uppercase tracking-widest mb-2">
            <Sparkles size={14} /> Website Homepage Popup
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight">Announcement & Event Popups</h2>
          <p className="text-blue-200 text-sm mt-1 max-w-xl">
            Upload event flyers, admission notices, or festival greetings that automatically show in a popup when visitors open the website.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="relative z-10 flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-blue-950 px-5 py-3 rounded-2xl font-bold text-sm transition-transform active:scale-95 shadow-lg shadow-yellow-400/20"
        >
          <Plus size={18} strokeWidth={2.5} />
          Create New Popup
        </button>
      </div>

      {/* Active Popup Status Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${activePopup ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-400'}`}>
            <Megaphone size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${activePopup ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'}`}>
                {activePopup ? '● LIVE ON WEBSITE' : '○ NO ACTIVE POPUP'}
              </span>
              {activePopup && (
                <span className="text-xs text-gray-500 font-medium truncate max-w-xs sm:max-w-md">
                  Showing: <strong className="text-gray-800 font-semibold">{activePopup.title}</strong>
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {activePopup
                ? 'Visitors will see this popup modal when opening the website homepage.'
                : 'Turn on the switch on any popup below to display it to visitors.'}
            </p>
          </div>
        </div>

        {activePopup && (
          <button
            onClick={() => setPreviewPopup(activePopup)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition-colors shrink-0"
          >
            <Eye size={16} /> Live Preview
          </button>
        )}
      </div>

      {/* Popups List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 text-base">All Popups & Notices ({popups.length})</h3>
        </div>

        {loading ? (
          <div className="p-16 text-center text-gray-400 flex flex-col items-center">
            <Loader2 className="animate-spin mb-3" size={32} />
            <p className="font-medium text-sm tracking-wide uppercase">Loading Popups...</p>
          </div>
        ) : popups.length === 0 ? (
          <div className="p-16 text-center text-gray-400">
            <Megaphone size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="font-medium text-sm tracking-wide uppercase mb-1">No Popups Created Yet</p>
            <p className="text-xs text-gray-400 mb-4">Create your first popup banner to show notices to visitors.</p>
            <button
              onClick={openCreate}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-colors shadow-sm"
            >
              Create First Popup
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {popups.map((p) => (
              <div
                key={p._id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between bg-white ${
                  p.isActive
                    ? 'border-emerald-300 shadow-md ring-2 ring-emerald-400/20'
                    : 'border-gray-200 hover:border-gray-300 shadow-sm'
                }`}
              >
                <div>
                  {/* Image Poster */}
                  <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden group">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shadow-md backdrop-blur-md ${
                          p.isActive
                            ? 'bg-emerald-600/90 text-white'
                            : 'bg-gray-900/70 text-gray-200'
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full ${p.isActive ? 'bg-white animate-pulse' : 'bg-gray-400'}`} />
                        {p.isActive ? 'Active' : 'Inactive'}
                      </span>
                      {p.showText === false && (
                        <span className="bg-black/60 text-gray-300 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
                          Image Only
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setPreviewPopup(p)}
                      className="absolute bottom-3 right-3 bg-black/60 hover:bg-black/80 text-white p-2 rounded-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-xs font-medium"
                    >
                      <Eye size={14} /> Preview
                    </button>
                  </div>

                  {/* Body Details */}
                  <div className="p-5">
                    <h4 className="font-bold text-gray-900 text-base line-clamp-1">{p.title}</h4>
                    {p.description && (
                      <p className="text-gray-500 text-xs mt-1.5 line-clamp-2">{p.description}</p>
                    )}
                    {p.linkUrl && (
                      <div className="mt-3 flex items-center gap-1.5 text-blue-600 text-xs font-medium truncate">
                        <ExternalLink size={13} className="shrink-0" />
                        <span className="truncate">{p.linkText || 'Learn More'}: {p.linkUrl}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={p.isActive}
                        onChange={() => handleToggleActive(p)}
                      />
                      <div className="w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                    <span className="text-xs font-medium text-gray-600">
                      {p.isActive ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEdit(p)}
                      title="Edit Popup"
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      title="Delete Popup"
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-black/5">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
              <div>
                <h3 className="text-lg font-bold">{editingId ? 'Edit Popup Modal' : 'Create New Popup Modal'}</h3>
                <p className="text-xs text-blue-200 mt-0.5">Configure the popup banner shown to visitors.</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 custom-scrollbar">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Popup Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Annual Sports Day 2026 / Admissions Open"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none text-sm shadow-sm"
                />
              </div>

              {/* Image Upload / URL */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Notice / Event Poster Image <span className="text-red-500">*</span>
                </label>

                <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  {formData.imageUrl && (
                    <div className="relative w-full h-44 rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
                      <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-contain bg-slate-900/5" />
                    </div>
                  )}

                  <div className="flex gap-3 items-center">
                    <label className="cursor-pointer relative overflow-hidden bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors shadow-sm inline-flex items-center gap-2">
                      {uploading ? <Loader2 size={16} className="animate-spin" /> : <ImagePlus size={16} />}
                      {uploading ? 'Uploading to Cloudinary...' : 'Upload Image'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                    </label>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Or Paste Image URL</p>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:outline-none bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Short Description / Caption (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Optional brief note or details to show under the poster..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none text-sm shadow-sm"
                />
              </div>

              {/* Toggle: Show Title & Text in Popup */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <div>
                  <p className="text-sm font-bold text-gray-800">Show Title & Text in Popup</p>
                  <p className="text-xs text-gray-500">When enabled, title and description text will be shown on the popup.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formData.showText}
                    onChange={(e) => setFormData({ ...formData, showText: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Action Link & Text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Button Action Link <span className="text-gray-400 font-normal lowercase">(optional - leave blank for no button)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. /events or /admissions (optional)"
                    value={formData.linkUrl}
                    onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none text-sm shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                    Button Label <span className="text-gray-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Register Now / Apply / View Details"
                    value={formData.linkText}
                    onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:outline-none text-sm shadow-sm"
                  />
                </div>
              </div>

              {/* Active Toggle */}
              <div className="pt-2 flex items-center justify-between p-4 bg-blue-50/60 rounded-2xl border border-blue-100">
                <div>
                  <p className="text-sm font-bold text-blue-950">Activate Immediately</p>
                  <p className="text-xs text-blue-700">Display this popup on the website homepage.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 text-gray-600 hover:bg-gray-100 rounded-xl font-semibold text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/30"
                >
                  Save Popup
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Live Preview Modal */}
      {previewPopup && (
        <div className="fixed inset-0 z-[120] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-opacity animate-in fade-in duration-300">
          <div className="relative w-full max-w-xl md:max-w-2xl bg-white rounded-3xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] overflow-hidden border border-white/20 transform animate-in zoom-in-95 duration-300 ring-1 ring-black/10 flex flex-col">
            {/* Top Floating Close Button */}
            <button
              onClick={() => setPreviewPopup(null)}
              aria-label="Close preview"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95 border border-white/20"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            {/* Poster Image */}
            <div className="relative w-full bg-slate-900 overflow-hidden">
              <img
                src={previewPopup.imageUrl}
                alt={previewPopup.title}
                className="w-full h-auto max-h-[65vh] object-contain mx-auto"
              />
            </div>

            {/* Title & Description (Shown when showText is enabled) */}
            {previewPopup.showText !== false && (previewPopup.title || previewPopup.description) && (
              <div className="px-5 sm:px-6 py-4 bg-gradient-to-b from-white to-slate-50/50 border-t border-slate-100">
                {previewPopup.title && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[11px] font-bold uppercase tracking-wider">
                      <Sparkles size={12} className="text-blue-600" /> Announcement
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 font-display">
                      {previewPopup.title}
                    </h4>
                  </div>
                )}
                {previewPopup.description && (
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1">
                    {previewPopup.description}
                  </p>
                )}
              </div>
            )}

            {/* Bottom Bar Controls */}
            <div className="px-5 sm:px-6 py-3.5 bg-gray-50/90 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 text-[11px] font-bold uppercase tracking-wider">
                  <Sparkles size={12} /> Live Preview
                </span>
              </div>

              <div className="flex items-center gap-2.5 ml-auto">
                <button
                  onClick={() => setPreviewPopup(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-200/70 transition-colors"
                >
                  Dismiss
                </button>

                {previewPopup.linkUrl && previewPopup.linkUrl.trim().length > 0 && (
                  <a
                    href={previewPopup.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white shadow-md shadow-blue-900/20 hover:shadow-lg transition-all active:scale-95"
                  >
                    {previewPopup.linkText || 'View Details'} <ExternalLink size={13} strokeWidth={2.5} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


