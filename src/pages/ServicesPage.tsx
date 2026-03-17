import { motion } from 'framer-motion';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { getServices } from '@/mock-api/db';

export default function ServicesPage() {
  const services = getServices();

  return (
    <>
      <section className="bg-bg-cream py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold mb-4">Our Courses & Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">Discover our range of creative and academic programs designed for children of all ages.</p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <ServiceCard slug={s.slug} title={s.title} description={s.description} icon={s.icon} price_text={s.price_text} />
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
