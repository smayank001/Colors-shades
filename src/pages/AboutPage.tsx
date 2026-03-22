import { motion } from 'framer-motion';
import content from '@/i18n/en.json';
import aboutStudio from '@/assets/about-studio.jpg';
import { Clock, MapPin, Users } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#020617] py-24 lg:py-32 transition-colors border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EF4444]/10 via-transparent to-[#7e22ce]/10 pointer-events-none"></div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <h1 className="font-heading text-5xl sm:text-6xl font-bold mb-6 text-foreground">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] to-[#F97316]">Us</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl font-light leading-relaxed">{content.about.mission}</p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-4 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-sky to-brand-coral rounded-2xl blur-xl opacity-20 transform scale-95"></div>
            <img
              src={aboutStudio}
              alt="Our studio"
              className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/3] border border-white/10"
              loading="lazy"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-4xl font-bold mb-6 text-foreground">Our Story</h2>
            <p className="text-white/70 leading-relaxed mb-8 font-light text-lg">{content.about.description}</p>
            <div className="space-y-6">
              <div className="flex items-center gap-5 group">
                <div className="p-4 rounded-xl bg-brand-coral/10 border border-brand-coral/20 group-hover:bg-brand-coral/20 transition-colors shrink-0">
                  <Clock className="h-6 w-6 text-brand-coral drop-shadow-md" />
                </div>
                <div>
                  <p className="font-heading text-lg font-bold text-foreground mb-1 group-hover:text-brand-coral transition-colors">Timings</p>
                  <p className="text-sm text-white/70 font-light">{content.about.timings}</p>
                </div>
              </div>
              <div className="flex items-center gap-5 group">
                <div className="p-4 rounded-xl bg-brand-sky/10 border border-brand-sky/20 group-hover:bg-brand-sky/20 transition-colors shrink-0">
                  <MapPin className="h-6 w-6 text-brand-sky drop-shadow-md" />
                </div>
                <div>
                  <p className="font-heading text-lg font-bold text-foreground mb-1 group-hover:text-brand-sky transition-colors">Location</p>
                  <p className="text-sm text-white/70 font-light">{content.site.address}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Teachers */}
      <section className="bg-[#020617] relative border-t border-white/5 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.05)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <h2 className="font-heading text-4xl font-bold text-center mb-16 text-foreground">Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] to-[#F97316]">Teachers</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.about.teachers.map((teacher, i) => (
              <motion.div
                key={teacher.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className="bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center group"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-sky to-brand-coral mx-auto mb-6 flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] transform group-hover:scale-110 transition-transform duration-300 border-2 border-white/10">
                  <span className="text-4xl">👨‍🎨</span>
                </div>
                <h3 className="font-heading text-2xl font-bold mb-2 text-foreground group-hover:text-brand-sky transition-colors">{teacher.name}</h3>
                <p className="text-sm font-medium mb-4 bg-brand-sky/10 text-brand-sky mx-auto px-4 py-1.5 rounded-full w-max border border-brand-sky/20 drop-shadow-sm">{teacher.role}</p>
                <p className="text-sm text-white/70 font-light leading-relaxed">{teacher.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
