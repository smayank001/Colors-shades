import { useState, useEffect, useRef } from 'react';
import { Upload, ScanLine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
        // Assume the last uploaded QR code is the active one
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
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-extrabold mb-1">Payment QR Code</h1>
          <p className="text-muted-foreground">Manage the active payment QR displayed on the site</p>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-8 shadow-soft max-w-sm">
        <div className="flex flex-col items-center">
          <div className="w-full aspect-square border-2 border-dashed border-border rounded-xl flex items-center justify-center p-4 mb-6 bg-muted/30">
            {loading ? (
              <span className="text-muted-foreground">Loading...</span>
            ) : qrCode ? (
              <img src={qrCode.url} alt="Payment QR" className="w-full h-full object-contain rounded-lg shadow-sm" />
            ) : (
              <div className="text-center text-muted-foreground">
                <ScanLine className="h-10 w-10 mx-auto mb-2 opacity-30" />
                <p>No QR Code set</p>
              </div>
            )}
          </div>

          <div className="w-full">
            <Label htmlFor="qr-upload" className="mb-2 block text-center font-medium">Update QR Code</Label>
            <Input 
              id="qr-upload" 
              type="file" 
              accept="image/*" 
              ref={fileInputRef}
              onChange={handleUpload}
              disabled={uploading}
              className="mt-1" 
            />
            {uploading && <p className="text-sm text-center text-muted-foreground mt-2 flex justify-center items-center gap-2"><Upload className="h-4 w-4 animate-bounce" /> Uploading...</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
