import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, X, Maximize2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getMedia } from '@/api';

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  useEffect(() => {
    getMedia('achievements').then(data => setAchievements(data || [])).catch(console.error);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-[#020617] py-24 lg:py-32 transition-colors border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EF4444]/10 via-transparent to-[#F97316]/5 pointer-events-none"></div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <h1 className="font-heading text-5xl sm:text-6xl font-bold mb-6 text-foreground">
            Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] to-[#F97316]">Achievements</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl font-light leading-relaxed">
            Celebrating our students' success and recognition in competitions.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-sky via-brand-yellow to-transparent hidden md:block opacity-30" />

          <div className="space-y-8">
            {achievements.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative md:pl-16 group"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-8 w-5 h-5 rounded-full bg-gradient-to-br from-brand-sky to-brand-yellow hidden md:flex items-center justify-center z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)] transform group-hover:scale-125 transition-transform duration-300">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>

                <div className="bg-card/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:bg-card/60 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-brand-sky/20 to-brand-yellow/20 shrink-0 border border-white/10 group-hover:bg-brand-sky/20 transition-colors">
                      <Trophy className="h-8 w-8 text-brand-yellow drop-shadow-md" />
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl font-bold mb-2 text-foreground group-hover:text-brand-yellow transition-colors">{a.title}</h3>
                      <div className="flex items-center gap-2 text-xs text-brand-sky font-medium mb-3 bg-brand-sky/10 px-3 py-1 rounded-full w-max">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(a.event_date || a.created_at || Date.now()).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      
                      {a.description && <p className="text-white/70 text-sm leading-relaxed mb-4 whitespace-pre-wrap">{a.description}</p>}

                      {a.url && (
                        <div className="mt-4 relative group/media cursor-pointer max-w-[240px] rounded-xl overflow-hidden border border-white/10" onClick={() => setSelectedMedia(a)}>
                          {a.media_type === 'video' || (a.url && a.url.match(/\.(mp4|webm|ogg)$/i)) ? (
                            <div className="relative">
                              <video src={a.url} className="w-full aspect-video object-cover" muted playsInline />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/media:opacity-100 transition-opacity">
                                <Maximize2 className="h-6 w-6 text-white" />
                              </div>
                            </div>
                          ) : (
                            <div className="relative">
                              <img src={a.url} alt={a.title} className="w-full h-auto object-cover max-h-[160px]" />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/media:opacity-100 transition-opacity">
                                <Maximize2 className="h-6 w-6 text-white" />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Lightbox/Popup */}
      <AnimatePresence>
        {selectedMedia && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMedia(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-5xl max-h-[90vh] z-10 flex flex-col items-center"
            >
              <button 
                onClick={() => setSelectedMedia(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-brand-coral transition-colors"
                aria-label="Close"
              >
                <X className="h-8 w-8" />
              </button>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden w-full shadow-2xl">
                {selectedMedia.media_type === 'video' || (selectedMedia.url && selectedMedia.url.match(/\.(mp4|webm|ogg)$/i)) ? (
                  <video src={selectedMedia.url} className="w-full h-auto max-h-[70vh] object-contain" controls autoPlay />
                ) : (
                  <img src={selectedMedia.url} alt={selectedMedia.title} className="w-full h-auto max-h-[70vh] object-contain" />
                )}
                <div className="p-6 bg-[#020617] border-t border-white/5">
                  <h3 className="text-2xl font-bold mb-2">{selectedMedia.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-brand-sky font-medium mb-3">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(selectedMedia.event_date || selectedMedia.created_at || Date.now()).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  {selectedMedia.description && <p className="text-white/70 text-sm leading-relaxed">{selectedMedia.description}</p>}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
