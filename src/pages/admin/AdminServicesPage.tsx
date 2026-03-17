import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { getServices, createService, updateService, deleteService, type Service } from '@/mock-api/db';
import { toast } from 'sonner';

export default function AdminServicesPage() {
  const [services, setServices] = useState(getServices());
  const [editing, setEditing] = useState<Service | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: '', slug: '', description: '', category: 'art', price_text: '', duration: '', icon: '🎨' });

  const refresh = () => setServices(getServices());

  const handleCreate = () => {
    createService({ ...form, images: [], courses: [] });
    toast.success('Service created');
    setCreating(false);
    setForm({ title: '', slug: '', description: '', category: 'art', price_text: '', duration: '', icon: '🎨' });
    refresh();
  };

  const handleUpdate = () => {
    if (!editing) return;
    updateService(editing.id, form);
    toast.success('Service updated');
    setEditing(null);
    refresh();
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Delete this service?')) return;
    deleteService(id);
    toast.success('Service deleted');
    refresh();
  };

  const startEdit = (s: Service) => {
    setEditing(s);
    setCreating(false);
    setForm({ title: s.title, slug: s.slug, description: s.description, category: s.category, price_text: s.price_text, duration: s.duration, icon: s.icon });
  };

  const renderForm = (onSubmit: () => void, label: string) => (
    <div className="bg-card rounded-2xl p-6 shadow-soft mb-6">
      <h3 className="font-heading text-lg font-bold mb-4">{label}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><Label>Title</Label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="mt-1 rounded-xl" /></div>
        <div><Label>Slug</Label><Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="mt-1 rounded-xl" /></div>
        <div><Label>Price</Label><Input value={form.price_text} onChange={e => setForm(f => ({ ...f, price_text: e.target.value }))} className="mt-1 rounded-xl" /></div>
        <div><Label>Duration</Label><Input value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} className="mt-1 rounded-xl" /></div>
        <div><Label>Icon (emoji)</Label><Input value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} className="mt-1 rounded-xl" /></div>
        <div><Label>Category</Label><Input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="mt-1 rounded-xl" /></div>
      </div>
      <div className="mt-4"><Label>Description</Label><Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="mt-1 rounded-xl" rows={3} /></div>
      <div className="flex gap-2 mt-4">
        <Button variant="hero" onClick={onSubmit}>Save</Button>
        <Button variant="ghost" onClick={() => { setEditing(null); setCreating(false); }}>Cancel</Button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-extrabold">Services</h1>
        <Button variant="coral" onClick={() => { setCreating(true); setEditing(null); setForm({ title: '', slug: '', description: '', category: 'art', price_text: '', duration: '', icon: '🎨' }); }}>
          <Plus className="h-4 w-4 mr-1" /> Add Service
        </Button>
      </div>

      {creating && renderForm(handleCreate, 'New Service')}
      {editing && renderForm(handleUpdate, `Edit: ${editing.title}`)}

      <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-border text-left">
              <th className="px-4 py-3 font-semibold">Icon</th>
              <th className="px-4 py-3 font-semibold">Title</th>
              <th className="px-4 py-3 font-semibold">Price</th>
              <th className="px-4 py-3 font-semibold">Duration</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr></thead>
            <tbody>
              {services.map(s => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="px-4 py-3 text-2xl">{s.icon}</td>
                  <td className="px-4 py-3 font-medium">{s.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.price_text}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.duration}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => startEdit(s)} className="p-1.5 rounded-lg hover:bg-muted" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
