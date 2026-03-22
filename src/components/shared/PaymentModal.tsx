import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getQR } from '@/api';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
}

export function PaymentModal({ open, onClose }: PaymentModalProps) {
  const [qrImage, setQrImage] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      getQR().then(res => {
        if (res && res.length > 0) {
          setQrImage(res[res.length - 1].url);
        }
      }).catch(console.error);
    }
  }, [open]);

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
            className="relative bg-[#1E293B] backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(239,68,68,0.1)] p-6 sm:p-8 w-full max-w-sm z-10 text-center"
            role="dialog"
            aria-modal="true"
            aria-label="Payment via QR"
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-[#EF4444] transition-colors" aria-label="Close">
              <X className="h-5 w-5" />
            </button>

            <h2 className="font-heading text-2xl font-bold mb-2 text-foreground">Pay via QR Code</h2>
            <p className="text-sm text-white/50 mb-6 font-medium">Scan the QR code below to make payment</p>

            <div className="bg-[#020617] border border-white/5 rounded-2xl p-8 mb-6 flex items-center justify-center min-h-[200px] shadow-inner">
              {qrImage ? (
                <div className="p-4 bg-white rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                  <img src={qrImage} alt="Payment QR Code" className="max-w-full h-auto rounded-lg" />
                </div>
              ) : (
                <div className="text-center text-white/50">
                  <p className="text-4xl mb-3 drop-shadow-md">📱</p>
                  <p className="text-sm">QR Code will be set up by admin</p>
                </div>
              )}
            </div>

            <p className="text-xs text-white/60 font-medium">
              After payment, please share the screenshot via WhatsApp or upload it through the enquiry form.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
