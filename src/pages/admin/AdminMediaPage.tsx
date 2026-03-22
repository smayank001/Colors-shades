import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

    // Validate image file
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      toast.error('Only image and video files are supported');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('section', category); // section is events/student_work/achievements
      formData.append('category', itemCategory || category); // sub-category if any
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
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-extrabold">Media Library</h1>
        <Button variant="coral" onClick={() => setCreating(true)}>
          <Upload className="h-4 w-4 mr-1" /> Upload Media
        </Button>
      </div>

      <div className="mb-6 flex gap-4 border-b border-border pb-2">
        {['events', 'student_work', 'achievements'].map(cat => (
          <button
            key={cat}
            className={`px-4 py-2 font-semibold text-sm transition-colors rounded-t-lg ${category === cat ? 'bg-brand-coral/10 text-brand-coral border-b-2 border-brand-coral' : 'text-muted-foreground hover:bg-muted'}`}
            onClick={() => setCategory(cat)}
          >
            {cat.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
          </button>
        ))}
      </div>

      {creating && (
        <div className="bg-card rounded-2xl p-6 shadow-soft mb-6">
          <h3 className="font-heading text-lg font-bold mb-4">Upload {category.replace('_', ' ')} Media</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Title</Label>
              <Input value={title} onChange={e => setTitle(e.target.value)} className="mt-1 rounded-xl" placeholder="Main Title" />
            </div>
            {category === 'student_work' && (
              <div>
                <Label>Subtitle / Byline</Label>
                <Input value={subtitle} onChange={e => setSubtitle(e.target.value)} className="mt-1 rounded-xl" placeholder="By Aarav, Age 9" />
              </div>
            )}
            <div>
              <Label className="text-white/80">Category</Label>
              <select
                value={itemCategory}
                onChange={e => setItemCategory(e.target.value)}
                className="w-full mt-1 rounded-xl border border-border bg-[#020617] text-white px-3 py-2 text-sm focus:ring-2 focus:ring-brand-coral/50 outline-none cursor-pointer appearance-none"
              >
                <option value="" className="bg-[#1E293B]">Select Category</option>
                {category === 'student_work' && (
                  <>
                    <option value="Paintings" className="bg-[#1E293B]">Paintings</option>
                    <option value="Crafts" className="bg-[#1E293B]">Crafts</option>
                    <option value="Summer Camp" className="bg-[#1E293B]">Summer Camp</option>
                  </>
                )}
                {category === 'events' && (
                  <>
                    <option value="Workshop" className="bg-[#1E293B]">Workshop</option>
                    <option value="Competition" className="bg-[#1E293B]">Competition</option>
                    <option value="Exhibition" className="bg-[#1E293B]">Exhibition</option>
                  </>
                )}
                {category === 'achievements' && (
                  <>
                    <option value="Award" className="bg-[#1E293B]">Award</option>
                    <option value="Competition" className="bg-[#1E293B]">Competition</option>
                    <option value="Certificate" className="bg-[#1E293B]">Certificate</option>
                  </>
                )}
              </select>
            </div>
            {(category === 'events' || category === 'achievements') && (
              <div>
                <Label>Date</Label>
                <Input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} className="mt-1 rounded-xl" />
              </div>
            )}
            <div>
              <Label>File (Image/Video)</Label>
              <Input
                type="file"
                ref={fileInputRef}
                onChange={e => setFile(e.target.files?.[0] || null)}
                className="mt-1 rounded-xl"
                accept="image/*,video/*"
              />
            </div>
          </div>
          <div className="mt-4">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e: any) => setDescription(e.target.value)}
              className="mt-1 rounded-xl"
              rows={3}
              placeholder="Full description..."
            />
          </div>
          <div className="flex gap-2 mt-6">
            <Button variant="hero" onClick={handleCreate} disabled={!title || !file}>
              Upload
            </Button>
            <Button variant="ghost" onClick={() => {
              setCreating(false);
              resetForm();
            }}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="p-8 text-center text-muted-foreground">Loading media...</div>
      ) : media.length === 0 ? (
        <div className="p-8 text-center bg-card rounded-2xl shadow-soft text-muted-foreground">
          No media found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {media.map((m: any) => (
            <div key={m.id} className="group bg-card rounded-2xl overflow-hidden shadow-soft border border-border relative">
              <div className="aspect-square bg-muted relative">
                {m.url.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video src={m.url} className="w-full h-full object-cover" controls muted />
                ) : (
                  <img src={m.url} alt={m.title} className="w-full h-full object-cover" />
                )}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="p-2 bg-destructive text-destructive-foreground rounded-full shadow-lg hover:bg-destructive/90"
                    title="Delete Media"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="font-semibold text-sm truncate">{m.title || 'Untitled'}</p>
                {m.subtitle && <p className="text-xs text-[#F97316] truncate">{m.subtitle}</p>}
                {m.category && <p className="text-[10px] bg-muted px-1.5 py-0.5 rounded-full w-max mt-1">{m.category}</p>}
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{m.description}</p>
                <p className="text-[10px] text-muted-foreground mt-1 italic">
                  {m.event_date ? new Date(m.event_date).toLocaleDateString() : new Date(m.created_at || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
