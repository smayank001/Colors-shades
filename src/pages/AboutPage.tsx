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
      <section className="bg-bg-cream py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-3xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-extrabold mb-6">About Us</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{content.about.mission}</p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.img
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            src={aboutStudio}
            alt="Our studio"
            className="rounded-2xl shadow-soft w-full object-cover aspect-[4/3]"
            loading="lazy"
          />
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="font-heading text-3xl font-extrabold mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{content.about.description}</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-brand-coral/10"><Clock className="h-5 w-5 text-brand-coral" /></div>
                <div>
                  <p className="font-semibold text-sm">Timings</p>
                  <p className="text-sm text-muted-foreground">{content.about.timings}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-brand-sky/10"><MapPin className="h-5 w-5 text-brand-sky" /></div>
                <div>
                  <p className="font-semibold text-sm">Location</p>
                  <p className="text-sm text-muted-foreground">{content.site.address}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Teachers */}
      <section className="bg-bg-cream py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-heading text-3xl font-extrabold text-center mb-12">Our Teachers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.about.teachers.map((teacher, i) => (
              <motion.div
                key={teacher.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-soft text-center"
              >
                <div className="w-20 h-20 rounded-full gradient-primary mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-lg font-bold">{teacher.name}</h3>
                <p className="text-sm text-brand-coral font-medium mb-3">{teacher.role}</p>
                <p className="text-sm text-muted-foreground">{teacher.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
