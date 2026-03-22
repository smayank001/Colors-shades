import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  slug: string;
  title: string;
  description: string;
  image_url?: string;
  price?: string;
}

export function ServiceCard({ slug, title, description, image_url, price }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link
        to={`/services/${slug}`}
        className="block bg-card/40 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:bg-card/60 transition-all duration-300 group h-full flex flex-col"
      >
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          {image_url ? (
            <img 
              src={image_url} 
              alt={title} 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">🎨</div>
          )}
        </div>
        <div className="p-8 flex-grow flex flex-col">
          <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">{description}</p>
          <div>
            <span className="inline-block text-sm font-semibold text-brand-sky bg-brand-sky/10 px-4 py-1.5 rounded-full">
              {price || 'Contact for price'}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
