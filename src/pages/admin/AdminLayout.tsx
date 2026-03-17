import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { Palette, LayoutDashboard, BookOpen, Image, Trophy, MessageSquare, Settings, LogOut, Menu, X } from 'lucide-react';
import { isAuthenticated, logout } from '@/mock-api/db';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Services', path: '/admin/services', icon: BookOpen },
  { label: 'Gallery', path: '/admin/gallery', icon: Image },
  { label: 'Achievements', path: '/admin/achievements', icon: Trophy },
  { label: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare },
  { label: 'Settings', path: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) navigate('/admin/login');
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  if (!isAuthenticated()) return null;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-card shadow-soft transform transition-transform lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-2 p-5 border-b border-border">
          <Palette className="h-6 w-6 text-brand-coral" />
          <span className="font-heading text-lg font-extrabold">Admin</span>
        </div>
        <nav className="p-3 space-y-1 flex-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? 'bg-brand-coral/10 text-brand-coral'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted w-full transition-colors">
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-foreground/20 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 flex items-center gap-4 px-4 border-b border-border bg-card lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="p-1" aria-label="Open sidebar">
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-heading font-bold">Admin Dashboard</span>
        </header>
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
