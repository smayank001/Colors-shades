import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import content from '@/i18n/en.json';
import logoUrl from '@/assets/logo.jpg';

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#1E293B]/5 text-[#1E293B] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B6B] via-[#FFD93D] to-[#4D96FF]"></div>
      
      <div className="container mx-auto px-4 lg:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-8 group">
              <img 
                src={logoUrl} 
                alt="Colors N Shades Logo" 
                className="h-16 w-auto rounded-2xl shadow-sm group-hover:scale-105 transition-transform duration-300" 
              />
            </Link>
            <p className="text-[#1E293B]/60 text-base leading-relaxed font-medium mb-8">
              {content.site.description.slice(0, 150)}...
            </p>
            <div className="flex gap-4">
              <a href={content.footer.social.instagram} aria-label="Instagram" className="w-12 h-12 rounded-2xl bg-[#FF6B6B]/10 flex items-center justify-center text-[#FF6B6B] hover:bg-[#FF6B6B] hover:text-white transition-all duration-300 shadow-sm border border-[#FF6B6B]/10">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={content.footer.social.facebook} aria-label="Facebook" className="w-12 h-12 rounded-2xl bg-[#4D96FF]/10 flex items-center justify-center text-[#4D96FF] hover:bg-[#4D96FF] hover:text-white transition-all duration-300 shadow-sm border border-[#4D96FF]/10">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={content.footer.social.youtube} aria-label="YouTube" className="w-12 h-12 rounded-2xl bg-[#FFD93D]/10 flex items-center justify-center text-[#FFD93D] hover:bg-[#FFD93D] hover:text-white transition-all duration-300 shadow-sm border border-[#FFD93D]/10">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-extrabold mb-8 text-[#1E293B] uppercase tracking-widest">Explore</h4>
            <div className="flex flex-col gap-4">
              {content.nav.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path} 
                  className="text-[#1E293B]/60 hover:text-[#FF6B6B] font-bold transition-all hover:translate-x-1"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-lg font-extrabold mb-8 text-[#1E293B] uppercase tracking-widest">Connect</h4>
            <div className="flex flex-col gap-6 font-medium">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#F9F7F5] flex items-center justify-center text-[#1E293B]/40 group-hover:text-[#FF6B6B] group-hover:bg-[#FF6B6B]/10 transition-colors shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-[#1E293B]/70 group-hover:text-[#1E293B] transition-colors">{content.site.phone}</span>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#F9F7F5] flex items-center justify-center text-[#1E293B]/40 group-hover:text-[#FF6B6B] group-hover:bg-[#FF6B6B]/10 transition-colors shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="text-[#1E293B]/70 group-hover:text-[#1E293B] transition-colors break-all">{content.site.email}</span>
              </div>
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-[#F9F7F5] flex items-center justify-center text-[#1E293B]/40 group-hover:text-[#FF6B6B] group-hover:bg-[#FF6B6B]/10 transition-colors shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-[#1E293B]/70 group-hover:text-[#1E293B] transition-colors leading-relaxed">{content.site.address}</span>
              </div>
            </div>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-lg font-extrabold mb-8 text-[#1E293B] uppercase tracking-widest">Art Tips</h4>
            <p className="text-[#1E293B]/60 text-sm font-medium leading-relaxed mb-6">
              Subscribe to get creative art tips and updates on new programs!
            </p>
            <div className="flex gap-2 p-1.5 bg-[#F9F7F5] rounded-2xl border border-[#1E293B]/5">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent border-none focus:ring-0 text-sm px-4 flex-grow font-bold text-[#1E293B]" 
              />
              <button className="bg-[#1E293B] text-white px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#FF6B6B] transition-colors shadow-sm">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-[#1E293B]/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-bold text-[#1E293B]/40 uppercase tracking-widest">
            {content.footer.copyright}
          </p>
          <div className="flex gap-8 text-xs font-extrabold text-[#1E293B]/30 uppercase tracking-widest">
            <Link to="/" className="hover:text-[#FF6B6B] transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-[#FF6B6B] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
