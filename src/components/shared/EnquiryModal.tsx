import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { createEnquiry } from '@/mock-api/db';
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

  const onSubmit = (data: EnquiryFormData) => {
    createEnquiry({
      name: data.name,
      phone: data.phone,
      email: data.email,
      message: data.message || '',
      course_slug: courseSlug,
      payment_screenshot_url: '',
      paid_flag: false,
    });
    toast.success('Enquiry submitted successfully! We will contact you soon.');
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-card rounded-2xl shadow-hover p-6 sm:p-8 w-full max-w-md z-10"
            role="dialog"
            aria-modal="true"
            aria-label="Enquiry form"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="font-heading text-2xl font-bold mb-1">Send an Enquiry</h2>
            {courseTitle && (
              <p className="text-sm text-muted-foreground mb-6">For: {courseTitle}</p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input id="name" {...register('name')} className="mt-1 rounded-xl" />
                {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" {...register('phone')} className="mt-1 rounded-xl" />
                {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" {...register('email')} className="mt-1 rounded-xl" />
                {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" {...register('message')} className="mt-1 rounded-xl" rows={3} />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">
                Submit Enquiry
              </Button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
