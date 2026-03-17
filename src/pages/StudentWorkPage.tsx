import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { getGallery } from '@/mock-api/db';

const CATEGORIES = ['All', 'Paintings', 'Crafts', 'Summer Camp'];

export default function StudentWorkPage() {
  const gallery = getGallery();
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = category === 'All' ? gallery : gallery.filter(g => g.category === category.toLowerCase().replace(' ', '-'));
  const selectedItem = gallery.find(g => g.id === selected);

  // Generate placeholder colors for items without images
  const placeholderColors = ['from-brand-coral/30 to-brand-yellow/30', 'from-brand-sky/30 to-brand-fresh/30', 'from-brand-yellow/30 to-brand-coral/30', 'from-brand-fresh/30 to-brand-sky/30'];

  return (
    <>
      <section className="bg-bg-cream py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold mb-4">Student Work</h1>
          <p className="text-lg text-muted-foreground">A gallery of creativity — showcasing our students' amazing artwork.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${c === category ? 'bg-brand-sky text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="break-inside-avoid cursor-pointer group"
              onClick={() => setSelected(item.id)}
            >
              <div className={`bg-gradient-to-br ${placeholderColors[i % placeholderColors.length]} rounded-2xl overflow-hidden shadow-soft group-hover:shadow-hover transition-shadow`}>
                <div className={`flex items-center justify-center ${i % 3 === 0 ? 'h-64' : i % 3 === 1 ? 'h-48' : 'h-56'}`}>
                  <span className="text-6xl opacity-50">🎨</span>
                </div>
                <div className="p-4 bg-card/80 backdrop-blur-sm">
                  <h3 className="font-heading text-sm font-bold">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-card rounded-2xl shadow-hover p-6 max-w-lg w-full z-10"
            >
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
              <div className="bg-gradient-to-br from-brand-coral/20 to-brand-yellow/20 rounded-xl h-64 flex items-center justify-center mb-4">
                <span className="text-8xl opacity-40">🎨</span>
              </div>
              <h3 className="font-heading text-xl font-bold">{selectedItem.title}</h3>
              <p className="text-sm text-muted-foreground">{selectedItem.caption}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedItem.tags.map(t => (
                  <span key={t} className="text-xs bg-muted px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
