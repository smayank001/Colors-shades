import { motion } from 'framer-motion';
import content from '@/i18n/en.json';
import aboutStudio from '@/assets/user_assets/students_group.jpg';
import { Button } from '@/components/ui/button';
import gall2 from '@/assets/user_assets/studio_collage.jpg';
import { Clock, MapPin, Users } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AboutPage() {
  return (
    <div className="bg-[#F9F7F5] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-48 lg:pb-32 bg-white">
        <div className="blob w-[600px] h-[600px] bg-[#4D96FF] -top-60 -left-60 opacity-10"></div>
        <div className="blob w-[400px] h-[400px] bg-[#FF6B6B] bottom-0 -right-20 opacity-10"></div>
        
        <div className="container relative mx-auto px-4 lg:px-8 text-center max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }} 
          >
            <span className="text-[#FF6B6B] font-black uppercase tracking-[0.3em] text-sm mb-6 block">About Us</span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#1E293B] leading-[1.1] mb-10 tracking-tight">
              Nurturing <span className="text-[#FF6B6B]">Creativity</span>. Strengthening <span className="text-[#4D96FF]">Academics</span>.
            </h1>
            <p className="text-xl md:text-2xl text-[#1E293B]/60 leading-relaxed font-medium">
              Founded in 2015, Colors N Shades Institute of Drawing and Painting is one of the most trusted learning spaces in East Hyderabad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-white">
            <div className="space-y-2">
              <div className="text-6xl font-black">10+</div>
              <div className="text-sm font-bold uppercase tracking-widest opacity-80">Years of Excellence</div>
            </div>
            <div className="space-y-2">
              <div className="text-6xl font-black">10,000+</div>
              <div className="text-sm font-bold uppercase tracking-widest opacity-80">Students Trained</div>
            </div>
            <div className="space-y-2">
              <div className="text-6xl font-black">5★</div>
              <div className="text-sm font-bold uppercase tracking-widest opacity-80">Google Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-[30px] md:rounded-[60px] overflow-hidden border-8 md:border-[16px] border-[#F9F7F5] shadow-2xl aspect-square">
                <img src={aboutStudio} alt="Art Studio" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-[#FFD93D] p-10 rounded-[40px] shadow-2xl border-8 border-white hidden md:block">
                <div className="text-4xl text-[#1E293B] font-black">2015</div>
                <div className="text-sm font-extrabold uppercase tracking-widest text-[#1E293B]/60">Established</div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-black text-[#1E293B] mb-8 leading-tight">Our <span className="text-[#4D96FF]">Philosophy</span></h2>
              <p className="text-lg text-[#1E293B]/70 leading-relaxed mb-10 font-medium">
                At Colors N Shades, we strongly believe that every child is creative by nature and every learner has unique potential. Our role is to identify, nurture, and refine that potential through patient guidance, structured teaching, and constant encouragement.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-[#FF6B6B]">What We Offer</h3>
                  <ul className="space-y-3">
                    {["Offline & Online Classes", "Level-based Learning", "Small Batches", "Safe Atmosphere"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-bold text-[#1E293B]/60">
                        <div className="w-5 h-5 bg-[#FF6B6B]/20 rounded-full flex items-center justify-center text-[#FF6B6B] text-[10px]">✓</div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-black text-[#4D96FF]">Why Choose Us</h3>
                  <ul className="space-y-3">
                    {["Experienced Faculty", "Proven Curriculum", "Personal Attention", "Inspiring Space"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-bold text-[#1E293B]/60">
                        <div className="w-5 h-5 bg-[#4D96FF]/20 rounded-full flex items-center justify-center text-[#4D96FF] text-[10px]">✓</div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-32 bg-[#F9F7F5]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-white rounded-[40px] md:rounded-[80px] p-8 md:p-24 shadow-soft border border-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD93D]/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center relative z-10">
              <div className="lg:col-span-7">
                <span className="text-[#FF6B6B] font-black uppercase tracking-[0.2em] text-sm mb-6 block">Meet Our Founder</span>
                <h2 className="text-4xl md:text-6xl font-black text-[#1E293B] mb-4">S S Swetha</h2>
                <p className="text-xl font-bold text-[#FF6B6B] mb-8 uppercase tracking-widest">Founder & Owner & Director | B.Tech, BFA</p>
                
                <div className="space-y-6 text-lg text-[#1E293B]/70 font-medium leading-relaxed">
                  <p>
                    S S Swetha is the visionary behind Colors N Shades. She holds a Bachelor of Technology (Computer Science) and a Bachelor of Fine Arts (Painting) from Jawaharlal Nehru Fine Arts University (JNFAU), Hyderabad.
                  </p>
                  <p>
                    With over a decade of experience in both art and education, she has developed a unique curriculum that balances technical skill with creative freedom.
                  </p>
                </div>

                <div className="mt-12 p-10 bg-[#F9F7F5] rounded-[40px] border-l-8 border-[#FFD93D]">
                  <p className="text-2xl font-bold italic text-[#1E293B]/80 leading-relaxed">
                    "When learning is joyful and structured, confidence naturally follows."
                  </p>
                  <p className="mt-4 font-black uppercase tracking-widest text-[#FFD93D]">— S S Swetha</p>
                </div>
              </div>

              <div className="lg:col-span-5 mt-12 lg:mt-0">
                <div className="relative group">
                  <div className="absolute inset-0 bg-[#FFD93D] rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <div className="relative rounded-full overflow-hidden border-[16px] border-white shadow-2xl aspect-square">
                    <img 
                      src={gall2} 
                      alt="S S Swetha" 
                      className="w-full h-full object-cover grayscale-0 hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                  {/* Badge */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-10 py-5 rounded-full shadow-2xl border border-white/20">
                    <div className="text-[#1E293B] font-black whitespace-nowrap">Lead Mentor</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-[#1E293B] mb-12">Admissions Open</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button size="xl" className="bg-[#FF6B6B] text-white rounded-full px-12 py-8 font-black text-xl hover:scale-105 transition-all">
              Enroll Now
            </Button>
            <Button variant="outline" size="xl" className="border-[#1E293B]/10 rounded-full px-12 py-8 font-black text-xl hover:bg-[#1E293B]/5">
              Call +91 81433 65243
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

