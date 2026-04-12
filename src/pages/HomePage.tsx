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
import hero1 from "@/assets/user_assets/students_thumbsup.jpg";
import hero2 from "@/assets/user_assets/event_group.jpg";
import hero3 from "@/assets/user_assets/students_working.jpg";
import gall1 from "@/assets/user_assets/studio_1.jpg";
import gall2 from "@/assets/user_assets/student_sunset.jpg";
import gall3 from "@/assets/user_assets/studio_collage.jpg";
import gall4 from "@/assets/user_assets/student_landscape.jpg";
import gall5 from "@/assets/user_assets/students_awards.jpg";
import gall6 from "@/assets/user_assets/students_table.jpg";

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
  const [heroIdx, setHeroIdx] = useState(0);

  const heroImages = [hero1, hero2, hero3];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

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
    <div className="relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-20 lg:pb-0 overflow-hidden bg-[#F9F7F5]">
        {/* Decorative Blobs */}
        <div className="blob w-[500px] h-[500px] bg-[#FF6B6B] -top-20 -left-20 opacity-10"></div>
        <div className="blob w-[400px] h-[400px] bg-[#FFD93D] bottom-0 -right-20 opacity-10"></div>
        <div className="blob w-[300px] h-[300px] bg-[#4D96FF] top-1/4 left-1/3 opacity-5"></div>

        {/* Floating Shapes */}
        <FloatingShape color="#FF6B6B" size={100} top="15%" right="10%" delay={0} shape="circle" />
        <FloatingShape color="#FFD93D" size={80} bottom="20%" left="5%" delay={1} shape="blob" />
        <FloatingShape color="#4D96FF" size={60} top="25%" left="15%" delay={2} shape="circle" />
        
        <div className="container relative mx-auto px-4 lg:px-10 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div variants={stagger} initial="hidden" animate="visible">
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 bg-[#FF6B6B]/10 text-[#FF6B6B] rounded-full px-5 py-2 text-sm font-bold mb-6"
              >
                <Palette className="h-4 w-4" />
                Art & Learning Institute
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold text-[#1E293B] leading-[0.95] mb-10 tracking-tighter"
              >
                Sparking <span className="text-[#FF6B6B]">Creativity</span> in Every Child
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-2xl text-[#1E293B]/70 leading-relaxed mb-12 max-w-xl font-medium"
              >
                Colors N Shades is a creative hub where young minds explore art, master chess, and excel in academics through playful and professional learning.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-6">
                <Button
                  size="xl"
                  className="bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] text-white border-0 hover:scale-105 transition-all duration-300 shadow-2xl rounded-full px-12 py-9 text-xl font-bold"
                  onClick={() => setEnquiryOpen(true)}
                >
                  Enroll Now
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  className="border-[#1E293B]/10 text-[#1E293B] hover:bg-[#1E293B]/5 rounded-full px-12 py-9 text-xl font-bold shadow-sm"
                  asChild
                >
                  <Link to="/services">View Courses</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Slider */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block h-[700px]"
            >
              <div className="absolute inset-0 bg-[#FFD93D]/10 rounded-[60px] blur-3xl transform rotate-6 scale-90"></div>
              <div className="relative w-full h-full rounded-[60px] overflow-hidden border-[12px] border-white shadow-2xl z-10">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={heroIdx}
                    src={heroImages[heroIdx]}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                {/* Overlay Text */}
                <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-md p-8 rounded-[40px] border border-white/20 shadow-xl">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-1 bg-[#FF6B6B] rounded-full"></div>
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-[#FF6B6B]">Featured Work</span>
                  </div>
                  <h3 className="text-3xl font-black text-[#1E293B]">Nurturing Young Talent</h3>
                </div>

                {/* Slider Controls */}
                <div className="absolute top-1/2 -translate-y-1/2 left-6 right-6 flex justify-between z-20">
                  <button 
                    onClick={() => setHeroIdx((i) => (i - 1 + heroImages.length) % heroImages.length)}
                    className="w-14 h-14 bg-white/20 hover:bg-white text-white hover:text-[#1E293B] backdrop-blur-md rounded-full flex items-center justify-center transition-all border border-white/30"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </button>
                  <button 
                    onClick={() => setHeroIdx((i) => (i + 1) % heroImages.length)}
                    className="w-14 h-14 bg-white/20 hover:bg-white text-white hover:text-[#1E293B] backdrop-blur-md rounded-full flex items-center justify-center transition-all border border-white/30"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </button>
                </div>

                <div className="absolute top-8 right-8 flex gap-2 z-20">
                  {heroImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setHeroIdx(i)}
                      className={`h-2.5 rounded-full transition-all duration-500 ${i === heroIdx ? "bg-white w-8 shadow-md" : "bg-white/40 w-2.5"}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Floating accents */}
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#4D96FF] rounded-full flex items-center justify-center text-5xl shadow-2xl border-8 border-white z-20 animate-float">🎨</div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#6BCB77] rounded-full flex items-center justify-center text-4xl shadow-2xl border-4 border-white z-20 animate-pulse">🌟</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Explore Our <span className="text-[#4D96FF]">Creative Universe</span></h2>
              <p className="text-lg md:text-xl text-[#1E293B]/60">From brushstrokes to chess moves, we provide a holistic environment for children to grow and learn.</p>
            </div>
            <Button variant="outline" className="rounded-full border-[#1E293B]/10 font-bold" asChild>
              <Link to="/services">View All Services <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
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
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 bg-[#F9F7F5] overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#6BCB77]/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-[#FF6B6B]/10 rounded-full blur-3xl"></div>
              <div className="relative rounded-[30px] md:rounded-[50px] overflow-hidden shadow-2xl border-8 border-white transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <img src={aboutStudio} alt="Art Studio" className="w-full aspect-[4/3] object-cover" />
              </div>
              {/* Floating badges */}
              <div className="absolute top-6 -right-4 md:top-10 md:-right-8 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-xl flex items-center gap-3 md:gap-4 border border-[#1E293B]/5 animate-float">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FFD93D] rounded-full flex items-center justify-center text-xl md:text-2xl">🏆</div>
                <div>
                  <div className="font-bold text-[#1E293B]">10+ Years</div>
                  <div className="text-sm text-[#1E293B]/60 text-nowrap">Experience</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-[#6BCB77]/10 text-[#6BCB77] px-4 py-2 rounded-full font-bold mb-6">Our Journey</div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">Where colors meet <span className="text-[#FF6B6B]">imagination</span></h2>
              <p className="text-lg text-[#1E293B]/60 leading-relaxed mb-10">
                {content.about.mission}
              </p>
              <ul className="space-y-4 mb-12">
                {[
                  "Experienced Mentors",
                  "Playful Learning Environment",
                  "Personalized Attention",
                  "Creative Skill Building"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-[#1E293B] font-semibold">
                    <div className="w-6 h-6 bg-[#6BCB77] rounded-full flex items-center justify-center text-white text-xs">✓</div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button size="lg" className="rounded-full bg-[#1E293B] text-white hover:bg-[#1E293B]/90 font-bold px-10" asChild>
                <Link to="/about">About Our Studio</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-32 bg-[#F9F7F5]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <div className="inline-block bg-[#FF6B6B]/10 text-[#FF6B6B] px-5 py-2 rounded-full font-black text-sm uppercase tracking-widest mb-6 border border-[#FF6B6B]/10">Our Creative Moments</div>
            <h2 className="text-4xl md:text-6xl font-black text-[#1E293B] mb-8">Capturing the <span className="text-[#4D96FF]">Magic</span></h2>
            <p className="text-xl text-[#1E293B]/60 font-medium">Take a peek into our studio where creativity knows no bounds and every child is a masterpiece.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[gall1, gall2, gall3, gall4, gall5, gall6].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
                className={`relative group rounded-[40px] overflow-hidden shadow-card border-8 border-white aspect-square ${i % 2 === 0 ? "lg:mt-12" : ""}`}
              >
                <img src={img} alt={`Gallery ${i+1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="text-white text-xl font-bold">Colors N Shades Moments</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="inline-block bg-[#4D96FF]/10 text-[#4D96FF] px-4 py-2 rounded-full font-bold mb-6">Happy Parents</div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-16">What Parents & Students Say</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative px-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIdx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="bg-[#F9F7F5] rounded-[30px] md:rounded-[40px] p-8 md:p-16 shadow-soft border border-[#1E293B]/5 text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D]"></div>
                  <div className="text-6xl text-[#FF6B6B]/20 mb-8 italic">"</div>
                  <p className="text-2xl md:text-3xl text-[#1E293B] font-medium leading-normal mb-10 italic">
                    {testimonials[testimonialIdx].text}
                  </p>
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#4D96FF] to-[#6BCB77] rounded-full mb-4 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center text-4xl">
                      👤
                    </div>
                    <h4 className="text-xl font-bold text-[#1E293B]">{testimonials[testimonialIdx].name}</h4>
                    <p className="text-[#1E293B]/50 font-bold text-sm uppercase tracking-wider">{testimonials[testimonialIdx].role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <button 
                onClick={prevTest}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg border border-[#1E293B]/5 flex items-center justify-center text-[#1E293B] hover:bg-[#FF6B6B] hover:text-white transition-all z-20 group"
              >
                <ChevronLeft className="w-8 h-8 group-active:scale-90" />
              </button>
              <button 
                onClick={nextTest}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg border border-[#1E293B]/5 flex items-center justify-center text-[#1E293B] hover:bg-[#FF6B6B] hover:text-white transition-all z-20 group"
              >
                <ChevronRight className="w-8 h-8 group-active:scale-90" />
              </button>
            </div>

            <div className="flex justify-center gap-3 mt-12">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIdx(i)}
                  className={`h-3 rounded-full transition-all duration-300 ${i === testimonialIdx ? "bg-[#FF6B6B] w-8" : "bg-[#1E293B]/10 w-3"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative rounded-[60px] overflow-hidden bg-[#1E293B] p-12 md:p-24 text-center">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-[#FF6B6B]">
                <path d="M44.7,-76.4C58.8,-69.2,71.8,-58.8,79.6,-45.2C87.4,-31.6,90,-14.8,88.2,1.0C86.4,16.9,80.1,31.7,71.5,44.8C62.9,57.9,52,69.3,38.8,76.5C25.6,83.7,10,86.8,-4.8,83.9C-19.6,81,-39.2,72.2,-53.4,60.1C-67.6,48,-76.4,32.6,-80.8,15.9C-85.2,-0.8,-85.2,-18.8,-78.7,-33.7C-72.2,-48.6,-59.2,-60.4,-44.6,-67.3C-30,-74.2,-13.7,-76.2,1.3,-78.4C16.4,-80.6,30.6,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
              </svg>
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-tight">
                Empower Your Child with <br /> <span className="text-[#FFD93D]">Confidence</span> & <span className="text-[#FF6B6B]">Creativity</span>
              </h2>
              <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                Join our community of young artists and learners today. Book a free trial lesson and see the magic happen!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button 
                  size="xl" 
                  className="bg-[#FF6B6B] text-white hover:bg-[#FF6B6B]/90 rounded-full px-12 py-8 text-xl font-bold shadow-2xl transition-all hover:scale-105"
                  onClick={() => setEnquiryOpen(true)}
                >
                  Book a Free Trial
                </Button>
                <div className="flex items-center gap-4 text-white/80">
                  <div className="flex -space-x-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-2 border-[#1E293B] bg-[#4D96FF] flex items-center justify-center text-xl shadow-lg">👤</div>
                    ))}
                  </div>
                  <span className="font-bold">500+ Happy Students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </div>
  );
}
