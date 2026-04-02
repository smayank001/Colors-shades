import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { getCourseModules, addCourseModule, deleteCourseModule, getServices } from '@/api';
import { toast } from 'sonner';

export default function AdminCoursesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<string>('');
  const [courses, setCourses] = useState<any[]>([]);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', bullet_points: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getServices()
      .then(data => {
        setServices(data || []);
        if (data && data.length > 0) {
          setSelectedService(data[0].id);
        }
      })
      .catch(() => toast.error('Failed to load services'));
  }, []);

  const fetchCourses = async (serviceId: string) => {
    if (!serviceId) return;
    setLoading(true);
    try {
      const data = await getCourseModules(serviceId);
      setCourses(data || []);
    } catch (e: any) {
      console.error('Fetch error:', e);
      toast.error(e.message || 'Failed to fetch course modules');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(selectedService);
  }, [selectedService]);

  const handleCreate = async () => {
    if (!form.title || !selectedService) {
      toast.error('Title and a selected service are required');
      return;
    }
    try {
      const bullet_points_array = form.bullet_points.split('\n').map(bp => bp.trim()).filter(bp => bp.length > 0);
      await addCourseModule({ 
        service_id: selectedService, 
        title: form.title, 
        description: form.description, 
        bullet_points: bullet_points_array 
      });
      toast.success('Course module created successfully');
      setCreating(false);
      setForm({ title: '', description: '', bullet_points: '' });
      fetchCourses(selectedService);
    } catch (e: any) {
      toast.error(e.message || 'Failed to create course module');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this course module?')) return;
    try {
      await deleteCourseModule(id);
      toast.success('Course module deleted successfully');
      fetchCourses(selectedService);
    } catch (e: any) {
      toast.error(e.message || 'Failed to delete course module');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold text-[#1E293B]">Course Modules</h1>
          <p className="text-[#1E293B]/40 font-bold text-xs uppercase tracking-widest leading-relaxed">Organize your teaching programs and lessons.</p>
        </div>
        <Button className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white rounded-2xl px-8 h-14 font-extrabold uppercase tracking-widest text-xs shadow-lg shadow-[#FF6B6B]/20" onClick={() => setCreating(true)}>
          <Plus className="h-5 w-5 mr-2" /> Add New Module
        </Button>
      </div>

      <div className="bg-white p-10 rounded-[40px] shadow-sm border border-[#1E293B]/5 space-y-6">
        <div className="max-w-md">
          <Label className="text-[#1E293B] font-extrabold text-xs uppercase tracking-widest mb-4 block pl-2">Select Parent Service</Label>
          <div className="relative">
            <select 
              className="w-full rounded-2xl border-transparent bg-[#F9F7F5] text-[#1E293B] px-8 py-5 text-sm font-bold shadow-sm transition-all focus:bg-white focus:ring-2 focus:ring-[#FF6B6B] cursor-pointer appearance-none pr-12"
              value={selectedService} 
              onChange={(e) => setSelectedService(e.target.value)}
            >
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.name || s.title}</option>
              ))}
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
               <Plus className="w-4 h-4 rotate-45" />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {creating && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-[40px] p-10 shadow-card border border-[#1E293B]/5 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-[#FF6B6B]"></div>
            <h3 className="text-xl font-extrabold text-[#1E293B] mb-8 uppercase tracking-widest">Create New Module</h3>
            
            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-4">
                <Label className="text-[#1E293B] font-bold text-xs uppercase tracking-widest pl-2">Module Title</Label>
                <Input 
                  value={form.title} 
                  onChange={e => setForm({ ...form, title: e.target.value })} 
                  className="rounded-2xl bg-[#F9F7F5] border-transparent focus:bg-white focus:ring-2 focus:ring-[#FF6B6B] h-16 px-6 font-medium text-[#1E293B]" 
                  placeholder="E.g. Introduction to Watercolor"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-[#1E293B] font-bold text-xs uppercase tracking-widest pl-2">Module Description</Label>
                <Textarea 
                  value={form.description} 
                  onChange={e => setForm({ ...form, description: e.target.value })} 
                  className="rounded-2xl bg-[#F9F7F5] border-transparent focus:bg-white focus:ring-2 focus:ring-[#FF6B6B] p-6 font-medium text-[#1E293B]" 
                  rows={3} 
                  placeholder="Tell us what this module covers..."
                />
              </div>

              <div className="space-y-4">
                <Label className="text-[#1E293B] font-bold text-xs uppercase tracking-widest pl-2">Key Learning Points (One per line)</Label>
                <Textarea 
                  value={form.bullet_points} 
                  onChange={e => setForm({ ...form, bullet_points: e.target.value })} 
                  className="rounded-2xl bg-[#F9F7F5] border-transparent focus:bg-white focus:ring-2 focus:ring-[#FF6B6B] p-6 font-medium text-[#1E293B]" 
                  rows={5} 
                  placeholder="Basic shapes&#10;Color theory&#10;Perspective drawing" 
                />
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <Button className="bg-[#1E293B] hover:bg-[#FF6B6B] text-white rounded-2xl px-10 h-14 font-extrabold uppercase tracking-widest text-xs transition-all shadow-lg" onClick={handleCreate}>
                Create Module
              </Button>
              <Button variant="ghost" className="text-[#1E293B]/40 hover:text-[#1E293B] font-extrabold uppercase tracking-widest text-xs rounded-2xl px-8" onClick={() => setCreating(false)}>
                Discard
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-[40px] shadow-sm border border-[#1E293B]/5 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-[#FF6B6B]/10 border-t-[#FF6B6B] rounded-full animate-spin"></div>
            <p className="text-[#1E293B]/40 font-bold uppercase tracking-widest text-xs">Loading modules...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="p-20 text-center">
            <div className="text-5xl mb-4 opacity-20">📚</div>
            <p className="text-[#1E293B]/40 font-bold uppercase tracking-widest text-xs">No modules found for this service.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9F7F5]/50 border-b border-[#1E293B]/5">
                  <th className="px-8 py-6 text-[10px] font-extrabold text-[#1E293B]/40 uppercase tracking-[0.2em] w-1/4">Module Title</th>
                  <th className="px-8 py-6 text-[10px] font-extrabold text-[#1E293B]/40 uppercase tracking-[0.2em] w-1/4">Overview</th>
                  <th className="px-8 py-6 text-[10px] font-extrabold text-[#1E293B]/40 uppercase tracking-[0.2em] w-2/4">Curriculum</th>
                  <th className="px-8 py-6 text-[10px] font-extrabold text-[#1E293B]/40 uppercase tracking-[0.2em]">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]/5">
                {courses.map((c: any) => (
                  <tr key={c.id} className="hover:bg-[#F9F7F5]/30 transition-colors group">
                    <td className="px-8 py-6">
                       <span className="font-extrabold text-[#1E293B] group-hover:text-[#FF6B6B] transition-colors">{c.title}</span>
                    </td>
                    <td className="px-8 py-6">
                       <p className="text-[#1E293B]/60 text-sm font-medium line-clamp-2 max-w-xs">{c.description}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(c.bullet_points) && c.bullet_points.map((bp: string, i: number) => (
                          <span key={i} className="px-3 py-1 rounded-lg bg-[#1E293B]/5 text-[#1E293B]/60 text-[10px] font-bold">
                            {bp}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <button 
                        onClick={() => handleDelete(c.id)} 
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
