import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FloatingShape } from '@/components/shared/FloatingShape';
import { ServiceCard } from '@/components/shared/ServiceCard';
import { EnquiryModal } from '@/components/shared/EnquiryModal';
import { getServices } from '@/mock-api/db';
import content from '@/i18n/en.json';
import heroChild1 from '@/assets/hero-child-1.jpg';
import heroChild2 from '@/assets/hero-child-2.jpg';
import heroChild3 from '@/assets/hero-child-3.jpg';
import aboutStudio from '@/assets/about-studio.jpg';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HomePage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const services = getServices();
  const testimonials = content.testimonials;

  const nextTest = () => setTestimonialIdx((i) => (i + 1) % testimonials.length);
  const prevTest = () => setTestimonialIdx((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-bg-cream">
        <FloatingShape color="#FFD93D" size={120} top="10%" left="5%" delay={0} shape="circle" />
        <FloatingShape color="#4D96FF" size={80} top="60%" left="2%" delay={1} shape="blob" />
        <FloatingShape color="#FF6B6B" size={60} bottom="10%" right="40%" delay={2} shape="circle" />

        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div variants={stagger} initial="hidden" animate="visible">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-brand-yellow/20 text-foreground rounded-full px-4 py-2 text-sm font-medium mb-6">
                <Star className="h-4 w-4 text-brand-yellow" />
                Bangalore's favorite art school
              </motion.div>

              <motion.h1 variants={fadeUp} className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6" style={{ letterSpacing: '-0.04em' }}>
                {content.hero.title}
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
                {content.hero.description}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Button variant="coral" size="xl" onClick={() => setEnquiryOpen(true)}>
                  {content.site.cta_primary}
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link to="/services">
                    {content.site.cta_secondary}
                    <ArrowRight className="h-5 w-5 ml-1" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right collage */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative h-[400px] sm:h-[500px] lg:h-[550px]"
            >
              <FloatingShape color="#6BCB77" size={100} top="5%" right="5%" delay={0.5} shape="blob" />
              <FloatingShape color="#FFD93D" size={70} bottom="15%" left="10%" delay={1.5} shape="circle" />

              <motion.div
                className="absolute top-0 left-0 w-[55%] z-10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img src={heroChild1} alt="Child painting with watercolors" className="rounded-[20px] shadow-hover w-full object-cover aspect-[4/5]" loading="lazy" />
              </motion.div>

              <motion.div
                className="absolute bottom-0 right-0 w-[55%] z-20"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <img src={heroChild2} alt="Children's artwork on display" className="rounded-[20px] shadow-hover w-full object-cover aspect-square" loading="lazy" />
              </motion.div>

              <motion.div
                className="absolute top-[20%] right-[5%] w-[40%] z-30"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              >
                <img src={heroChild3} alt="Group of children in art class" className="rounded-[20px] shadow-hover w-full object-cover aspect-[4/3]" loading="lazy" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Preview Cards */}
      <section className="container mx-auto px-4 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[content.programs.young, content.programs.older].map((prog, i) => (
            <motion.div
              key={prog.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-2xl p-8 shadow-soft"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 ${i === 0 ? 'gradient-primary' : 'gradient-creative'}`}>
                <span className="text-2xl">{i === 0 ? '🎨' : '🖌️'}</span>
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">{prog.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{prog.description}</p>
              <div className="flex flex-wrap gap-2">
                {prog.highlights.map((h) => (
                  <span key={h} className="text-xs bg-muted px-3 py-1.5 rounded-full font-medium">{h}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold mb-4">Our Courses & Services</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Explore our range of creative and academic programs designed for young minds.</p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <motion.div key={s.id} variants={fadeUp}>
              <ServiceCard slug={s.slug} title={s.title} description={s.description} icon={s.icon} price_text={s.price_text} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* About Preview */}
      <section className="bg-bg-cream">
        <div className="container mx-auto px-4 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src={aboutStudio} alt="Our art studio" className="rounded-2xl shadow-soft w-full object-cover aspect-[4/3]" loading="lazy" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold mb-4">Where Creativity Comes to Life</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{content.about.mission}</p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/about">Learn more about us <ArrowRight className="h-4 w-4 ml-1" /></Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold mb-4">What Parents Say</h2>
        </div>
        <div className="max-w-2xl mx-auto relative">
          <motion.div
            key={testimonialIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-card rounded-2xl p-8 shadow-soft text-center"
          >
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-brand-yellow text-brand-yellow" />
              ))}
            </div>
            <p className="text-lg text-foreground mb-6 italic leading-relaxed">"{testimonials[testimonialIdx].text}"</p>
            <p className="font-heading font-bold">{testimonials[testimonialIdx].name}</p>
            <p className="text-sm text-muted-foreground">{testimonials[testimonialIdx].role}</p>
          </motion.div>
          <div className="flex justify-center gap-4 mt-6">
            <button onClick={prevTest} className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors" aria-label="Previous testimonial">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIdx(i)} className={`w-2 h-2 rounded-full transition-colors ${i === testimonialIdx ? 'bg-brand-coral' : 'bg-muted'}`} aria-label={`Go to testimonial ${i + 1}`} />
              ))}
            </div>
            <button onClick={nextTest} className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors" aria-label="Next testimonial">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 lg:px-8 pb-20">
        <div className="gradient-warm rounded-2xl p-10 sm:p-16 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-primary-foreground mb-4">Ready to Start Your Child's Creative Journey?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">Book a free trial lesson and let your child explore the world of colors and creativity.</p>
          <Button variant="default" size="xl" className="bg-card text-foreground hover:bg-card/90" onClick={() => setEnquiryOpen(true)}>
            Book a Free Trial
          </Button>
        </div>
      </section>

      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </>
  );
}
