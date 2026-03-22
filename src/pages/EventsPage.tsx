import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Video, Image as ImageIcon, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { getMedia } from '@/api';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  
  useEffect(() => {
    getMedia('events').then(data => setEvents(data || [])).catch(console.error);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-[#020617] py-24 lg:py-32 transition-colors border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EF4444]/10 via-transparent to-[#F97316]/5 pointer-events-none"></div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <h1 className="font-heading text-5xl sm:text-6xl font-bold mb-6 text-foreground">
            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] to-[#F97316]">Events</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl font-light leading-relaxed">
            Stay updated with our exciting events, camps, and workshops.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length === 0 ? (
             <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center text-muted-foreground p-8">No events found.</div>
          ) : events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-[#1E293B] border border-white/5 rounded-2xl overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] transition-all duration-300 group"
            >
              <div className="relative h-64 bg-gradient-to-br from-[#020617] to-[#1E293B] overflow-hidden">
                {event.media_type === 'video' || (event.url && event.url.match(/\.(mp4|webm|ogg)$/i)) ? (
                  <video src={event.url} className="w-full h-full object-cover" controls playsInline />
                ) : event.url ? (
                  <img src={event.url} alt={event.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <Calendar className="h-16 w-16 text-white" />
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white border border-white/10 px-4 py-1.5 rounded-full text-sm font-medium">
                  {new Date(event.event_date || event.created_at || Date.now()).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-heading text-2xl font-bold mb-4 text-foreground">{event.title}</h3>
                {event.subtitle && <p className="text-brand-coral font-medium mb-2">{event.subtitle}</p>}
                <p className="text-white/70 text-base leading-relaxed whitespace-pre-wrap">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modal removed as per user request to show description on page */}
    </>
  );
}
