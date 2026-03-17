import { useState } from 'react';
import { Search, Download, CheckCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getEnquiries, updateEnquiry, type Enquiry } from '@/mock-api/db';
import { toast } from 'sonner';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState(getEnquiries());
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Enquiry | null>(null);

  const refresh = () => setEnquiries(getEnquiries());

  const filtered = enquiries.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.email.toLowerCase().includes(search.toLowerCase()) ||
    e.course_slug.toLowerCase().includes(search.toLowerCase())
  );

  const markPaid = (id: string) => {
    updateEnquiry(id, { paid_flag: true, status: 'paid' });
    toast.success('Marked as paid');
    refresh();
    if (selected?.id === id) setSelected({ ...selected, paid_flag: true, status: 'paid' });
  };

  const markProcessed = (id: string) => {
    updateEnquiry(id, { status: 'processed' });
    toast.success('Marked as processed');
    refresh();
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Course', 'Status', 'Date', 'Message'];
    const rows = enquiries.map(e => [e.name, e.email, e.phone, e.course_slug, e.status, e.created_at, e.message]);
    const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'enquiries.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('CSV exported');
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="font-heading text-2xl font-extrabold">Enquiries</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 rounded-xl w-60" />
          </div>
          <Button variant="outline" onClick={exportCSV}><Download className="h-4 w-4 mr-1" /> CSV</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2 bg-card rounded-2xl shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border text-left">
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr></thead>
              <tbody>
                {filtered.map(e => (
                  <tr key={e.id} className={`border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer ${selected?.id === e.id ? 'bg-muted/50' : ''}`} onClick={() => setSelected(e)}>
                    <td className="px-4 py-3 font-medium">{e.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{e.email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                        e.status === 'paid' ? 'bg-brand-fresh/10 text-brand-fresh' :
                        e.status === 'processed' ? 'bg-brand-sky/10 text-brand-sky' :
                        'bg-brand-yellow/10 text-brand-yellow'
                      }`}>{e.status}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground tabular-nums">{new Date(e.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1" onClick={ev => ev.stopPropagation()}>
                        {e.status !== 'paid' && (
                          <button onClick={() => markPaid(e.id)} className="p-1.5 rounded-lg hover:bg-brand-fresh/10 text-brand-fresh" aria-label="Mark paid" title="Mark as paid">
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        {e.status === 'new' && (
                          <button onClick={() => markProcessed(e.id)} className="p-1.5 rounded-lg hover:bg-brand-sky/10 text-brand-sky" aria-label="Mark processed" title="Mark as processed">
                            <Eye className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel */}
        <div className="bg-card rounded-2xl shadow-soft p-6">
          {selected ? (
            <>
              <h3 className="font-heading text-lg font-bold mb-4">Enquiry Details</h3>
              <div className="space-y-3 text-sm">
                <div><span className="text-muted-foreground">Name:</span> <span className="font-medium">{selected.name}</span></div>
                <div><span className="text-muted-foreground">Email:</span> <span className="font-medium">{selected.email}</span></div>
                <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium">{selected.phone}</span></div>
                <div><span className="text-muted-foreground">Course:</span> <span className="font-medium">{selected.course_slug || '—'}</span></div>
                <div><span className="text-muted-foreground">Status:</span> <span className="font-medium capitalize">{selected.status}</span></div>
                <div><span className="text-muted-foreground">Date:</span> <span className="font-medium tabular-nums">{new Date(selected.created_at).toLocaleString()}</span></div>
                <div className="pt-2 border-t border-border">
                  <span className="text-muted-foreground">Message:</span>
                  <p className="mt-1">{selected.message}</p>
                </div>
                {selected.payment_screenshot_url && (
                  <div className="pt-2 border-t border-border">
                    <span className="text-muted-foreground">Payment Screenshot:</span>
                    <img src={selected.payment_screenshot_url} alt="Payment screenshot" className="mt-2 rounded-xl max-w-full" />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="text-center text-muted-foreground py-10">
              <p>Select an enquiry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
