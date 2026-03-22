import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getMedia } from '@/api';

const CATEGORIES = ['All', 'Paintings', 'Crafts', 'Summer Camp'];

export default function StudentWorkPage() {
  const [gallery, setGallery] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    getMedia('student_work').then(data => setGallery(data || [])).catch(console.error);
  }, []);

  const filteredGallery = activeCategory === 'All' 
    ? gallery 
    : gallery.filter(item => item.category === activeCategory);

  const selectedItem = gallery.find(g => g.id === selected);

  // Generate placeholder colors for items without images
  const placeholderColors = ['from-brand-coral/30 to-brand-yellow/30', 'from-brand-sky/30 to-brand-fresh/30', 'from-brand-yellow/30 to-brand-coral/30', 'from-brand-fresh/30 to-brand-sky/30'];

  return (
    <>
      <section className="relative overflow-hidden bg-[#020617] py-24 lg:py-32 transition-colors border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EF4444]/10 via-transparent to-[#F97316]/5 pointer-events-none"></div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <h1 className="font-heading text-5xl sm:text-6xl font-bold mb-6 text-foreground">
            Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] to-[#F97316]">Work</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl font-light leading-relaxed">
            A gallery of creativity — showcasing our students' amazing artwork.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-4">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${
                activeCategory === cat 
                ? 'bg-brand-coral border-brand-coral text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' 
                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-8">
        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredGallery.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="break-inside-avoid cursor-pointer group mb-4 relative"
              onClick={() => setSelected(item.id)}
            >
              <div className={`relative bg-[#1E293B] rounded-2xl overflow-hidden shadow-lg group-hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] transition-all duration-500 transform group-hover:-translate-y-2 border border-white/5`}>
                {item.media_type === 'video' || (item.url && item.url.match(/\.(mp4|webm|ogg)$/i)) ? (
                  <div className="relative aspect-video bg-[#020617]">
                     <video src={item.url} className="w-full h-full object-cover" muted loop onMouseOver={e => (e.target as any).play()} onMouseOut={e => (e.target as any).pause()} />
                     <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                        <span className="text-white bg-brand-coral/80 p-2 rounded-full">▶</span>
                     </div>
                  </div>
                ) : item.url ? (
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                ) : (
                  <div className={`flex items-center justify-center ${i % 3 === 0 ? 'h-72' : i % 3 === 1 ? 'h-56' : 'h-64'} bg-[#020617]/50`}>
                    <span className="text-6xl opacity-30 drop-shadow-lg filter grayscale group-hover:grayscale-0 transition-all duration-500">🎨</span>
                  </div>
                )}
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-[#020617]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="font-heading text-xl font-bold text-white mb-1 shadow-black/50 drop-shadow-md">{item.title}</h3>
                  {item.subtitle && <p className="text-brand-coral text-sm font-medium mb-1">{item.subtitle}</p>}
                  <p className="text-white/40 text-[10px] font-medium uppercase tracking-wider">{item.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 bg-[#020617]/90 backdrop-blur-xl z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-[#1E293B] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(239,68,68,0.1)] p-6 max-w-2xl w-full z-10"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors z-20" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
              {selectedItem.media_type === 'video' || (selectedItem.url && selectedItem.url.match(/\.(mp4|webm|ogg)$/i)) ? (
                <div className="rounded-xl overflow-hidden mb-6 bg-[#020617] border border-[#1E293B]">
                  <video src={selectedItem.url} className="w-full max-h-[70vh] object-contain" controls autoPlay />
                </div>
              ) : selectedItem.url ? (
                <div className="rounded-xl h-64 sm:h-[60vh] overflow-hidden mb-6 bg-[#020617] border border-[#1E293B]">
                  <img src={selectedItem.url} alt={selectedItem.title} className="w-full h-full object-contain" />
                </div>
              ) : (
                <div className="bg-[#020617] rounded-xl h-64 sm:h-[40vh] flex items-center justify-center mb-6 border border-[#1E293B]">
                  <span className="text-8xl opacity-20">🎨</span>
                </div>
              )}
              <h3 className="font-heading text-3xl font-bold text-foreground mb-1">{selectedItem.title}</h3>
              {selectedItem.subtitle && <p className="text-brand-coral font-medium text-lg mb-4">{selectedItem.subtitle}</p>}
              <div className="flex items-center gap-3">
                <p className="text-xs font-semibold text-white/50 bg-white/5 uppercase px-3 py-1 rounded-full">{selectedItem.category}</p>
                <p className="text-[10px] text-white/30 uppercase tracking-widest">{new Date(selectedItem.created_at || Date.now()).toLocaleDateString()}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
