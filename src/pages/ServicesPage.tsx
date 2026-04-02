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
    <div className="bg-[#F9F7F5] min-h-screen">
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white">
        <div className="blob w-[400px] h-[400px] bg-[#FFD93D] -top-20 -right-20 opacity-10"></div>
        <div className="blob w-[300px] h-[300px] bg-[#4D96FF] bottom-0 -left-20 opacity-10"></div>
        
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#1E293B] leading-none mb-8">
              Our <span className="text-[#FF6B6B]">Creative</span> Programs
            </h1>
            <p className="text-xl text-[#1E293B]/60 leading-relaxed max-w-2xl font-medium">
              Discover a diverse range of artistic and educational courses designed to nurture creativity, critical thinking, and academic excellence in every student.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-20 pb-32">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-20 gap-4">
            <div className="w-12 h-12 border-4 border-[#FF6B6B]/20 border-t-[#FF6B6B] rounded-full animate-spin"></div>
            <p className="text-[#1E293B]/60 font-bold">Loading creative programs...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
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
    </div>
  );
}
