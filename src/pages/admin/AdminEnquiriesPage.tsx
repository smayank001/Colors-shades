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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold text-[#1E293B]">Enquiries</h1>
          <p className="text-[#1E293B]/40 font-bold text-xs uppercase tracking-widest leading-relaxed">Manage your student leads and messages.</p>
        </div>
      </div>

      <div className="bg-white rounded-[40px] shadow-sm border border-[#1E293B]/5 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-[#FF6B6B]/10 border-t-[#FF6B6B] rounded-full animate-spin"></div>
            <p className="text-[#1E293B]/40 font-bold uppercase tracking-widest text-xs">Loading leads...</p>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="p-20 text-center">
            <div className="text-5xl mb-4 opacity-20">📭</div>
            <p className="text-[#1E293B]/40 font-bold uppercase tracking-widest text-xs">No enquiries found yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F9F7F5]/50 border-b border-[#1E293B]/5">
                  <th className="px-8 py-6 text-[10px] font-extrabold text-[#1E293B]/40 uppercase tracking-[0.2em] whitespace-nowrap">Date Received</th>
                  <th className="px-8 py-6 text-[10px] font-extrabold text-[#1E293B]/40 uppercase tracking-[0.2em] whitespace-nowrap">Student Name</th>
                  <th className="px-8 py-6 text-[10px] font-extrabold text-[#1E293B]/40 uppercase tracking-[0.2em] whitespace-nowrap">Contact Info</th>
                  <th className="px-8 py-6 text-[10px] font-extrabold text-[#1E293B]/40 uppercase tracking-[0.2em] whitespace-nowrap">Program Interest</th>
                  <th className="px-8 py-6 text-[10px] font-extrabold text-[#1E293B]/40 uppercase tracking-[0.2em] whitespace-nowrap">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B]/5">
                {enquiries.map((e: any) => (
                  <tr key={e.id} className="hover:bg-[#F9F7F5]/30 transition-colors group">
                    <td className="px-8 py-6 text-sm font-bold text-[#1E293B]/40 tabular-nums">
                      {new Date(e.created_at || Date.now()).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                    </td>
                    <td className="px-8 py-6 font-extrabold text-[#1E293B] group-hover:text-[#FF6B6B] transition-colors">{e.name}</td>
                    <td className="px-8 py-6">
                      <div className="font-extrabold text-[#1E293B] text-sm mb-1">{e.phone}</div>
                      <div className="text-[10px] font-bold text-[#1E293B]/30 uppercase tracking-wider truncate max-w-[150px]">{e.email}</div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${e.course ? 'bg-[#FF6B6B]/10 text-[#FF6B6B]' : 'bg-[#1E293B]/5 text-[#1E293B]/40'}`}>
                        {e.course || 'General'}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-[#1E293B]/60 text-sm font-medium leading-relaxed max-w-md">
                      <div className="line-clamp-2 italic">"{e.message}"</div>
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
