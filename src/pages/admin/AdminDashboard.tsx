import { useState, useEffect } from 'react';
import { BookOpen, Image, MessageSquare, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getServices, getCourses, getMedia, getEnquiries } from '@/api';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ services: 0, courses: 0, media: 0, enquiries: 0 });
  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      setLoading(true);
      try {
        const [services, media, enquiries] = await Promise.all([
          getServices(),
          getMedia('events'),
          getEnquiries(),
        ]);
        
        let courseCount = 0;
        if (services && services.length) {
          const courses = await getCourses(services[0].id);
          courseCount = courses ? courses.length : 0;
        }

        setCounts({
          services: services ? services.length : 0,
          courses: courseCount,
          media: media ? media.length : 0,
          enquiries: enquiries ? enquiries.length : 0,
        });

        if (enquiries) {
          setRecentEnquiries(enquiries.slice(0, 5));
        }
      } catch (e) {
        console.error('Failed to load dashboard stats', e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const stats = [
    { label: 'Services', count: counts.services, icon: BookOpen, color: '#FF6B6B' },
    { label: 'Active Courses', count: counts.courses, icon: PlayCircle, color: '#4D96FF' },
    { label: 'Gallery Items', count: counts.media, icon: Image, color: '#FFD93D' },
    { label: 'Total Enquiries', count: counts.enquiries, icon: MessageSquare, color: '#6BCB77' },
  ];

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold text-[#1E293B]">Welcome Back, <span className="text-[#FF6B6B]">Art Director!</span></h1>
        <p className="text-[#1E293B]/40 font-bold text-sm uppercase tracking-widest">Here's what's happening at Colors N Shades today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div 
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[40px] p-8 shadow-sm border border-[#1E293B]/5 hover:shadow-card transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity translate-x-4 -translate-y-4">
               <s.icon className="w-full h-full" />
            </div>
            <div 
              className="inline-flex p-4 rounded-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500" 
              style={{ backgroundColor: `${s.color}15`, color: s.color }}
            >
              <s.icon className="h-6 w-6" />
            </div>
            <p className="text-4xl font-extrabold text-[#1E293B] mb-2 tabular-nums">{s.count}</p>
            <p className="text-sm font-extrabold text-[#1E293B]/40 uppercase tracking-widest">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-[#1E293B] uppercase tracking-widest">Recent Enquiries</h2>
          <Button variant="ghost" className="text-[#FF6B6B] font-extrabold uppercase tracking-widest text-xs hover:bg-[#FF6B6B]/10 rounded-xl" asChild>
             <Link to="/admin/enquiries">View All Enquiries</Link>
          </Button>
        </div>

        <div className="bg-white rounded-[40px] shadow-sm border border-[#1E293B]/5 overflow-hidden">
          {loading ? (
            <div className="p-20 text-center flex flex-col items-center gap-4">
               <div className="w-10 h-10 border-4 border-[#FF6B6B]/10 border-t-[#FF6B6B] rounded-full animate-spin"></div>
               <p className="text-[#1E293B]/40 font-bold uppercase tracking-widest text-xs">Loading data...</p>
            </div>
          ) : recentEnquiries.length === 0 ? (
            <div className="p-20 text-center">
               <div className="text-5xl mb-4 opacity-20">📩</div>
               <p className="text-[#1E293B]/40 font-bold uppercase tracking-widest text-xs">No recent enquiries found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F9F7F5]/50 border-b border-[#1E293B]/5">
                    <th className="px-10 py-6 text-[10px] font-extrabold text-[#1E293B]/40 uppercase tracking-[0.2em]">Student Name</th>
                    <th className="px-10 py-6 text-[10px] font-extrabold text-[#1E293B]/40 uppercase tracking-[0.2em]">Contact</th>
                    <th className="px-10 py-6 text-[10px] font-extrabold text-[#1E293B]/40 uppercase tracking-[0.2em]">Course Interest</th>
                    <th className="px-10 py-6 text-[10px] font-extrabold text-[#1E293B]/40 uppercase tracking-[0.2em]">Received Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E293B]/5">
                  {recentEnquiries.map((e) => (
                    <tr key={e.id} className="hover:bg-[#F9F7F5]/30 transition-colors group">
                      <td className="px-10 py-6">
                        <span className="font-extrabold text-[#1E293B] group-hover:text-[#FF6B6B] transition-colors">{e.name}</span>
                      </td>
                      <td className="px-10 py-6 text-sm font-medium text-[#1E293B]/60">{e.phone}</td>
                      <td className="px-10 py-6">
                        <span className="px-5 py-1.5 rounded-full bg-[#4D96FF]/10 text-[#4D96FF] text-[10px] font-extrabold uppercase tracking-widest">
                          {e.course}
                        </span>
                      </td>
                      <td className="px-10 py-6 text-sm font-bold text-[#1E293B]/40 tabular-nums">
                        {new Date(e.created_at || Date.now()).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
