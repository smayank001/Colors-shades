import { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { getServices, addService, deleteService, addMedia } from '@/api';
import { toast } from 'sonner';

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    image_url: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await getServices();
      setServices(data || []);
    } catch (e: any) {
      toast.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreate = async () => {
    if (!form.name || !form.slug) {
      toast.error('Name and slug are required');
      return;
    }
    setUploadingMedia(true);
    try {
      let uploadedUrl = form.image_url;
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('title', form.name + ' Image');
        formData.append('category', 'services');
        const res = await addMedia(formData);
        if (res?.data?.[0]?.url) {
           uploadedUrl = res.data[0].url;
        }
      }

      await addService({ ...form, image_url: uploadedUrl });
      toast.success('Service created successfully');
      setCreating(false);
      setForm({ name: '', slug: '', description: '', price: '', image_url: '' });
      setSelectedFile(null);
      fetchServices();
    } catch (e: any) {
      toast.error(e.message || 'Failed to create service');
    } finally {
      setUploadingMedia(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await deleteService(id);
      toast.success('Service deleted successfully');
      fetchServices();
    } catch (e: any) {
      toast.error(e.message || 'Failed to delete service');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold text-[#1E293B]">Programs & Services</h1>
          <p className="text-[#1E293B]/40 font-bold text-xs uppercase tracking-widest leading-relaxed">Manage the core offerings of your art school.</p>
        </div>
        <Button className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white rounded-2xl px-8 h-14 font-extrabold uppercase tracking-widest text-xs shadow-lg shadow-[#FF6B6B]/20" onClick={() => setCreating(true)}>
          <Plus className="h-5 w-5 mr-2" /> Add Program
        </Button>
      </div>

      <AnimatePresence>
        {creating && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-[40px] p-10 shadow-card border border-[#1E293B]/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B6B]/5 rounded-bl-[100px]"></div>
            <h3 className="text-xl font-extrabold text-[#1E293B] mb-8 uppercase tracking-widest">Register New Program</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Label className="text-[#1E293B] font-bold text-xs uppercase tracking-widest pl-2">Program Name</Label>
                <Input 
                  value={form.name} 
                  onChange={e => setForm({ ...form, name: e.target.value })} 
                  className="rounded-2xl bg-[#F9F7F5] border-transparent focus:bg-white focus:ring-2 focus:ring-[#FF6B6B] h-16 px-6 font-medium text-[#1E293B]" 
                  placeholder="E.g. Junior Picassos"
                />
              </div>
              <div className="space-y-4">
                <Label className="text-[#1E293B] font-bold text-xs uppercase tracking-widest pl-2">URL Slug (URL-friendly name)</Label>
                <Input 
                  value={form.slug} 
                  onChange={e => setForm({ ...form, slug: e.target.value })} 
                  className="rounded-2xl bg-[#F9F7F5] border-transparent focus:bg-white focus:ring-2 focus:ring-[#FF6B6B] h-16 px-6 font-medium text-[#1E293B]" 
                  placeholder="e.g. junior-picassos"
                />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <Label className="text-[#1E293B] font-bold text-xs uppercase tracking-widest pl-2">Description</Label>
              <Textarea 
                value={form.description} 
                onChange={e => setForm({ ...form, description: e.target.value })} 
                className="rounded-2xl bg-[#F9F7F5] border-transparent focus:bg-white focus:ring-2 focus:ring-[#FF6B6B] p-6 font-medium text-[#1E293B]" 
                rows={3} 
                placeholder="What is this program about?"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-4">
                <Label className="text-[#1E293B] font-bold text-xs uppercase tracking-widest pl-2">Pricing Details</Label>
                <Input
                  placeholder="E.g. ₹2,500 / month"
                  value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })}
                  className="rounded-2xl bg-[#F9F7F5] border-transparent focus:bg-white focus:ring-2 focus:ring-[#FF6B6B] h-16 px-6 font-medium text-[#1E293B]" 
                />
              </div>

              <div className="space-y-4">
                <Label className="text-[#1E293B] font-bold text-xs uppercase tracking-widest pl-2">Cover Image</Label>
                <div className="relative border-2 border-dashed border-[#1E293B]/10 rounded-2xl h-16 bg-[#F9F7F5] flex items-center px-6 group hover:border-[#FF6B6B]/30 transition-colors overflow-hidden">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex items-center gap-3 w-full">
                     <div className="p-1.5 rounded-lg bg-white shadow-sm text-[#FF6B6B]">
                        <ImageIcon className="w-4 h-4" />
                     </div>
                     <span className="text-sm font-bold text-[#1E293B]/40 group-hover:text-[#FF6B6B] transition-colors truncate">
                        {selectedFile ? selectedFile.name : "Choose an inspiring image..."}
                     </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12">
              <Button className="bg-[#1E293B] hover:bg-[#FF6B6B] text-white rounded-2xl px-10 h-14 font-extrabold uppercase tracking-widest text-xs transition-all shadow-lg" onClick={handleCreate} disabled={uploadingMedia}>
                {uploadingMedia ? "Working Magic..." : "Save Program"}
              </Button>
              <Button variant="ghost" className="text-[#1E293B]/40 hover:text-[#1E293B] font-extrabold uppercase tracking-widest text-xs rounded-2xl px-8" onClick={() => {
                setCreating(false);
                setSelectedFile(null);
              }}>Discard</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-[40px] shadow-sm border border-[#1E293B]/5 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-[#FF6B6B]/10 border-t-[#FF6B6B] rounded-full animate-spin"></div>
            <p className="text-[#1E293B]/40 font-bold uppercase tracking-widest text-xs">Loading programs...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="p-20 text-center">
            <div className="text-5xl mb-4 opacity-20">🎨</div>
            <p className="text-[#1E293B]/40 font-bold uppercase tracking-widest text-xs">No programs found. Time to create some art!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9F7F5]/50 border-b border-[#1E293B]/5">
                  <th className="px-8 py-6 text-[10px] font-extrabold text-[#1E293B]/40 uppercase tracking-[0.2em]">Program Name</th>
                  <th className="px-8 py-6 text-[10px] font-extrabold text-[#1E293B]/40 uppercase tracking-[0.2em]">Visual</th>
                  <th className="px-8 py-6 text-[10px] font-extrabold text-[#1E293B]/40 uppercase tracking-[0.2em]">Overview</th>
                  <th className="px-8 py-6 text-[10px] font-extrabold text-[#1E293B]/40 uppercase tracking-[0.2em]">Investment</th>
                  <th className="px-8 py-6 text-[10px] font-extrabold text-[#1E293B]/40 uppercase tracking-[0.2em]">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]/5">
                {services.map((s: any) => (
                  <tr key={s.id} className="hover:bg-[#F9F7F5]/30 transition-colors group">
                    <td className="px-8 py-6">
                       <div className="flex flex-col gap-1">
                          <span className="font-extrabold text-[#1E293B] group-hover:text-[#FF6B6B] transition-colors">{s.name || s.title}</span>
                          <span className="text-[10px] font-bold text-[#1E293B]/30 uppercase tracking-widest">/{s.slug}</span>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                      {s.image_url ? (
                        <img src={s.image_url} alt={s.name} className="w-14 h-14 object-cover rounded-2xl shadow-sm border border-[#1E293B]/5 bg-white" />
                      ) : (
                        <div className="w-14 h-14 rounded-2xl bg-[#F9F7F5] flex items-center justify-center text-xl grayscale opacity-40">🖼️</div>
                      )}
                    </td>
                    <td className="px-8 py-6">
                       <p className="text-[#1E293B]/60 text-sm font-medium line-clamp-2 max-w-xs">{s.description}</p>
                    </td>
                    <td className="px-8 py-6">
                       <span className="px-4 py-1.5 rounded-full bg-[#6BCB77]/10 text-[#6BCB77] text-[10px] font-extrabold uppercase tracking-widest whitespace-nowrap">
                          {s.price || 'Contact for price'}
                       </span>
                    </td>
                    <td className="px-8 py-6">
                      <button 
                        onClick={() => handleDelete(s.id)} 
                        className="p-3 rounded-xl bg-red-50 text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
