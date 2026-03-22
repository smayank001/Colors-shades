import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, CreditCard, MessageSquare, QrCode } from 'lucide-react';
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
    return <div className="p-20 text-center">Loading...</div>;
  }

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold mb-4">Service Not Found</h1>
        <Button variant="hero" asChild><Link to="/services">Back to Services</Link></Button>
      </div>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden bg-[#020617] py-24 lg:py-32 transition-colors border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EF4444]/10 via-transparent to-[#F97316]/5 pointer-events-none"></div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-[#F8FAFC]/70 hover:text-[#EF4444] transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-white/10 shadow-lg shrink-0 overflow-hidden w-32 h-32 flex items-center justify-center">
              {service.image_url ? (
                <img src={service.image_url} alt={service.name || service.title} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <span className="text-6xl drop-shadow-md">🎨</span>
              )}
            </div>
            <div className="max-w-3xl">
              <h1 className="font-heading text-5xl sm:text-6xl font-bold mb-4 text-foreground">{service.name || service.title}</h1>
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm mt-4">
              <span className="text-brand-yellow font-semibold">{service.price || 'Contact for price'}</span>
            </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-white/70 font-light leading-relaxed mb-12">{service.description}</p>
            </div>

            <h2 className="font-heading text-3xl font-bold mb-8 text-foreground flex items-center gap-3">
              <span className="w-8 h-1 bg-gradient-to-r from-brand-sky to-brand-coral rounded-full"></span>
              Course Modules
            </h2>
            {courseModules.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courseModules.map((module: any) => (
                  <div key={module.id} className="bg-[#1E293B] border border-white/5 rounded-2xl p-8 shadow-lg hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] transition-all duration-300 transform hover:-translate-y-1">
                    <h3 className="font-heading text-2xl font-bold mb-3 text-foreground">{module.title}</h3>
                    {module.description && <p className="text-white/60 mb-4 font-light leading-relaxed">{module.description}</p>}
                    
                    {module.bullet_points && Array.isArray(module.bullet_points) && module.bullet_points.length > 0 && (
                      <ul className="space-y-2 mt-4 text-white/80">
                        {module.bullet_points.map((bp: string, i: number) => (
                          <li key={i} className="flex items-start">
                            <span className="text-brand-coral mr-2 mt-1 shrink-0">•</span>
                            <span className="leading-relaxed">{bp}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#1E293B] border border-white/5 rounded-2xl p-12 text-center shadow-inner">
                <p className="text-white/50">Course modules are being updated. Check back soon!</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#1E293B] border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#EF4444]/20 to-transparent rounded-bl-full pointer-events-none"></div>
              
              <h3 className="font-heading text-2xl font-bold mb-6 text-foreground relative z-10">Interested in this program?</h3>
              <p className="text-white/70 mb-8 font-light relative z-10 leading-relaxed">Let us know you're interested and we'll get back to you with available slots and more details.</p>
              
              <div className="flex flex-col space-y-4 relative z-10">
                <Button size="xl" onClick={() => setEnquiryOpen(true)} className="w-full bg-gradient-to-r from-[#EF4444] to-[#B91C1C] hover:scale-105 transition-all duration-300 text-white border-0 shadow-[0_0_20px_rgba(239,68,68,0.5)] rounded-full text-lg font-bold">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Enquire Now
                </Button>
                
                <div className="flex items-center justify-center py-2">
                  <div className="h-px bg-white/10 w-full"></div>
                  <span className="shrink-0 px-4 text-white/40 text-sm">or</span>
                  <div className="h-px bg-white/10 w-full"></div>
                </div>

                <Button variant="outline" size="xl" onClick={() => setPaymentOpen(true)} className="w-full bg-transparent border border-white/20 text-[#F8FAFC] hover:bg-white/5 hover:text-white transition-colors rounded-full text-lg font-medium group">
                  <QrCode className="mr-2 h-5 w-5 text-white/70 group-hover:text-white transition-colors" />
                  Pay via QR Code
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} courseSlug={service.slug} courseTitle={service.name || service.title} />
      <PaymentModal open={paymentOpen} onClose={() => setPaymentOpen(false)} />
    </>
  );
}
