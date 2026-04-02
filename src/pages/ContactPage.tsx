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
    { icon: Phone, label: 'Phone', value: content.site.phone, color: '#FF6B6B' },
    { icon: Mail, label: 'Email', value: content.site.email, color: '#4D96FF' },
    { icon: MapPin, label: 'Address', value: content.site.address, color: '#6BCB77' },
    { icon: Clock, label: 'Timings', value: content.about.timings, color: '#FFD93D' },
  ];

  return (
    <div className="bg-[#F9F7F5] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white">
        <div className="blob w-[500px] h-[500px] bg-[#FF6B6B] -top-40 -right-40 opacity-5"></div>
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            className="max-w-3xl"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#1E293B] leading-none mb-8">
              Let's <span className="text-[#FF6B6B]">Connect</span>
            </h1>
            <p className="text-xl text-[#1E293B]/60 leading-relaxed max-w-2xl font-medium">
              Have questions or want to enroll? We're here to help you start your creative journey. Reach out to us anytime!
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 lg:px-8 py-20 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-[40px] p-10 sm:p-12 shadow-card border border-[#1E293B]/5 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF6B6B]/5 rounded-bl-full"></div>
              <h2 className="text-3xl font-extrabold mb-10 text-[#1E293B]">Send a Message</h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                  <Label htmlFor="c-name" className="text-[#1E293B] font-bold text-sm uppercase tracking-widest pl-2">Full Name</Label>
                  <Input id="c-name" {...register('name')} placeholder="Enter your name" className="rounded-2xl bg-[#F9F7F5] border-transparent focus:bg-white focus:ring-2 focus:ring-[#FF6B6B] transition-all h-16 px-6 font-medium text-[#1E293B]" />
                  {errors.name && <p className="text-sm text-[#FF6B6B] font-bold mt-2 pl-2">{errors.name.message}</p>}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <Label htmlFor="c-phone" className="text-[#1E293B] font-bold text-sm uppercase tracking-widest pl-2">Phone Number</Label>
                    <Input id="c-phone" {...register('phone')} placeholder="+91 000 000 0000" className="rounded-2xl bg-[#F9F7F5] border-transparent focus:bg-white focus:ring-2 focus:ring-[#FF6B6B] transition-all h-16 px-6 font-medium text-[#1E293B]" />
                    {errors.phone && <p className="text-sm text-[#FF6B6B] font-bold mt-2 pl-2">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-4">
                    <Label htmlFor="c-email" className="text-[#1E293B] font-bold text-sm uppercase tracking-widest pl-2">Email Address</Label>
                    <Input id="c-email" type="email" {...register('email')} placeholder="hello@example.com" className="rounded-2xl bg-[#F9F7F5] border-transparent focus:bg-white focus:ring-2 focus:ring-[#FF6B6B] transition-all h-16 px-6 font-medium text-[#1E293B]" />
                    {errors.email && <p className="text-sm text-[#FF6B6B] font-bold mt-2 pl-2">{errors.email.message}</p>}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Label htmlFor="c-message" className="text-[#1E293B] font-bold text-sm uppercase tracking-widest pl-2">How can we help?</Label>
                  <Textarea id="c-message" {...register('message')} placeholder="Tell us about your interests..." className="rounded-2xl bg-[#F9F7F5] border-transparent focus:bg-white focus:ring-2 focus:ring-[#FF6B6B] transition-all p-6 font-medium text-[#1E293B] min-h-[160px]" />
                  {errors.message && <p className="text-sm text-[#FF6B6B] font-bold mt-2 pl-2">{errors.message.message}</p>}
                </div>

                <Button type="submit" size="xl" className="w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white border-0 transition-all shadow-xl rounded-2xl h-16 text-lg font-extrabold uppercase tracking-widest mt-4">
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="bg-white rounded-[40px] p-10 sm:p-12 shadow-card border border-[#1E293B]/5 h-full flex flex-col justify-center">
              <h2 className="text-3xl font-extrabold mb-12 text-[#1E293B]">Contact Details</h2>
              <div className="space-y-10">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-6 group">
                    <div 
                      className="w-16 h-16 rounded-[22px] flex items-center justify-center shrink-0 border-2 border-transparent group-hover:scale-110 transition-all duration-300 shadow-sm"
                      style={{ backgroundColor: `${item.color}15`, color: item.color }}
                    >
                      <item.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-[#1E293B]/40 uppercase tracking-widest mb-1">{item.label}</p>
                      <p className="text-lg font-bold text-[#1E293B] group-hover:text-[#FF6B6B] transition-colors">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Section */}
              <div className="mt-16 rounded-[30px] overflow-hidden shadow-inner border-4 border-[#F9F7F5] bg-[#F9F7F5] relative h-64 group">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-[#1E293B]/30 p-8 text-center">
                  <MapPin className="h-12 w-12 mb-4 animate-bounce" />
                  <p className="text-sm font-bold uppercase tracking-widest">Google Maps Location</p>
                  <p className="text-xs font-medium mt-2">Find us at {content.site.address}</p>
                </div>
                {/* Embed actual map here if needed */}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
