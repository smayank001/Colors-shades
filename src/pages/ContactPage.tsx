import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { addEnquiry } from '@/api';
import { toast } from 'sonner';
import content from '@/i18n/en.json';

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  phone: z.string().trim().min(10, 'Valid phone required').max(15),
  email: z.string().trim().email('Valid email required'),
  message: z.string().trim().min(1, 'Message is required').max(1000),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await addEnquiry({
        name: data.name,
        phone: data.phone,
        email: data.email,
        message: data.message,
        course: 'General Contact Form',
      });
      toast.success('Message sent! We will get back to you soon.');
      reset();
    } catch (e: any) {
      toast.error(e.message || 'Failed to send message.');
    }
  };

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: content.site.phone },
    { icon: Mail, label: 'Email', value: content.site.email },
    { icon: MapPin, label: 'Address', value: content.site.address },
    { icon: Clock, label: 'Timings', value: content.about.timings },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-[#020617] py-24 lg:py-32 transition-colors border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#EF4444]/10 via-transparent to-[#F97316]/5 pointer-events-none"></div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <h1 className="font-heading text-5xl sm:text-6xl font-bold mb-6 text-foreground">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF4444] to-[#F97316]">Us</span>
          </h1>
          <p className="text-lg text-white/70 max-w-2xl font-light leading-relaxed">
            We'd love to hear from you. Get in touch today!
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-[#1E293B] border border-white/5 rounded-2xl p-6 sm:p-10 shadow-lg hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] transition-all duration-300">
              <h2 className="font-heading text-3xl font-bold mb-8 text-foreground">Send us a message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="c-name" className="text-white/80 font-medium">Name *</Label>
                  <Input id="c-name" {...register('name')} className="mt-2 rounded-xl bg-[#020617] border-gray-600 focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all text-white py-6" />
                  {errors.name && <p className="text-sm text-brand-coral mt-1">{errors.name.message}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="c-phone" className="text-white/80 font-medium">Phone *</Label>
                    <Input id="c-phone" {...register('phone')} className="mt-2 rounded-xl bg-[#020617] border-gray-600 focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all text-white py-6" />
                    {errors.phone && <p className="text-sm text-brand-coral mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="c-email" className="text-white/80 font-medium">Email *</Label>
                    <Input id="c-email" type="email" {...register('email')} className="mt-2 rounded-xl bg-[#020617] border-gray-600 focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all text-white py-6" />
                    {errors.email && <p className="text-sm text-brand-coral mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="c-message" className="text-white/80 font-medium">Message *</Label>
                  <Textarea id="c-message" {...register('message')} className="mt-2 rounded-xl bg-[#020617] border-gray-600 focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] transition-all text-white p-4" rows={5} />
                  {errors.message && <p className="text-sm text-brand-coral mt-1">{errors.message.message}</p>}
                </div>
                <Button type="submit" variant="default" size="xl" className="w-full bg-gradient-to-r from-[#EF4444] to-[#B91C1C] text-white border-0 hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(239,68,68,0.5)] rounded-full py-6 text-lg font-bold">
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Info + Map */}
          <div className="space-y-6">
            <div className="bg-card/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-center">
              <h2 className="font-heading text-3xl font-bold mb-8 text-foreground">Get in Touch</h2>
              <div className="space-y-8">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-5 group">
                    <div className="p-4 rounded-xl bg-brand-sky/10 shrink-0 border border-brand-sky/20 group-hover:bg-brand-sky/20 transition-colors">
                      <item.icon className="h-6 w-6 text-brand-sky drop-shadow-md" />
                    </div>
                    <div>
                      <p className="font-heading text-lg font-bold text-foreground mb-1 group-hover:text-brand-sky transition-colors">{item.label}</p>
                      <p className="text-sm text-white/70 font-light">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-card rounded-2xl overflow-hidden shadow-soft">
              <div className="h-64 bg-muted flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Google Maps embed placeholder</p>
                  <p className="text-xs opacity-70">Replace with actual embed in production</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
