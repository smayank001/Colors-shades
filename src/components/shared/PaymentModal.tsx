import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSettings } from '@/mock-api/db';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
}

export function PaymentModal({ open, onClose }: PaymentModalProps) {
  const settings = getSettings();

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
            className="relative bg-card rounded-2xl shadow-hover p-6 sm:p-8 w-full max-w-sm z-10 text-center"
            role="dialog"
            aria-modal="true"
            aria-label="Payment via QR"
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors" aria-label="Close">
              <X className="h-5 w-5" />
            </button>

            <h2 className="font-heading text-2xl font-bold mb-2">Pay via QR Code</h2>
            <p className="text-sm text-muted-foreground mb-6">Scan the QR code below to make payment</p>

            <div className="bg-muted rounded-2xl p-8 mb-6 flex items-center justify-center min-h-[200px]">
              {settings.qr_image ? (
                <img src={settings.qr_image} alt="Payment QR Code" className="max-w-full h-auto rounded-xl" />
              ) : (
                <div className="text-center text-muted-foreground">
                  <p className="text-4xl mb-2">📱</p>
                  <p className="text-sm">QR Code will be set up by admin</p>
                </div>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              After payment, please share the screenshot via WhatsApp or upload it through the enquiry form.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
