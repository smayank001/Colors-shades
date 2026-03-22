import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
        formData.append('category', 'services'); // categorize in media bucket
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
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-extrabold">Services</h1>
        <Button variant="coral" onClick={() => setCreating(true)}>
          <Plus className="h-4 w-4 mr-1" /> Add Service
        </Button>
      </div>

      {creating && (
        <div className="bg-card rounded-2xl p-6 shadow-soft mb-6">
          <h3 className="font-heading text-lg font-bold mb-4">New Service</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="mt-1 rounded-xl" />
            </div>
            <div>
              <Label>Slug</Label>
              <Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} className="mt-1 rounded-xl" />
            </div>
          </div>
          <div className="mt-4">
            <Label>Description</Label>
            <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="mt-1 rounded-xl" rows={3} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">

            <div>
              <Label>Price</Label>
              <Input
                placeholder="From ₹2,500 / month"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
                className="mt-1 rounded-xl"
              />
            </div>

            <div>
              <Label>Service Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={e => setSelectedFile(e.target.files?.[0] || null)}
                className="mt-1 rounded-xl cursor-pointer"
              />
              {selectedFile && <p className="text-xs text-muted-foreground mt-1">{selectedFile.name}</p>}
            </div>

          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="hero" onClick={handleCreate} disabled={uploadingMedia}>
              {uploadingMedia ? "Saving..." : "Save"}
            </Button>
            <Button variant="ghost" onClick={() => {
              setCreating(false);
              setSelectedFile(null);
            }}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No services found. Add one above.</div>
        ) : (
          <div className="overflow-x-auto">
            {/* <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Slug</th>
                  <th className="px-4 py-3 font-semibold">Description</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s: any) => (
                  <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{s.name || s.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.slug || 'N/A'}</td>
                    <td className="px-4 py-3 text-muted-foreground truncate max-w-xs">{s.description}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive" aria-label="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Slug</th>
                  <th className="px-4 py-3 font-semibold">Description</th>
                  <th className="px-4 py-3 font-semibold">Price</th>
                  <th className="px-4 py-3 font-semibold">Image</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {services.map((s: any) => (
                  <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/50">

                    <td className="px-4 py-3 font-medium">
                      {s.name || s.title}
                    </td>

                    <td className="px-4 py-3 text-muted-foreground">
                      {s.slug || 'N/A'}
                    </td>

                    <td className="px-4 py-3 text-muted-foreground truncate max-w-xs">
                      {s.description}
                    </td>

                    {/* ✅ PRICE */}
                    <td className="px-4 py-3 text-primary font-medium">
                      {s.price || '—'}
                    </td>

                    {/* ✅ IMAGE */}
                    <td className="px-4 py-3">
                      {s.image_url ? (
                        <img src={s.image_url} alt={s.name} className="w-12 h-12 object-cover rounded-lg bg-muted" />
                      ) : (
                        <span className="text-muted-foreground">No image</span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive"
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
