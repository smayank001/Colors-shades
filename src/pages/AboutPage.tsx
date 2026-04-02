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
    <div className="bg-[#F9F7F5] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white">
        <div className="blob w-[500px] h-[500px] bg-[#4D96FF] -top-40 -left-40 opacity-5"></div>
        <div className="blob w-[300px] h-[300px] bg-[#FF6B6B] bottom-0 -right-20 opacity-5"></div>
        
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            className="max-w-4xl"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#1E293B] leading-none mb-8">
              Every Child is <span className="text-[#FF6B6B]">an Artist</span>
            </h1>
            <p className="text-xl text-[#1E293B]/60 leading-relaxed max-w-2xl font-medium">
              {content.about.mission}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 lg:px-8 py-24 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#FFD93D] rounded-[40px] blur-3xl opacity-10 transform scale-95 translate-y-10 translate-x-10"></div>
            <div className="relative rounded-[50px] overflow-hidden border-8 border-white shadow-card aspect-[4/3]">
              <img
                src={aboutStudio}
                alt="Our creative studio"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000"
                loading="lazy"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1E293B] mb-8 leading-tight">Our <span className="text-[#4D96FF]">Creative</span> Journey</h2>
            <p className="text-[#1E293B]/60 leading-relaxed mb-10 font-medium text-lg italic border-l-4 border-[#FF6B6B] pl-6 uppercase tracking-wide">
              Where colors meet imagination
            </p>
            <p className="text-[#1E293B]/70 leading-relaxed mb-12 font-medium text-lg">
              {content.about.description}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-[30px] shadow-sm border border-[#1E293B]/5 hover:shadow-card transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-[#FF6B6B]/10 flex items-center justify-center mb-6 group-hover:bg-[#FF6B6B] transition-colors">
                  <Clock className="h-7 w-7 text-[#FF6B6B] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-extrabold text-[#1E293B] mb-2">Our Timings</h3>
                <p className="text-[#1E293B]/50 font-medium text-sm leading-relaxed">{content.about.timings}</p>
              </div>
              
              <div className="bg-white p-8 rounded-[30px] shadow-sm border border-[#1E293B]/5 hover:shadow-card transition-all duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-[#4D96FF]/10 flex items-center justify-center mb-6 group-hover:bg-[#4D96FF] transition-colors">
                  <MapPin className="h-7 w-7 text-[#4D96FF] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-extrabold text-[#1E293B] mb-2">Our Location</h3>
                <p className="text-[#1E293B]/50 font-medium text-sm leading-relaxed">{content.site.address}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="bg-white relative py-24 pb-40 overflow-hidden">
        <div className="blob w-[600px] h-[600px] bg-[#6BCB77] -bottom-40 -left-40 opacity-5"></div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1E293B] mb-6">Our <span className="text-[#6BCB77]">Mentors</span></h2>
            <p className="text-[#1E293B]/60 font-bold text-lg uppercase tracking-widest leading-none">Meet the creative minds behind our students' success</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {content.about.teachers.map((teacher, i) => (
              <motion.div
                key={teacher.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-[#F9F7F5] rounded-[40px] p-10 text-center shadow-sm hover:shadow-hover border border-[#1E293B]/5 transition-all duration-500 group"
              >
                <div className="w-32 h-32 rounded-[50px] bg-white border-4 border-[#F9F7F5] mx-auto mb-8 flex items-center justify-center shadow-card group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-[#6BCB77]/20 to-[#4D96FF]/20 flex items-center justify-center text-5xl">🎨</div>
                </div>
                <h3 className="text-2xl font-extrabold mb-3 text-[#1E293B] group-hover:text-[#6BCB77] transition-colors">{teacher.name}</h3>
                <div className="px-6 py-2 bg-white rounded-full inline-block mb-6 shadow-sm border border-[#1E293B]/5">
                  <p className="text-sm font-extrabold text-[#6BCB77] uppercase tracking-wider">{teacher.role}</p>
                </div>
                <p className="text-base text-[#1E293B]/60 font-medium leading-relaxed">{teacher.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
