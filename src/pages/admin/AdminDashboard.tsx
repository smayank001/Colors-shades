import { BookOpen, Image, Trophy, MessageSquare } from 'lucide-react';
import { getServices, getGallery, getAchievements, getEnquiries } from '@/mock-api/db';

export default function AdminDashboard() {
  const stats = [
    { label: 'Services', count: getServices().length, icon: BookOpen, color: 'bg-brand-coral/10 text-brand-coral' },
    { label: 'Gallery Items', count: getGallery().length, icon: Image, color: 'bg-brand-sky/10 text-brand-sky' },
    { label: 'Achievements', count: getAchievements().length, icon: Trophy, color: 'bg-brand-yellow/10 text-brand-yellow' },
    { label: 'Enquiries', count: getEnquiries().length, icon: MessageSquare, color: 'bg-brand-fresh/10 text-brand-fresh' },
  ];

  const recentEnquiries = getEnquiries().slice(-5).reverse();

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
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Course</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentEnquiries.map((e) => (
                <tr key={e.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">{e.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.course_slug || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                      e.status === 'paid' ? 'bg-brand-fresh/10 text-brand-fresh' :
                      e.status === 'processed' ? 'bg-brand-sky/10 text-brand-sky' :
                      'bg-brand-yellow/10 text-brand-yellow'
                    }`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground tabular-nums">{new Date(e.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
