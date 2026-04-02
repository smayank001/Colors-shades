import { useState, useEffect, useRef } from 'react';
import { Upload, ScanLine, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'framer-motion';
import { getQR, uploadQR } from '@/api';
import { toast } from 'sonner';

export default function AdminQRPage() {
  const [qrCode, setQrCode] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchQR = async () => {
    setLoading(true);
    try {
      const data = await getQR();
      if (data && data.length > 0) {
        setQrCode(data[data.length - 1]);
      } else {
        setQrCode(null);
      }
    } catch (e: any) {
      toast.error('Failed to fetch QR code');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQR();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed for QR codes');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', 'Payment QR');

      await uploadQR(formData);
      toast.success('QR Code updated successfully');
      fetchQR();
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload QR code');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold text-[#1E293B]">Payment QR</h1>
          <p className="text-[#1E293B]/40 font-bold text-xs uppercase tracking-widest leading-relaxed">Customize the QR code shown during checkout.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[50px] p-12 shadow-card border border-[#1E293B]/5 flex flex-col items-center justify-center relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D]"></div>
          
          <div className="relative w-full aspect-square max-w-[280px] bg-[#F9F7F5] rounded-[40px] border-2 border-dashed border-[#1E293B]/10 p-8 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-[#FF6B16]/20">
            {loading ? (
              <div className="flex flex-col items-center gap-3">
                 <div className="w-8 h-8 border-4 border-[#FF6B6B]/10 border-t-[#FF6B6B] rounded-full animate-spin"></div>
                 <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#1E293B]/30">Synchronizing...</span>
              </div>
            ) : qrCode ? (
              <motion.img 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                src={qrCode.url} 
                alt="Active QR" 
                className="w-full h-full object-contain mix-blend-multiply opacity-80" 
              />
            ) : (
              <div className="text-center opacity-20">
                <QrCode className="h-20 w-20 mx-auto mb-4" />
                <p className="text-xs font-extrabold uppercase tracking-widest">No QR Uploaded</p>
              </div>
            )}
            
            <AnimatePresence>
               {uploading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center z-20"
                  >
                     <div className="w-12 h-12 border-4 border-[#FF6B6B]/10 border-t-[#FF6B6B] rounded-full animate-spin mb-4"></div>
                     <p className="text-[#1E293B] font-extrabold text-[10px] uppercase tracking-[0.2em] animate-pulse">Uploading Artifact...</p>
                  </motion.div>
               )}
            </AnimatePresence>
          </div>

          <div className="mt-8 text-center">
             <h3 className="text-xl font-extrabold text-[#1E293B] mb-2 uppercase tracking-widest">Active QR Code</h3>
             <p className="text-xs font-bold text-[#1E293B]/40 leading-relaxed max-w-[200px] mx-auto uppercase tracking-widest">This is the code your students will scan to complete payments.</p>
          </div>
        </motion.div>

        <div className="bg-[#F9F7F5] rounded-[50px] p-12 flex flex-col justify-center space-y-8 border border-[#1E293B]/5">
           <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#FF6B6B]">
                  <Upload className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-extrabold text-[#1E293B] uppercase tracking-widest leading-none">Update QR Code</h4>
              <p className="text-sm font-medium text-[#1E293B]/60 leading-relaxed">Recommended size: 800x800px. High contrast black & white images work best for scanners.</p>
           </div>

           <div className="relative">
              <input 
                id="qr-upload" 
                type="file" 
                accept="image/*" 
                ref={fileInputRef}
                onChange={handleUpload}
                disabled={uploading}
                className="absolute inset-0 opacity-0 cursor-pointer z-10" 
              />
              <Button size="xl" className="w-full bg-[#1E293B] hover:bg-[#FF6B6B] text-white rounded-3xl h-16 font-extrabold uppercase tracking-widest text-xs transition-all shadow-xl group">
                 {uploading ? "Uploading..." : "Select New Image"}
                 <ScanLine className="ml-3 w-5 h-5 group-hover:scale-125 transition-transform" />
              </Button>
           </div>

           <div className="p-6 bg-white/50 rounded-3xl border border-[#1E293B]/5 space-y-3">
              <h5 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#1E293B]/30">Security Tip</h5>
              <p className="text-xs font-bold text-[#1E293B]/40 leading-relaxed">Always verify the QR code on a real device after uploading to ensure it points to your correct UPI/Payment handle.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
