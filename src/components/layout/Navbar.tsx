import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import content from '@/i18n/en.json';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 glass-card" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-heading text-xl font-extrabold text-foreground">
          <Palette className="h-7 w-7 text-brand-coral" />
          <span>{content.site.name}</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {content.nav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-muted ${
                location.pathname === item.path ? 'bg-muted text-foreground' : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Button variant="hero" size="default" className="ml-4" asChild>
            <Link to="/contact">Sign up</Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {content.nav.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors hover:bg-muted ${
                    location.pathname === item.path ? 'bg-muted text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Button variant="hero" size="lg" className="mt-2" asChild>
                <Link to="/contact" onClick={() => setMobileOpen(false)}>Sign up</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
