import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Star, Palette } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FloatingShape } from "@/components/shared/FloatingShape";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { EnquiryModal } from "@/components/shared/EnquiryModal";
import { getServices } from "@/api";
import content from "@/i18n/en.json";
import aboutStudio from "@/assets/about-studio.jpg";
import summerImage from "@/assets/color-shadessummer.jpeg";
import summerCampImage from "@/assets/color-shadessummercamp.jpeg";

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
  const [services, setServices] = useState<any[]>([]);
  const [activeSlide, setActiveSlide] = useState(0);

  const sliderImages = [summerImage, summerCampImage, aboutStudio];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    getServices()
      .then((data) => {
        if (data) setServices(data.slice(0, 3));
      })
      .catch(console.error);
  }, []);

  const testimonials = content.testimonials;

  const nextTest = () =>
    setTestimonialIdx((i) => (i + 1) % testimonials.length);
  const prevTest = () =>
    setTestimonialIdx(
      (i) => (i - 1 + testimonials.length) % testimonials.length,
    );

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center bg-[#020617] pt-20">
        {/* Background Image Slider */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            {/* <motion.div
              key={activeSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.4, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={sliderImages[activeSlide]}
                alt="Background Slide"
                className="w-full h-full object-cover"
              />
            </motion.div> */}
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.85, scale: 1 }} // 🔥 increased clarity
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img
                src={sliderImages[activeSlide]}
                alt="Background Slide"
                className="w-full h-full object-cover brightness-110 contrast-110"
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradients & Overlays */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-[#020617]/80 to-transparent z-10"></div> */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/70 via-[#020617]/40 to-transparent z-10"></div>
          {/* <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent z-10"></div> */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/60 via-transparent to-transparent z-10"></div>

          {/* Glowing orbs */}
          <div className="absolute top-1/4 right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#ef4444]/20 to-[#f97316]/10 blur-[120px] mix-blend-screen animate-pulse duration-[8000ms] pointer-events-none z-10"></div>
        </div>

        <FloatingShape color="rgba(249, 115, 22, 0.15)" size={150} top="15%" right="25%" delay={0} shape="circle" />
        <FloatingShape color="rgba(239, 68, 68, 0.15)" size={90} bottom="20%" right="15%" delay={1.5} shape="blob" />

        <div className="container relative mx-auto px-4 lg:px-10 py-20 z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-xl">
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-[#CBD5F5] rounded-full px-5 py-2 text-sm font-medium mb-8 backdrop-blur-md"
              >
                <Star className="h-4 w-4 text-[#F97316]" />
                Premium Art & Design Academy
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-[#F8FAFC] leading-[1.1] mb-8 drop-shadow-lg"
              >
                Unlock Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F8FAFC] to-[#CBD5F5]">Creative</span> Potential
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-[1.15rem] text-[#CBD5F5] leading-relaxed mb-12 font-light"
              >
                Experience a cinematic approach to art education. Master techniques from classical drawing to modern digital arts in a highly focused, premium environment.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Button
                  variant="default"
                  size="xl"
                  className="bg-gradient-to-r from-[#EF4444] to-[#B91C1C] text-white border-0 hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(239,68,68,0.5)] rounded-full px-8 py-7 text-lg font-bold group"
                  onClick={() => setEnquiryOpen(true)}
                >
                  <span className="relative z-10">Sign Up For A Trial Lesson</span>
                </Button>
                <Link
                  to="/services"
                  className="group flex items-center text-[#F8FAFC] text-lg font-medium tracking-wide hover:text-[#EF4444] transition-colors"
                >
                  <span className="relative">
                    View our courses
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#EF4444] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <ArrowRight className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Right visual focus */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative h-[500px] lg:h-[600px] hidden md:flex items-center justify-center"
            >
              {/* Central glowing container */}
              <div className="relative w-full h-full max-w-[500px] mx-auto flex items-center justify-center">

                {/* Floating Elements */}
                <motion.div
                  className="absolute top-10 right-10 z-30"
                  animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-24 h-24 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                    <span className="text-5xl drop-shadow-xl">🎨</span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute bottom-20 left-10 z-30"
                  animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <div className="w-28 h-28 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                    <span className="text-6xl drop-shadow-xl">🖌️</span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute top-1/2 right-0 z-30"
                  animate={{ y: [0, -15, 0], rotate: [0, 15, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                >
                  <div className="w-20 h-20 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(126,34,206,0.3)]">
                    <span className="text-4xl drop-shadow-xl">♟️</span>
                  </div>
                </motion.div>

                {/* Primary Artistic Image/Element - Subtle Glass Effect */}
                {/* <motion.div 
                  className="relative z-20 w-[300px] h-[400px] rounded-[2rem] overflow-hidden border border-white/20 glass-card shadow-[0_0_50px_rgba(249,115,22,0.1)] flex items-center justify-center"
                  animate={{ y: [-15, 15, -15] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="text-center p-8">
                    <div className="w-16 h-16 bg-brand-coral/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Palette className="h-8 w-8 text-brand-coral" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Artistic Studio</h3>
                    <p className="text-sm text-white/60">Where your journey begins</p>
                  </div>
                </motion.div> */}

                {/* Background active slide indicators */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                  {sliderImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSlide(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${i === activeSlide ? 'bg-brand-coral w-6' : 'bg-white/20'}`}
                    />
                  ))}
                </div>

              </div>
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
              className="bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-xl mb-6 ${i === 0 ? "bg-gradient-to-br from-brand-sky to-brand-coral" : "bg-gradient-to-br from-brand-yellow to-brand-coral"}`}
              >
                <span className="text-3xl text-white">{i === 0 ? "🎨" : "🖌️"}</span>
              </div>
              <h3 className="font-heading text-2xl font-bold mb-3">
                {prog.title}
              </h3>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                {prog.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {prog.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-xs bg-white/5 border border-white/10 text-white/80 px-4 py-2 rounded-full font-medium"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold mb-4">
            Our Courses & Services
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore our range of creative and academic programs designed for
            young minds.
          </p>
        </motion.div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((s) => (
            <motion.div key={s.id} variants={fadeUp}>
              <ServiceCard
                slug={s.slug || ""}
                title={s.name || s.title}
                description={s.description}
                image_url={s.image_url}
                price={s.price || ""}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* About Preview */}
      <section className="bg-[#0A0F1C] relative border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_100%)] pointer-events-none"></div>
        <div className="container mx-auto px-4 lg:px-8 py-24">
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
                alt="Our art studio"
                className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[4/3] border border-white/10"
                loading="lazy"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Where Creativity <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sky to-brand-coral">Comes to Life</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-10 text-lg font-light">
                {content.about.mission}
              </p>
              <Button variant="outline" size="xl" className="border-white/20 hover:bg-white/10 text-white transition-colors" asChild>
                <Link to="/about">
                  Learn more about us <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold mb-4">
            What Parents Say
          </h2>
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
                <Star
                  key={i}
                  className="h-5 w-5 fill-brand-yellow text-brand-yellow"
                />
              ))}
            </div>
            <p className="text-lg text-foreground mb-6 leading-relaxed">
              "{testimonials[testimonialIdx].text}"
            </p>
            <p className="font-heading font-bold">
              {testimonials[testimonialIdx].name}
            </p>
            <p className="text-sm text-muted-foreground">
              {testimonials[testimonialIdx].role}
            </p>
          </motion.div>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={prevTest}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIdx(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === testimonialIdx ? "bg-brand-coral" : "bg-muted"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTest}
              className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 lg:px-8 pb-20">
        <div className="gradient-warm rounded-2xl p-10 sm:p-16 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-primary-foreground mb-4">
            Ready to Start Your Child's Creative Journey?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Book a free trial lesson and let your child explore the world of
            colors and creativity.
          </p>
          <Button
            variant="default"
            size="xl"
            className="bg-card text-foreground hover:bg-card/90"
            onClick={() => setEnquiryOpen(true)}
          >
            Book a Free Trial
          </Button>
        </div>
      </section>

      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </>
  );
}
