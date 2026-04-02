import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import { Palette, LayoutDashboard, BookOpen, Image, Trophy, MessageSquare, Settings, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { isAuthenticated, logout } from '@/api';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Services', path: '/admin/services', icon: BookOpen },
  { label: 'Courses', path: '/admin/courses', icon: BookOpen },
  { label: 'Media', path: '/admin/media', icon: Image },
  { label: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare },
  { label: 'QR Code', path: '/admin/qr', icon: Settings },
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
    <div className="min-h-screen flex bg-[#F9F7F5]">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-white shadow-card transform transition-transform lg:translate-x-0 lg:static flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-3 p-8 border-b border-[#1E293B]/5 bg-[#F9F7F5]/30">
          <div className="p-2.5 rounded-2xl bg-[#FF6B6B] shadow-sm">
            <Palette className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-extrabold text-[#1E293B] uppercase tracking-widest">Admin Hub</span>
        </div>
        
        <nav className="p-6 space-y-3 flex-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-4 px-6 py-4 rounded-[20px] text-sm font-extrabold uppercase tracking-widest transition-all duration-300 ${
                location.pathname === item.path
                  ? 'bg-[#FF6B6B] text-white shadow-lg translate-x-2'
                  : 'text-[#1E293B]/40 hover:bg-[#F9F7F5] hover:text-[#FF6B6B]'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-[#1E293B]/5">
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-4 px-6 py-4 rounded-[20px] text-sm font-extrabold uppercase tracking-widest text-[#1E293B]/40 hover:bg-[#FF6B6B]/10 hover:text-[#FF6B6B] w-full transition-all duration-300 group"
          >
            <LogOut className="h-5 w-5 group-hover:rotate-12 transition-transform" /> 
            Sign Out
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-[#1E293B]/60 backdrop-blur-md lg:hidden" 
            onClick={() => setSidebarOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-20 flex items-center justify-between px-8 bg-white border-b border-[#1E293B]/5 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="lg:hidden p-3 rounded-2xl bg-[#F9F7F5] text-[#1E293B] hover:bg-[#FF6B6B]/10 hover:text-[#FF6B6B] transition-all" 
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-extrabold text-[#1E293B] uppercase tracking-widest hidden sm:block">
              {NAV_ITEMS.find(n => n.path === location.pathname)?.label || 'Dashboard'}
            </h2>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <p className="text-sm font-extrabold text-[#1E293B]">Art Director</p>
              <p className="text-[10px] font-bold text-[#1E293B]/40 uppercase tracking-widest">Colors N Shades</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#F9F7F5] flex items-center justify-center text-xl shadow-inner border border-[#1E293B]/5">
              👨‍🎨
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 overflow-y-auto custom-scrollbar">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
