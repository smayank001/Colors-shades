import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  slug: string;
  title: string;
  description: string;
  icon: string;
  price_text: string;
}

export function ServiceCard({ slug, title, description, icon, price_text }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={`/services/${slug}`}
        className="block bg-card rounded-2xl p-8 shadow-soft hover:shadow-hover transition-shadow duration-300"
      >
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="font-heading text-xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">{description}</p>
        <span className="text-sm font-semibold text-brand-coral">{price_text}</span>
      </Link>
    </motion.div>
  );
}
