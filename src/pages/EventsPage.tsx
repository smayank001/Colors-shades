import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Video, Image as ImageIcon, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { getMedia } from '@/api';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    getMedia('events')
      .then(data => setEvents(data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#F9F7F5] min-h-screen">
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white">
        <div className="blob w-[400px] h-[400px] bg-[#6BCB77] -top-20 -right-20 opacity-10"></div>
        <div className="blob w-[300px] h-[300px] bg-[#FF6B6B] bottom-0 -left-20 opacity-10"></div>
        
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#1E293B] leading-none mb-8">
              Exciting <span className="text-[#6BCB77]">Events</span> & Workshops
            </h1>
            <p className="text-xl text-[#1E293B]/60 leading-relaxed max-w-2xl font-medium">
              Join us for our upcoming art exhibitions, creative workshops, and community events. There's always something inspiring happening at Colors N Shades!
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-20 pb-32">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 gap-4">
            <div className="w-12 h-12 border-4 border-[#6BCB77]/20 border-t-[#6BCB77] rounded-full animate-spin"></div>
            <p className="text-[#1E293B]/60 font-bold">Loading upcoming events...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white rounded-[40px] p-20 text-center shadow-card border-2 border-dashed border-[#1E293B]/10">
            <div className="text-6xl mb-6">📅</div>
            <h3 className="text-2xl font-bold text-[#1E293B] mb-2">No Upcoming Events</h3>
            <p className="text-[#1E293B]/40 font-medium">We're planning some amazing activities. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-white rounded-[40px] overflow-hidden shadow-card hover:shadow-hover transition-all duration-500 group border border-[#1E293B]/5"
              >
                <div className="relative h-72 overflow-hidden">
                  {event.media_type === 'video' || (event.url && event.url.match(/\.(mp4|webm|ogg)$/i)) ? (
                    <video src={event.url} className="w-full h-full object-cover" controls playsInline />
                  ) : event.url ? (
                    <img src={event.url} alt={event.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#6BCB77]/20 to-[#4D96FF]/20 flex items-center justify-center">
                      <Calendar className="h-20 w-20 text-[#6BCB77]/40" />
                    </div>
                  )}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-[#1E293B] px-5 py-2 rounded-2xl text-sm font-bold shadow-sm border border-white/50">
                    {new Date(event.event_date || event.created_at || Date.now()).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-extrabold mb-4 text-[#1E293B] group-hover:text-[#6BCB77] transition-colors">{event.title}</h3>
                  {event.subtitle && <p className="text-[#6BCB77] font-bold text-sm uppercase tracking-wider mb-4">{event.subtitle}</p>}
                  <p className="text-[#1E293B]/60 text-base leading-relaxed font-medium line-clamp-4">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
