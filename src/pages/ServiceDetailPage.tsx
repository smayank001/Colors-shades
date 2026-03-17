import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getServiceBySlug } from '@/mock-api/db';
import { EnquiryModal } from '@/components/shared/EnquiryModal';
import { PaymentModal } from '@/components/shared/PaymentModal';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = getServiceBySlug(slug || '');
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);

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
      <section className="bg-bg-cream py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Services
          </Link>
          <div className="flex items-start gap-4">
            <div className="text-5xl">{service.icon}</div>
            <div>
              <h1 className="font-heading text-4xl sm:text-5xl font-extrabold mb-2">{service.title}</h1>
              <p className="text-muted-foreground">{service.price_text} · {service.duration}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">{service.description}</p>

            <h2 className="font-heading text-2xl font-bold mb-6">Course Modules</h2>
            <div className="space-y-4">
              {service.courses.map((course) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-2xl p-6 shadow-soft"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="h-5 w-5 text-brand-sky" />
                    <h3 className="font-heading text-lg font-bold">{course.title}</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {course.syllabus.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-coral shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-card rounded-2xl p-6 shadow-soft sticky top-24">
              <h3 className="font-heading text-lg font-bold mb-4">Interested?</h3>
              <p className="text-sm text-muted-foreground mb-6">Get in touch to learn more or enroll your child in this program.</p>
              <div className="space-y-3">
                <Button variant="coral" size="lg" className="w-full" onClick={() => setEnquiryOpen(true)}>
                  Enquire Now
                </Button>
                <Button variant="outline" size="lg" className="w-full" onClick={() => setPaymentOpen(true)}>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay via QR
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <EnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} courseSlug={service.slug} courseTitle={service.title} />
      <PaymentModal open={paymentOpen} onClose={() => setPaymentOpen(false)} />
    </>
  );
}
