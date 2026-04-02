import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Upload, Image as ImageIcon, Film, Calendar, CloudUpload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { getMedia, addMedia, deleteMedia } from '@/api';
import { toast } from 'sonner';

export default function AdminMediaPage() {
  const [media, setMedia] = useState<any[]>([]);
  const [category, setCategory] = useState<string>('events');
  const [creating, setCreating] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async (cat: string) => {
    setLoading(true);
    try {
      const data = await getMedia(cat);
      setMedia(data || []);
    } catch (e: any) {
      toast.error('Failed to fetch media');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia(category);
  }, [category]);

  const handleCreate = async () => {
    if (!file || !title) {
      toast.error('Title and an image file are required');
      return;
    }

    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      toast.error('Only image and video files are supported');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('section', category);
      formData.append('category', itemCategory || category);
      formData.append('subtitle', subtitle);
      formData.append('description', description);
      formData.append('event_date', eventDate);
      formData.append('file', file);

      await addMedia(formData);
      toast.success('Media uploaded successfully');
      setCreating(false);
      resetForm();
      fetchMedia(category);
    } catch (e: any) {
      toast.error(e.message || 'Failed to upload media');
    }
  };

  const resetForm = () => {
    setTitle('');
    setSubtitle('');
    setDescription('');
    setItemCategory('');
    setEventDate('');
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this media?')) return;
    try {
      await deleteMedia(id);
      toast.success('Media deleted successfully');
      fetchMedia(category);
    } catch (e: any) {
      toast.error(e.message || 'Failed to delete media');
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold text-[#1E293B]">Media Library</h1>
          <p className="text-[#1E293B]/40 font-bold text-xs uppercase tracking-widest leading-relaxed">Manage your gallery, events, and student artwork.</p>
        </div>
        <Button className="bg-[#4D96FF] hover:bg-[#4D96FF]/90 text-white rounded-2xl px-8 h-14 font-extrabold uppercase tracking-widest text-xs shadow-lg shadow-[#4D96FF]/20" onClick={() => setCreating(true)}>
          <Upload className="h-5 w-5 mr-2" /> Upload New Media
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 p-2 bg-white rounded-3xl shadow-sm border border-[#1E293B]/5 w-max">
        {['events', 'student_work', 'achievements'].map(cat => (
          <button
            key={cat}
            className={`px-8 py-3 rounded-2xl font-extrabold text-xs uppercase tracking-widest transition-all duration-300 ${
              category === cat 
                ? 'bg-[#FF6B6B] text-white shadow-lg shadow-[#FF6B6B]/20 scale-105' 
                : 'text-[#1E293B]/40 hover:bg-[#F9F7F5] hover:text-[#1E293B]'
            }`}
            onClick={() => setCategory(cat)}
          >
            {cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {creating && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-[40px] p-10 shadow-card border border-[#1E293B]/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4D96FF]/5 rounded-bl-[100px]"></div>
            <h3 className="text-xl font-extrabold text-[#1E293B] mb-8 uppercase tracking-widest">Post to {category.replace('_', ' ')}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Label className="text-[#1E293B] font-bold text-xs uppercase tracking-widest pl-2">Media Title</Label>
                <Input value={title} onChange={e => setTitle(e.target.value)} className="rounded-2xl bg-[#F9F7F5] border-transparent focus:bg-white focus:ring-2 focus:ring-[#4D96FF] h-16 px-6 font-medium text-[#1E293B]" placeholder="What should we call this?" />
              </div>
              
              {category === 'student_work' && (
                <div className="space-y-4">
                  <Label className="text-[#1E293B] font-bold text-xs uppercase tracking-widest pl-2">Student Attribution</Label>
                  <Input value={subtitle} onChange={e => setSubtitle(e.target.value)} className="rounded-2xl bg-[#F9F7F5] border-transparent focus:bg-white focus:ring-2 focus:ring-[#4D96FF] h-16 px-6 font-medium text-[#1E293B]" placeholder="e.g. By Aarav, Age 9" />
                </div>
              )}

              <div className="space-y-4">
                <Label className="text-[#1E293B] font-bold text-xs uppercase tracking-widest pl-2">Category Selection</Label>
                <div className="relative">
                  <select
                    value={itemCategory}
                    onChange={e => setItemCategory(e.target.value)}
                    className="w-full rounded-2xl border-transparent bg-[#F9F7F5] text-[#1E293B] px-8 py-5 text-sm font-bold shadow-sm transition-all focus:bg-white focus:ring-2 focus:ring-[#4D96FF] cursor-pointer appearance-none pr-12"
                  >
                    <option value="">Default ({category})</option>
                    {category === 'student_work' && (
                      <>
                        <option value="Paintings">Paintings</option>
                        <option value="Crafts">Crafts</option>
                        <option value="Summer Camp">Summer Camp</option>
                      </>
                    )}
                    {category === 'events' && (
                      <>
                        <option value="Workshop">Workshop</option>
                        <option value="Competition">Competition</option>
                        <option value="Exhibition">Exhibition</option>
                      </>
                    )}
                    {category === 'achievements' && (
                      <>
                        <option value="Award">Award</option>
                        <option value="Competition">Competition</option>
                        <option value="Certificate">Certificate</option>
                      </>
                    )}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                    <Plus className="w-4 h-4 rotate-45" />
                  </div>
                </div>
              </div>

              {(category === 'events' || category === 'achievements') && (
                <div className="space-y-4">
                  <Label className="text-[#1E293B] font-bold text-xs uppercase tracking-widest pl-2">Event Date</Label>
                  <div className="relative">
                    <Input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} className="rounded-2xl bg-[#F9F7F5] border-transparent focus:bg-white focus:ring-2 focus:ring-[#4D96FF] h-16 px-6 font-medium text-[#1E293B] pr-12" />
                    <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1E293B]/20 pointer-events-none" />
                  </div>
                </div>
              )}

              <div className="space-y-4 md:col-span-2">
                <Label className="text-[#1E293B] font-bold text-xs uppercase tracking-widest pl-2">Story / Description</Label>
                <Textarea
                  value={description}
                  onChange={(e: any) => setDescription(e.target.value)}
                  className="rounded-2xl bg-[#F9F7F5] border-transparent focus:bg-white focus:ring-2 focus:ring-[#4D96FF] p-6 font-medium text-[#1E293B]"
                  rows={3}
                  placeholder="Tell the story behind this masterpiece..."
                />
              </div>

              <div className="md:col-span-2 border-2 border-dashed border-[#1E293B]/10 rounded-[30px] p-10 bg-[#F9F7F5]/50 flex flex-col items-center justify-center group hover:border-[#4D96FF]/30 transition-all cursor-pointer relative overflow-hidden">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={e => setFile(e.target.files?.[0] || null)}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  accept="image/*,video/*"
                />
                <div className="p-5 rounded-full bg-white shadow-xl text-[#4D96FF] mb-4 group-hover:scale-110 transition-transform">
                   <CloudUpload className="w-8 h-8" />
                </div>
                <p className="text-[#1E293B] font-extrabold text-sm uppercase tracking-widest">
                  {file ? file.name : "Drop Artwork here or click to browse"}
                </p>
                <p className="text-[#1E293B]/30 text-xs font-bold mt-2 uppercase tracking-widest leading-relaxed">JPG, PNG, WEBP, or MP4 supported</p>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <Button className="bg-[#1E293B] hover:bg-[#4D96FF] text-white rounded-2xl px-10 h-14 font-extrabold uppercase tracking-widest text-xs transition-all shadow-lg" onClick={handleCreate} disabled={!title || !file}>
                Publish Media
              </Button>
              <Button variant="ghost" className="text-[#1E293B]/40 hover:text-[#1E293B] font-extrabold uppercase tracking-widest text-xs rounded-2xl px-8" onClick={() => {
                setCreating(false);
                resetForm();
              }}>Discard</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="p-40 text-center flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#4D96FF]/10 border-t-[#4D96FF] rounded-full animate-spin"></div>
          <p className="text-[#1E293B]/40 font-bold uppercase tracking-widest text-xs">Curating your gallery...</p>
        </div>
      ) : media.length === 0 ? (
        <div className="p-40 text-center bg-white rounded-[40px] border-2 border-dashed border-[#1E293B]/10">
          <div className="text-6xl mb-6 opacity-20">🎨</div>
          <p className="text-[#1E293B]/40 font-bold uppercase tracking-widest text-xs">The canvas is empty. Start by uploading some art!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {media.map((m: any, idx: number) => (
            <motion.div 
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-card transition-all duration-500 border border-[#1E293B]/5 relative"
            >
              <div className="aspect-[4/5] bg-[#F9F7F5] relative overflow-hidden">
                {m.url.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video src={m.url} className="w-full h-full object-cover" controls muted />
                ) : (
                  <img src={m.url} alt={m.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                )}
                
                <div className="absolute top-4 right-4 translate-x-12 translate-y-[-12px] opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="p-3 bg-red-500 text-white rounded-2xl shadow-xl hover:bg-black transition-colors"
                    title="Remove Art"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="absolute bottom-4 left-4 flex gap-2">
                   <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-[10px] font-extrabold text-[#1E293B] shadow-sm uppercase tracking-widest border border-white/50">
                      {m.category || category}
                   </div>
                   {m.url.match(/\.(mp4|webm|ogg)$/i) && (
                      <div className="bg-[#4D96FF]/90 backdrop-blur-md p-1.5 rounded-xl text-white shadow-sm border border-white/20">
                         <Film className="w-3.5 h-3.5" />
                      </div>
                   )}
                </div>
              </div>
              
              <div className="p-6">
                <h4 className="font-extrabold text-[#1E293B] group-hover:text-[#4D96FF] transition-colors line-clamp-1 mb-1">{m.title || 'Untitled'}</h4>
                {m.subtitle && <p className="text-[10px] font-extrabold text-[#FF6B6B] uppercase tracking-widest mb-3">{m.subtitle}</p>}
                <p className="text-[#1E293B]/50 text-xs font-medium line-clamp-2 leading-relaxed h-8">{m.description}</p>
                
                <div className="mt-6 pt-6 border-t border-[#1E293B]/5 flex items-center justify-between">
                   <span className="text-[10px] font-bold text-[#1E293B]/20 tabular-nums">
                      {m.event_date ? new Date(m.event_date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : new Date(m.created_at || Date.now()).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                   </span>
                   <div className="w-1.5 h-1.5 rounded-full bg-[#6BCB77]"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
