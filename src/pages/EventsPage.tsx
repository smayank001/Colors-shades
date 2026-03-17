import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Video, Image as ImageIcon } from 'lucide-react';

const EVENTS = [
  { id: '1', title: 'Summer Art Camp 2025', category: 'summer-camp', date: 'June 1–14, 2025', description: 'Two weeks of non-stop creativity! Drawing, painting, crafts, and art games for ages 4–12.', type: 'photo' },
  { id: '2', title: 'Watercolor Workshop', category: 'workshops', date: 'April 20, 2025', description: 'A special one-day workshop on watercolor techniques for beginners and intermediate students.', type: 'photo' },
  { id: '3', title: 'Weekend Sketch Class', category: 'classes', date: 'Every Saturday', description: 'Regular weekend sketching sessions for children who want extra practice time.', type: 'video' },
  { id: '4', title: 'Clay Modeling Workshop', category: 'workshops', date: 'May 5, 2025', description: 'Learn the basics of clay modeling and create your own miniature sculptures.', type: 'photo' },
  { id: '5', title: 'Art Exhibition 2025', category: 'summer-camp', date: 'July 2025', description: 'Annual student art exhibition showcasing the best works from the year.', type: 'photo' },
];

const TABS = ['All', 'Summer Camp', 'Workshops', 'Classes'];

export default function EventsPage() {
  const [tab, setTab] = useState('All');
  const filtered = tab === 'All' ? EVENTS : EVENTS.filter(e => e.category === tab.toLowerCase().replace(' ', '-'));

  return (
    <>
      <section className="bg-bg-cream py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold mb-4">Events & Workshops</h1>
          <p className="text-lg text-muted-foreground">Stay updated with our exciting events, camps, and workshops.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="flex flex-wrap gap-2 mb-10">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${t === tab ? 'bg-brand-coral text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-brand-sky/20 to-brand-fresh/20 flex items-center justify-center">
                {event.type === 'video' ? (
                  <Video className="h-12 w-12 text-brand-sky/50" />
                ) : (
                  <ImageIcon className="h-12 w-12 text-brand-coral/50" />
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Calendar className="h-3.5 w-3.5" />
                  {event.date}
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">{event.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
