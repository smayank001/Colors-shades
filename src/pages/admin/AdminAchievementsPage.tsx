import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { getAchievements, createAchievement, deleteAchievement } from '@/mock-api/db';
import { toast } from 'sonner';

export default function AdminAchievementsPage() {
  const [items, setItems] = useState(getAchievements());
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: '', date: '', description: '' });

  const refresh = () => setItems(getAchievements());

  const handleCreate = () => {
    createAchievement({ title: form.title, date: form.date, image: '', description: form.description });
    toast.success('Achievement added');
    setCreating(false);
    setForm({ title: '', date: '', description: '' });
    refresh();
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Delete this achievement?')) return;
    deleteAchievement(id);
    toast.success('Deleted');
    refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-extrabold">Achievements</h1>
        <Button variant="coral" onClick={() => setCreating(true)}><Plus className="h-4 w-4 mr-1" /> Add</Button>
      </div>

      {creating && (
        <div className="bg-card rounded-2xl p-6 shadow-soft mb-6">
          <h3 className="font-heading text-lg font-bold mb-4">New Achievement</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label>Title</Label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="mt-1 rounded-xl" /></div>
            <div><Label>Date</Label><Input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="mt-1 rounded-xl" /></div>
          </div>
          <div className="mt-4"><Label>Description</Label><Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="mt-1 rounded-xl" rows={3} /></div>
          <div className="flex gap-2 mt-4">
            <Button variant="hero" onClick={handleCreate}>Save</Button>
            <Button variant="ghost" onClick={() => setCreating(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map(a => (
          <div key={a.id} className="bg-card rounded-2xl p-5 shadow-soft flex items-start justify-between">
            <div>
              <h3 className="font-heading font-bold">{a.title}</h3>
              <p className="text-xs text-muted-foreground mb-1">{new Date(a.date).toLocaleDateString()}</p>
              <p className="text-sm text-muted-foreground">{a.description}</p>
            </div>
            <button onClick={() => handleDelete(a.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive shrink-0" aria-label="Delete">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
