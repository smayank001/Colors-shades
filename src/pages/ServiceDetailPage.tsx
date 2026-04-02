import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, CreditCard, MessageSquare, QrCode, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getServices, getCourseModules } from '@/api';
import { EnquiryModal } from '@/components/shared/EnquiryModal';
import { PaymentModal } from '@/components/shared/PaymentModal';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<any>(null);
  const [courseModules, setCourseModules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const services = await getServices();
        const s = services?.find((x: any) => x.slug === slug);
        if (s) {
          setService(s);
          const c = await getCourseModules(s.id);
          setCourseModules(c || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F7F5] gap-4">
        <div className="w-12 h-12 border-4 border-[#FF6B6B]/20 border-t-[#FF6B6B] rounded-full animate-spin"></div>
        <p className="text-[#1E293B]/60 font-bold text-lg">Preparing course details...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Program Not Found</h1>
        <Button asChild className="rounded-full shadow-card bg-[#FF6B6B]"><Link to="/services">Back to Services</Link></Button>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F7F5] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white">
        <div className="blob w-[500px] h-[500px] bg-[#FF6B6B] -top-40 -right-40 opacity-5"></div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-sm font-bold text-[#FF6B6B] hover:translate-x-[-4px] transition-all mb-10 group"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Programs
          </Link>
          
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
            <div className="w-40 h-40 rounded-[40px] bg-white shadow-card p-2 border-4 border-[#F9F7F5] overflow-hidden shrink-0">
              {service.image_url ? (
                <img src={service.image_url} alt={service.name || service.title} className="w-full h-full object-cover rounded-[32px]" />
              ) : (
                <div className="w-full h-full bg-[#FF6B6B]/10 flex items-center justify-center text-6xl">🎨</div>
              )}
            </div>
            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1E293B] leading-tight mb-6">{service.name || service.title}</h1>
              <div className="inline-flex items-center gap-2 bg-[#FFD93D]/20 text-[#1E293B] px-6 py-2.5 rounded-full font-bold shadow-sm">
                <Star className="w-4 h-4 text-[#FFD93D] fill-[#FFD93D]" />
                {service.price || 'Enrollment Open'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 lg:px-8 py-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <div className="max-w-none mb-20">
              <h2 className="text-3xl font-extrabold text-[#1E293B] mb-8">About This Program</h2>
              <p className="text-xl text-[#1E293B]/60 leading-relaxed font-medium">{service.description}</p>
            </div>

            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-[#4D96FF] rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">📚</div>
              <h2 className="text-3xl font-extrabold text-[#1E293B]">Course Modules</h2>
            </div>

            {courseModules.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {courseModules.map((module: any, i: number) => (
                  <motion.div 
                    key={module.id} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-[30px] p-8 shadow-card border border-[#1E293B]/5 hover:shadow-hover transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <h3 className="text-2xl font-bold text-[#1E293B]">{module.title}</h3>
                      <div className="px-4 py-1.5 bg-[#4D96FF]/10 text-[#4D96FF] rounded-full text-xs font-bold uppercase tracking-wider">Module {i + 1}</div>
                    </div>
                    {module.description && <p className="text-[#1E293B]/60 mb-8 font-medium leading-relaxed">{module.description}</p>}
                    
                    {module.bullet_points && Array.isArray(module.bullet_points) && module.bullet_points.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {module.bullet_points.map((bp: string, i: number) => (
                          <div key={i} className="flex items-center gap-3 bg-[#F9F7F5] p-4 rounded-2xl border border-[#1E293B]/5">
                            <div className="w-2 h-2 bg-[#FF6B6B] rounded-full"></div>
                            <span className="text-sm font-bold text-[#1E293B]/80 leading-snug">{bp}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[30px] p-16 text-center border-2 border-dashed border-[#1E293B]/10">
                <p className="text-[#1E293B]/40 text-lg font-bold italic">The learning journey is being detailed. Check back shortly!</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-[#1E293B] rounded-[40px] p-10 shadow-2xl text-white overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#FF6B6B]/20 to-transparent rounded-bl-full group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>
              
              <h3 className="text-3xl font-extrabold mb-6 relative z-10">Start Your Journey!</h3>
              <p className="text-white/60 mb-10 font-bold relative z-10 leading-relaxed text-lg">Interested in this program? Enroll now or enquire for more details!</p>
              
              <div className="flex flex-col space-y-6 relative z-10">
                <Button 
                  size="xl" 
                  onClick={() => setEnquiryOpen(true)} 
                  className="w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 hover:scale-[1.02] transition-all duration-300 text-white border-0 shadow-xl rounded-2xl py-8 text-xl font-bold"
                >
                  <MessageSquare className="mr-3 h-6 w-6" />
                  Enquire Now
                </Button>
                
                <div className="flex items-center justify-center">
                  <div className="h-[1px] bg-white/10 flex-grow"></div>
                  <span className="px-4 text-white/30 font-bold text-xs uppercase tracking-widest leading-none mt-[-2px]">or</span>
                  <div className="h-[1px] bg-white/10 flex-grow"></div>
                </div>

                <Button 
                  variant="outline" 
                  size="xl" 
                  onClick={() => setPaymentOpen(true)} 
                  className="w-full bg-white/5 border-2 border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all rounded-2xl py-8 text-lg font-bold group shadow-inner"
                >
                  <QrCode className="mr-3 h-6 w-6 text-[#FFD93D]" />
                  Pay via QR Code
                </Button>
              </div>
              
              <div className="mt-12 flex items-center gap-4 text-white/40 text-sm font-bold relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg">🔒</div>
                <p>Safe and Secure <br/> Enrollment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} courseSlug={service.slug} courseTitle={service.name || service.title} />
      <PaymentModal open={paymentOpen} onClose={() => setPaymentOpen(false)} />
    </div>
  );
}
