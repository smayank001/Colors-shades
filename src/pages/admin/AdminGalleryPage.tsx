import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getGallery, createGalleryItem, deleteGalleryItem, type GalleryItem } from '@/mock-api/db';
import { toast } from 'sonner';

export default function AdminGalleryPage() {
  const [items, setItems] = useState(getGallery());
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'paintings', caption: '', tags: '' });

  const refresh = () => setItems(getGallery());

  const handleCreate = () => {
    createGalleryItem({
      title: form.title,
      type: 'photo',
      url: '',
      thumbnail: '',
      category: form.category,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      date: new Date().toISOString().split('T')[0],
      caption: form.caption,
    });
    toast.success('Gallery item added');
    setCreating(false);
    setForm({ title: '', category: 'paintings', caption: '', tags: '' });
    refresh();
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Delete this item?')) return;
    deleteGalleryItem(id);
    toast.success('Item deleted');
    refresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-extrabold">Gallery</h1>
        <Button variant="coral" onClick={() => setCreating(true)}><Plus className="h-4 w-4 mr-1" /> Add Item</Button>
      </div>

      {creating && (
        <div className="bg-card rounded-2xl p-6 shadow-soft mb-6">
          <h3 className="font-heading text-lg font-bold mb-4">New Gallery Item</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><Label>Title</Label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="mt-1 rounded-xl" /></div>
            <div><Label>Category</Label><Input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="mt-1 rounded-xl" /></div>
            <div><Label>Caption</Label><Input value={form.caption} onChange={e => setForm(f => ({ ...f, caption: e.target.value }))} className="mt-1 rounded-xl" /></div>
            <div><Label>Tags (comma-separated)</Label><Input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} className="mt-1 rounded-xl" /></div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">Image upload: In production, integrate with file storage. Currently uses placeholder.</p>
          <div className="flex gap-2 mt-4">
            <Button variant="hero" onClick={handleCreate}>Save</Button>
            <Button variant="ghost" onClick={() => setCreating(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-card rounded-2xl p-4 shadow-soft">
            <div className="h-32 bg-gradient-to-br from-brand-coral/20 to-brand-yellow/20 rounded-xl mb-3 flex items-center justify-center">
              <span className="text-4xl opacity-40">🖼️</span>
            </div>
            <h3 className="font-heading text-sm font-bold">{item.title}</h3>
            <p className="text-xs text-muted-foreground mb-2">{item.caption}</p>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {item.tags.map(t => <span key={t} className="text-xs bg-muted px-2 py-0.5 rounded-full">{t}</span>)}
              </div>
              <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive" aria-label="Delete">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
