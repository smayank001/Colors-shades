import { motion } from "framer-motion";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { useState, useEffect } from "react";
import { getServices } from "@/api";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then((data) => setServices(data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-[#020617] py-24 lg:py-32 transition-colors border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EF4444]/10 via-transparent to-[#F97316]/5 pointer-events-none"></div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <h1 className="font-heading text-5xl sm:text-6xl font-bold mb-6 text-foreground">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] to-[#F97316]">Services</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl font-light leading-relaxed">
            Discover our range of creative and academic programs designed for
            children of all ages.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-16">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground w-full">
            Loading services...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <ServiceCard
                  slug={s.slug || ""}
                  title={s.name || s.title}
                  description={s.description}
                  image_url={s.image_url}
                  price={s.price || ""}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
