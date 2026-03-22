import { Link } from 'react-router-dom';
import { Palette, Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import content from '@/i18n/en.json';
import logoUrl from '@/assets/logo.jpg';

export function Footer() {
  return (
    <footer className="bg-[#0B1120] border-t border-white/5 text-foreground mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-sky/5 pointer-events-none"></div>
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 font-heading text-xl font-extrabold mb-4">
              <img src={logoUrl} alt="Logo" className="h-12 w-auto rounded-md shadow-lg border border-white/10" />
            </Link>
            <p className="text-sm opacity-70 leading-relaxed">{content.site.description.slice(0, 120)}...</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-base font-bold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {content.nav.map((item) => (
                <Link key={item.path} to={item.path} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-base font-bold mb-4">Contact Us</h4>
            <div className="flex flex-col gap-3 text-sm opacity-70">
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{content.site.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{content.site.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{content.site.address}</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-base font-bold mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a href={content.footer.social.instagram} aria-label="Instagram" className="p-2 rounded-full bg-white/5 hover:bg-brand-coral hover:text-white transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={content.footer.social.facebook} aria-label="Facebook" className="p-2 rounded-full bg-white/5 hover:bg-brand-sky hover:text-white transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={content.footer.social.youtube} aria-label="YouTube" className="p-2 rounded-full bg-white/5 hover:bg-brand-yellow hover:text-[#0F172A] transition-all duration-300">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm opacity-50 relative z-10">
          {content.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
