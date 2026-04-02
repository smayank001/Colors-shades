import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getMedia } from '@/api';

const CATEGORIES = ['All', 'Paintings', 'Crafts', 'Summer Camp'];

export default function StudentWorkPage() {
  const [gallery, setGallery] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMedia('student_work')
      .then(data => setGallery(data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredGallery = activeCategory === 'All' 
    ? gallery 
    : gallery.filter(item => item.category === activeCategory);

  const selectedItem = gallery.find(g => g.id === selected);

  return (
    <div className="bg-[#F9F7F5] min-h-screen">
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24 bg-white">
        <div className="blob w-[500px] h-[500px] bg-[#4D96FF] -top-40 -left-40 opacity-5"></div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#1E293B] leading-none mb-8">
              Student <span className="text-[#4D96FF]">Masterpieces</span>
            </h1>
            <p className="text-xl text-[#1E293B]/60 leading-relaxed font-medium max-w-2xl mx-auto">
              Welcome to our virtual gallery! Explore the incredible journey of creativity and imagination through our students' diverse artworks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto px-4 lg:px-8 py-10">
        <div className="flex flex-wrap justify-center gap-4 bg-white p-4 rounded-[30px] shadow-sm border border-[#1E293B]/5 w-max mx-auto">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                activeCategory === cat 
                ? 'bg-[#4D96FF] text-white shadow-lg scale-105' 
                : 'text-[#1E293B]/60 hover:bg-[#F9F7F5] hover:text-[#4D96FF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-10 pb-32">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 gap-4">
            <div className="w-12 h-12 border-4 border-[#4D96FF]/20 border-t-[#4D96FF] rounded-full animate-spin"></div>
            <p className="text-[#1E293B]/60 font-bold">Bringing the art to life...</p>
          </div>
        ) : filteredGallery.length === 0 ? (
          <div className="bg-white rounded-[40px] p-20 text-center shadow-card border-2 border-dashed border-[#1E293B]/10">
            <div className="text-6xl mb-6">🎨</div>
            <h3 className="text-2xl font-bold text-[#1E293B] mb-2">No Artworks Found</h3>
            <p className="text-[#1E293B]/40 font-medium">We're getting ready to showcase some new masterpieces!</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
            {filteredGallery.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="break-inside-avoid cursor-pointer group relative"
                onClick={() => setSelected(item.id)}
              >
                <div className="relative bg-white rounded-[30px] overflow-hidden shadow-card hover:shadow-hover transition-all duration-500 border border-[#1E293B]/5">
                  {item.media_type === 'video' || (item.url && item.url.match(/\.(mp4|webm|ogg)$/i)) ? (
                    <div className="relative aspect-video">
                       <video src={item.url} className="w-full h-full object-cover" muted loop onMouseOver={e => (e.target as any).play()} onMouseOut={e => (e.target as any).pause()} />
                       <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                          <div className="w-12 h-12 bg-[#FF6B6B] rounded-full flex items-center justify-center text-white shadow-lg">▶</div>
                       </div>
                    </div>
                  ) : item.url ? (
                    <img src={item.url} alt={item.title} className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  ) : (
                    <div className="flex items-center justify-center h-64 bg-[#F9F7F5] transition-colors">
                      <span className="text-6xl grayscale group-hover:grayscale-0 transition-all duration-500 opacity-20">🎨</span>
                    </div>
                  )}
                  
                  {/* Info Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <p className="text-[#FFD93D] text-[10px] font-bold uppercase tracking-widest mb-2">{item.category}</p>
                      <h3 className="text-xl font-bold text-white shadow-sm">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 bg-[#1E293B]/95 backdrop-blur-md z-50 flex items-center justify-center p-6 sm:p-12" onClick={() => setSelected(null)}>
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              className="relative bg-white rounded-[40px] shadow-2xl p-4 sm:p-8 max-w-5xl w-full z-10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelected(null)} className="absolute top-6 right-6 p-3 rounded-2xl bg-[#F9F7F5] hover:bg-[#FF6B6B] hover:text-white text-[#1E293B] transition-all duration-300 z-20 shadow-sm" aria-label="Close">
                <X className="h-6 w-6" />
              </button>

              <div className="flex flex-col lg:flex-row gap-10">
                <div className="flex-1 rounded-[30px] overflow-hidden bg-[#F9F7F5] min-h-[300px] flex items-center justify-center">
                  {selectedItem.media_type === 'video' || (selectedItem.url && selectedItem.url.match(/\.(mp4|webm|ogg)$/i)) ? (
                    <video src={selectedItem.url} className="w-full h-full max-h-[70vh] object-contain" controls autoPlay />
                  ) : selectedItem.url ? (
                    <img src={selectedItem.url} alt={selectedItem.title} className="w-full h-full max-h-[70vh] object-contain" />
                  ) : (
                    <span className="text-9xl opacity-10">🎨</span>
                  )}
                </div>

                <div className="lg:w-80 flex flex-col justify-center">
                  <div className="px-4 py-1.5 bg-[#4D96FF]/10 text-[#4D96FF] rounded-full text-xs font-bold uppercase tracking-widest w-max mb-6">
                    {selectedItem.category}
                  </div>
                  <h3 className="text-3xl font-extrabold text-[#1E293B] mb-4">{selectedItem.title}</h3>
                  {selectedItem.subtitle && <p className="text-[#FF6B6B] font-bold text-lg mb-6">{selectedItem.subtitle}</p>}
                  <div className="mt-auto pt-8 border-t border-[#1E293B]/5">
                    <p className="text-[#1E293B]/40 text-xs font-bold uppercase tracking-widest">Added on</p>
                    <p className="text-[#1E293B]/60 font-medium">{new Date(selectedItem.created_at || Date.now()).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
