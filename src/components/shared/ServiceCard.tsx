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
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="h-full"
    >
      <Link
        to={`/services/${slug}`}
        className="block bg-white rounded-[30px] overflow-hidden shadow-card hover:shadow-hover border border-[#1E293B]/5 transition-all duration-500 group h-full flex flex-col"
      >
        <div className="relative h-64 w-full overflow-hidden">
          {image_url ? (
            <img 
              src={image_url} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
          ) : (
            <div className="w-full h-full bg-[#FF6B6B]/10 flex items-center justify-center text-6xl">🎨</div>
          )}
          {/* Decorative tag */}
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-white/90 backdrop-blur-md text-[#1E293B] text-xs font-bold px-4 py-2 rounded-full shadow-sm border border-white/20">
              {price || 'Explore'}
            </span>
          </div>
        </div>
        <div className="p-8 flex-grow flex flex-col">
          <h3 className="text-2xl font-bold text-[#1E293B] mb-3 group-hover:text-[#FF6B6B] transition-colors">{title}</h3>
          <p className="text-[#1E293B]/60 text-sm leading-relaxed mb-8 line-clamp-3 flex-grow">
            {description}
          </p>
          <div className="flex items-center text-[#FF6B6B] font-bold text-sm">
            <span>Learn More</span>
            <svg 
              className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
