import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { createEnquiry } from '@/mock-api/db';
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

  const onSubmit = (data: FormData) => {
    createEnquiry({
      name: data.name,
      phone: data.phone,
      email: data.email,
      message: data.message,
      course_slug: '',
      payment_screenshot_url: '',
      paid_flag: false,
    });
    toast.success('Message sent! We will get back to you soon.');
    reset();
  };

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: content.site.phone },
    { icon: Mail, label: 'Email', value: content.site.email },
    { icon: MapPin, label: 'Address', value: content.site.address },
    { icon: Clock, label: 'Timings', value: content.about.timings },
  ];

  return (
    <>
      <section className="bg-bg-cream py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground">We'd love to hear from you. Get in touch today!</p>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-soft">
              <h2 className="font-heading text-2xl font-bold mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="c-name">Name *</Label>
                  <Input id="c-name" {...register('name')} className="mt-1 rounded-xl" />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="c-phone">Phone *</Label>
                    <Input id="c-phone" {...register('phone')} className="mt-1 rounded-xl" />
                    {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="c-email">Email *</Label>
                    <Input id="c-email" type="email" {...register('email')} className="mt-1 rounded-xl" />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="c-message">Message *</Label>
                  <Textarea id="c-message" {...register('message')} className="mt-1 rounded-xl" rows={5} />
                  {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full">Send Message</Button>
              </form>
            </div>
          </motion.div>

          {/* Info + Map */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-soft">
              <h2 className="font-heading text-2xl font-bold mb-6">Get in Touch</h2>
              <div className="space-y-5">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-brand-coral/10 shrink-0">
                      <item.icon className="h-5 w-5 text-brand-coral" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
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
