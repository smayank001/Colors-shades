import { useState, useEffect } from 'react';
import { getEnquiries } from '@/api';
import { toast } from 'sonner';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const data = await getEnquiries();
      setEnquiries(data || []);
    } catch (e: any) {
      toast.error('Failed to fetch enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-extrabold">Enquiries</h1>
      </div>

      <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading enquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No enquiries found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 font-semibold text-nowrap">Date</th>
                  <th className="px-4 py-3 font-semibold text-nowrap">Name</th>
                  <th className="px-4 py-3 font-semibold text-nowrap">Contact</th>
                  <th className="px-4 py-3 font-semibold text-nowrap">Service/Course</th>
                  <th className="px-4 py-3 font-semibold text-nowrap">Message</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((e: any) => (
                  <tr key={e.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="px-4 py-3 text-muted-foreground">{new Date(e.created_at || Date.now()).toLocaleDateString()}</td>
                    <td className="px-4 py-3 font-medium">{e.name}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{e.phone}</div>
                      <div className="text-[10px] text-muted-foreground">{e.email}</div>
                    </td>
                    <td className="px-4 py-3 text-brand-coral font-medium">{e.course || 'General'}</td>
                    <td className="px-4 py-3 text-muted-foreground break-words max-w-sm whitespace-pre-wrap">{e.message}</td>
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
