import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Palette, Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import content from "@/i18n/en.json";
import { useTheme } from "@/hooks/useTheme";
import logoUrl from "@/assets/logo.jpg";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  return (
    <nav
      className="sticky top-0 z-50 glass-nav border-b border-white/10"
      role="navigation"
      aria-label="Main navigation"
    >
    <div className="container mx-auto flex items-center justify-between h-20 px-4 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 font-heading text-xl font-extrabold text-foreground"
        >
         <img 
  src={logoUrl} 
  alt="Logo" 
  className="h-16 lg:h-20 w-auto object-contain transition-transform duration-300 hover:scale-105"
/>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {content.nav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-white group ${
                location.pathname === item.path
                  ? "text-white"
                  : "text-[#CBD5F5]"
              }`}
            >
              {item.label}
              <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#EF4444] transition-transform duration-300 origin-left ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </Link>
          ))}
          <Button 
            variant="default" 
            size="default" 
            className="ml-4 bg-gradient-to-r from-[#EF4444] to-[#B91C1C] hover:opacity-90 hover:scale-105 transition-all duration-300 border-0 text-white rounded-full px-6 shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_20px_rgba(239,68,68,0.6)] font-bold" 
            asChild
          >
            <Link to="/contact">Sign up</Link>
          </Button>
        </div>

        {/* Theme Switcher */}
        <div className="flex items-center gap-1 ml-4 pl-4 border-l border-border">
          {/* <button
            onClick={() => setTheme("light")}
            className={`p-2 rounded-full transition-all duration-200 ${
              theme === "light"
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="Switch to light theme"
            title="Light Theme"
          >
            <Sun className="h-5 w-5" />
          </button> */}
          {/* <button
            onClick={() => setTheme("dark")}
            className={`p-2 rounded-full transition-all duration-200 ${
              theme === "dark"
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="Switch to dark theme"
            title="Dark Theme"
          >
            <Moon className="h-5 w-5" />
          </button> */}
          {/* <button
            onClick={() => setTheme("impactfulDark")}
            className={`p-2 rounded-full transition-all duration-200 ${
              theme === "impactfulDark"
                ? "bg-blue-500/20 text-blue-500"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="Switch to impactful dark theme"
            title="Impactful Dark Theme"
          >
            <Moon className="h-5 w-5" />
          </button> */}
          {/* <button
            onClick={() => setTheme("system")}
            className={`p-2 rounded-full transition-all duration-200 ${
              theme === "system"
                ? "bg-primary/20 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="Switch to system theme"
            title="System Theme"
          >
            <Monitor className="h-5 w-5" />
          </button> */}
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {content.nav.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-white/10 ${
                    location.pathname === item.path
                      ? "bg-white/10 text-white"
                      : "text-[#CBD5F5]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Button 
                variant="default" 
                size="lg" 
                className="mt-2 bg-gradient-to-r from-[#EF4444] to-[#B91C1C] text-white rounded-full border-0 shadow-[0_0_15px_rgba(239,68,68,0.4)]" 
                asChild
              >
                <Link to="/contact" onClick={() => setMobileOpen(false)}>
                  Sign up
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
