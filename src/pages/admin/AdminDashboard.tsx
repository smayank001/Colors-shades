import { useState, useEffect } from 'react';
import { BookOpen, Image, MessageSquare, PlayCircle } from 'lucide-react';
import { getServices, getCourses, getMedia, getEnquiries } from '@/api';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ services: 0, courses: 0, media: 0, enquiries: 0 });
  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);

  useEffect(() => {
    async function loadStats() {
      try {
        const [services, media, enquiries] = await Promise.all([
          getServices(),
          getMedia('events'), // optionally fetch more categories
          getEnquiries(),
        ]);
        
        let courseCount = 0;
        if (services && services.length) {
          // just an estimate or fetch for first service
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
      }
    }
    loadStats();
  }, []);

  const stats = [
    { label: 'Services', count: counts.services, icon: BookOpen, color: 'bg-brand-coral/10 text-brand-coral' },
    { label: 'Courses (1st service)', count: counts.courses, icon: PlayCircle, color: 'bg-brand-sky/10 text-brand-sky' },
    { label: 'Media Items', count: counts.media, icon: Image, color: 'bg-brand-yellow/10 text-brand-yellow' },
    { label: 'Enquiries', count: counts.enquiries, icon: MessageSquare, color: 'bg-brand-fresh/10 text-brand-fresh' },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-extrabold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-2xl p-6 shadow-soft">
            <div className={`inline-flex p-2 rounded-xl ${s.color} mb-3`}>
              <s.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold font-heading tabular-nums">{s.count}</p>
            <p className="text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <h2 className="font-heading text-lg font-bold mb-4">Recent Enquiries</h2>
      <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
        {recentEnquiries.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No recent enquiries found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3 font-semibold">Course</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.map((e) => (
                  <tr key={e.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{e.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{e.phone}</td>
                    <td className="px-4 py-3 text-brand-coral font-medium">{e.course}</td>
                    <td className="px-4 py-3 text-muted-foreground tabular-nums">{new Date(e.created_at || Date.now()).toLocaleDateString()}</td>
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
