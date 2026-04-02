import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, X, Maximize2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getMedia } from '@/api';

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getMedia('achievements')
      .then(data => setAchievements(data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#F9F7F5] min-h-screen">
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white">
        <div className="blob w-[400px] h-[400px] bg-[#FFD93D] -bottom-20 -left-20 opacity-10"></div>
        <div className="blob w-[300px] h-[300px] bg-[#4D96FF] -top-20 -right-20 opacity-10"></div>
        
        <div className="container relative mx-auto px-4 lg:px-8 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#1E293B] leading-none mb-8">
              Proud <span className="text-[#FFD93D]">Moments</span>
            </h1>
            <p className="text-xl text-[#1E293B]/60 leading-relaxed font-medium">
              Celebrating the achievements and recognition earned by our brilliant students in various art competitions and exhibitions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-20 pb-32">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 gap-4">
            <div className="w-12 h-12 border-4 border-[#FFD93D]/20 border-t-[#FFD93D] rounded-full animate-spin"></div>
            <p className="text-[#1E293B]/60 font-bold">Reflecting on our success...</p>
          </div>
        ) : achievements.length === 0 ? (
          <div className="bg-white rounded-[40px] p-20 text-center shadow-card border-2 border-dashed border-[#1E293B]/10 max-w-4xl mx-auto">
            <div className="text-6xl mb-6">🏆</div>
            <h3 className="text-2xl font-bold text-[#1E293B] mb-2">No Achievements Yet</h3>
            <p className="text-[#1E293B]/40 font-medium">Our students are hard at work creating magic!</p>
          </div>
        ) : (
          <div className="relative max-w-5xl mx-auto">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[4px] bg-[#FFD93D]/20 hidden md:block" />

            <div className="space-y-16">
              {achievements.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`relative flex flex-col md:flex-row items-center gap-10 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-[#FFD93D] z-10 hidden md:block shadow-sm" />

                  <div className="md:w-1/2 w-full">
                    <div className="bg-white rounded-[40px] p-10 shadow-card border border-[#1E293B]/5 hover:shadow-hover transition-all duration-500 group">
                      <div className="flex items-start gap-6">
                        <div className="p-5 rounded-3xl bg-[#FFD93D]/10 shrink-0 group-hover:bg-[#FFD93D] transition-colors duration-500">
                          <Trophy className="h-8 w-8 text-[#FFD93D] group-hover:text-white transition-colors duration-500" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-xs text-[#FFD93D] font-extrabold uppercase tracking-widest mb-3 bg-[#FFD93D]/10 px-4 py-1.5 rounded-full w-max">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(a.event_date || a.created_at || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                          </div>
                          <h3 className="text-2xl font-extrabold mb-4 text-[#1E293B] group-hover:text-[#FFD93D] transition-colors duration-500">{a.title}</h3>
                          {a.description && <p className="text-[#1E293B]/60 text-base leading-relaxed font-medium mb-6">{a.description}</p>}

                          {a.url && (
                            <div 
                              className="relative cursor-pointer rounded-[30px] overflow-hidden border-4 border-[#F9F7F5] shadow-sm hover:scale-[1.02] transition-all duration-500" 
                              onClick={() => setSelectedMedia(a)}
                            >
                              {a.media_type === 'video' || (a.url && a.url.match(/\.(mp4|webm|ogg)$/i)) ? (
                                <div className="relative aspect-video">
                                  <video src={a.url} className="w-full h-full object-cover" muted playsInline />
                                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                                      <Maximize2 className="h-5 w-5" />
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="relative">
                                  <img src={a.url} alt={a.title} className="w-full h-48 object-cover" />
                                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                                      <Maximize2 className="h-5 w-5" />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Media Lightbox */}
      <AnimatePresence>
        {selectedMedia && (
          <div className="fixed inset-0 bg-[#1E293B]/95 backdrop-blur-md z-50 flex items-center justify-center p-6 sm:p-12" onClick={() => setSelectedMedia(null)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-[40px] shadow-2xl p-4 sm:p-8 max-w-5xl w-full z-10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedMedia(null)}
                className="absolute top-6 right-6 p-3 rounded-2xl bg-[#F9F7F5] hover:bg-[#FF6B6B] hover:text-white text-[#1E293B] transition-all duration-300 z-20 shadow-sm"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="flex flex-col lg:flex-row gap-10">
                <div className="flex-1 rounded-[30px] overflow-hidden bg-[#F9F7F5] min-h-[300px] flex items-center justify-center">
                  {selectedMedia.media_type === 'video' || (selectedMedia.url && selectedMedia.url.match(/\.(mp4|webm|ogg)$/i)) ? (
                    <video src={selectedMedia.url} className="w-full h-full max-h-[70vh] object-contain" controls autoPlay />
                  ) : (
                    <img src={selectedMedia.url} alt={selectedMedia.title} className="w-full h-full max-h-[70vh] object-contain" />
                  )}
                </div>
                <div className="lg:w-80 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-xs text-[#FFD93D] font-extrabold uppercase tracking-widest mb-6 bg-[#FFD93D]/5 px-4 py-1.5 rounded-full w-max">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(selectedMedia.event_date || selectedMedia.created_at || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </div>
                  <h3 className="text-3xl font-extrabold text-[#1E293B] mb-6">{selectedMedia.title}</h3>
                  {selectedMedia.description && <p className="text-[#1E293B]/60 text-lg font-medium leading-relaxed mb-6">{selectedMedia.description}</p>}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
