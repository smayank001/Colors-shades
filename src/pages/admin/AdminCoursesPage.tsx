import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
    // Fetch services string for dropdown
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
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-extrabold">Course Modules</h1>
        <Button variant="coral" onClick={() => setCreating(true)}>
          <Plus className="h-4 w-4 mr-1" /> Add Module
        </Button>
      </div>

      <div className="mb-6 bg-card/50 p-6 rounded-2xl border border-white/5 shadow-inner">
        <Label className="text-white/80 font-semibold mb-2 block">Select Service to Manage Modules</Label>
        <select 
          className="w-full mt-1 rounded-xl border border-border bg-[#020617] text-white px-4 py-3 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand-coral/50 cursor-pointer appearance-none"
          value={selectedService} 
          onChange={(e) => setSelectedService(e.target.value)}
        >
          {services.map(s => (
            <option key={s.id} value={s.id} className="bg-[#1E293B] text-white">{s.name || s.title}</option>
          ))}
        </select>
      </div>

      {creating && (
        <div className="bg-card rounded-2xl p-6 shadow-soft mb-6">
          <h3 className="font-heading text-lg font-bold mb-4">New Course Module</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label className="text-white/80">Title</Label>
              <Input 
                value={form.title} 
                onChange={e => setForm({ ...form, title: e.target.value })} 
                className="mt-1 rounded-xl bg-[#020617] border-white/10 text-white placeholder:text-white/20" 
                placeholder="E.g. Introduction to Watercolor"
              />
            </div>
          </div>
          <div className="mt-4">
            <Label className="text-white/80">Description</Label>
            <Textarea 
              value={form.description} 
              onChange={e => setForm({ ...form, description: e.target.value })} 
              className="mt-1 rounded-xl bg-[#020617] border-white/10 text-white placeholder:text-white/20" 
              rows={3} 
              placeholder="Brief summary of the module contents..."
            />
          </div>
          <div className="mt-4">
            <Label className="text-white/80">Bullet Points (One per line)</Label>
            <Textarea 
              value={form.bullet_points} 
              onChange={e => setForm({ ...form, bullet_points: e.target.value })} 
              className="mt-1 rounded-xl bg-[#020617] border-white/10 text-white placeholder:text-white/20" 
              rows={5} 
              placeholder="E.g.&#10;Basic shapes&#10;Shading techniques&#10;Still life drawing" 
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="hero" onClick={handleCreate}>Save</Button>
            <Button variant="ghost" onClick={() => setCreating(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading course modules...</div>
        ) : courses.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No course modules found for this service.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 font-semibold w-1/4">Title</th>
                  <th className="px-4 py-3 font-semibold w-1/4">Description</th>
                  <th className="px-4 py-3 font-semibold w-2/4">Bullet Points</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c: any) => (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{c.title}</td>
                    <td className="px-4 py-3 text-muted-foreground truncate max-w-xs">{c.description}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <ul className="list-disc list-inside">
                        {Array.isArray(c.bullet_points) && c.bullet_points.map((bp: string, i: number) => (
                          <li key={i}>{bp}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete(c.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive" aria-label="Delete">
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
