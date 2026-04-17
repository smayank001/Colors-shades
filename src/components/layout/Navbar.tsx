import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import content from "@/i18n/en.json";
import logoUrl from "@/assets/logo.jpg";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "py-4 px-4 sm:px-6" 
          : "py-6 px-4 sm:px-8"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div 
        className={`container mx-auto flex items-center justify-between transition-all duration-500 rounded-[30px] px-6 lg:px-10 h-24 ${
          scrolled 
            ? "bg-white/80 backdrop-blur-xl shadow-card border border-white/20" 
            : "bg-transparent border-0"
        }`}
      >
        {/* Logo Left */}
        <Link
          to="/"
          className="flex items-center gap-2 group shrink-0"
        >
          <img 
            src={logoUrl} 
            alt="Colors N Shades" 
            className={`h-20 lg:h-32 w-auto object-contain transition-all duration-500 group-hover:scale-105 group-hover:rotate-2 ${!scrolled && "brightness-0 invert"}`}
          />
        </Link>

        {/* Desktop Nav Center */}
        <div className={`hidden lg:flex items-center gap-1 p-1.5 rounded-full border transition-all duration-500 ${
          scrolled 
            ? "bg-[#F9F7F5]/50 border-[#1E293B]/5" 
            : "bg-white/10 backdrop-blur-md border-white/20"
        }`}>
          {content.nav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-6 py-2.5 text-sm font-extrabold uppercase tracking-widest transition-all duration-300 rounded-full ${
                location.pathname === item.path
                  ? "text-white bg-[#FF6B6B] shadow-sm"
                  : scrolled 
                    ? "text-[#1E293B]/60 hover:text-[#FF6B6B] hover:bg-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Action Button Right */}
        <div className="hidden lg:flex items-center gap-4">
          <Button 
            className={`transition-all duration-500 rounded-full px-8 h-12 font-extrabold text-xs uppercase tracking-widest shadow-sm hover:shadow-hover border-0 ${
              scrolled 
                ? "bg-[#1E293B] text-white hover:bg-[#FF6B6B]" 
                : "bg-white text-[#1E293B] hover:bg-[#FFD93D]"
            }`} 
            asChild
          >
            <Link to="/contact">Join Class</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className={`lg:hidden p-3 rounded-2xl transition-all duration-300 ${
            mobileOpen 
              ? 'bg-[#FF6B6B] text-white' 
              : scrolled 
                ? 'bg-[#F9F7F5] text-[#1E293B] hover:bg-[#FF6B6B]/10 hover:text-[#FF6B6B]'
                : 'bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20'
          }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="lg:hidden absolute top-28 left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-[40px] shadow-2xl border border-[#1E293B]/5 p-8 overflow-hidden z-40"
          >
            <div className="flex flex-col gap-3">
              {content.nav.map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={item.path}
                >
                  <Link
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-8 py-5 rounded-[24px] text-lg font-extrabold uppercase tracking-widest transition-all ${
                      location.pathname === item.path
                        ? "bg-[#FF6B6B] text-white shadow-lg"
                        : "text-[#1E293B] hover:bg-[#F9F7F5] hover:text-[#FF6B6B]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: content.nav.length * 0.1 }}
                className="mt-4"
              >
                <Button 
                  className="w-full bg-[#1E293B] text-white rounded-[24px] h-16 font-extrabold uppercase tracking-widest shadow-xl border-0" 
                  asChild
                >
                  <Link to="/contact" onClick={() => setMobileOpen(false)}>
                    Join Today
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
