import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { addEnquiry } from '@/api';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const enquirySchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  phone: z.string().trim().min(10, 'Valid phone number required').max(15),
  email: z.string().trim().email('Valid email required').max(255),
  message: z.string().trim().max(1000).optional(),
});

type EnquiryFormData = z.infer<typeof enquirySchema>;

interface EnquiryModalProps {
  open: boolean;
  onClose: () => void;
  courseSlug?: string;
  courseTitle?: string;
}

export function EnquiryModal({ open, onClose, courseSlug = '', courseTitle = '' }: EnquiryModalProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
  });

  const onSubmit = async (data: EnquiryFormData) => {
    try {
      await addEnquiry({
        name: data.name,
        phone: data.phone,
        email: data.email, // backend might not use email, but we send it
        message: data.message || '',
        course: courseTitle || courseSlug || 'General Inquiry',
      });
      toast.success('Enquiry submitted successfully! We will contact you soon.');
      reset();
      onClose();
    } catch (e: any) {
      toast.error(e.message || 'Failed to submit enquiry');
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-[#1E293B] backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(239,68,68,0.1)] p-6 sm:p-8 w-full max-w-md z-10"
            role="dialog"
            aria-modal="true"
            aria-label="Enquiry form"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-[#EF4444] transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="font-heading text-2xl font-bold mb-1 text-foreground">Send an Enquiry</h2>
            {courseTitle && (
              <p className="text-sm text-[#EF4444] mb-6 font-medium">For: {courseTitle}</p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white/80 font-medium">Name *</Label>
                <Input id="name" {...register('name')} className="mt-1 rounded-xl bg-black/40 border-white/10 focus:ring-2 focus:ring-brand-sky/50 text-white" />
                {errors.name && <p className="text-sm text-brand-coral mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="phone" className="text-white/80 font-medium">Phone *</Label>
                <Input id="phone" {...register('phone')} className="mt-1 rounded-xl bg-black/40 border-white/10 focus:ring-2 focus:ring-brand-sky/50 text-white" />
                {errors.phone && <p className="text-sm text-brand-coral mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <Label htmlFor="email" className="text-white/80 font-medium">Email *</Label>
                <Input id="email" type="email" {...register('email')} className="mt-1 rounded-xl bg-black/40 border-white/10 focus:ring-2 focus:ring-brand-sky/50 text-white" />
                {errors.email && <p className="text-sm text-brand-coral mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="message" className="text-white/80 font-medium">Message</Label>
                <Textarea id="message" {...register('message')} className="mt-1 rounded-xl bg-black/40 border-white/10 focus:ring-2 focus:ring-brand-sky/50 text-white" rows={3} />
              </div>
              <Button type="submit" variant="default" size="lg" className="w-full bg-gradient-to-r from-brand-sky to-brand-coral text-white border-0 hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(59,130,246,0.5)] rounded-full font-bold mt-2">
                Submit Enquiry
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
