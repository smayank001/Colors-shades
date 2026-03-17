import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getSettings, updateSettings } from '@/mock-api/db';
import { toast } from 'sonner';
import content from '@/i18n/en.json';

export default function AdminSettingsPage() {
  const settings = getSettings();
  const [qrImage, setQrImage] = useState(settings.qr_image);

  const handleSave = () => {
    updateSettings({ qr_image: qrImage });
    toast.success('Settings saved');
  };

  return (
    <div>
      <h1 className="font-heading text-2xl font-extrabold mb-6">Settings</h1>

      <div className="max-w-xl space-y-6">
        <div className="bg-card rounded-2xl p-6 shadow-soft">
          <h3 className="font-heading text-lg font-bold mb-4">Payment QR Code</h3>
          <div>
            <Label>QR Image URL</Label>
            <Input value={qrImage} onChange={e => setQrImage(e.target.value)} className="mt-1 rounded-xl" placeholder="https://..." />
            <p className="text-xs text-muted-foreground mt-2">Enter the URL of the QR code image for payments. In production, implement file upload.</p>
          </div>
          <Button variant="hero" className="mt-4" onClick={handleSave}>Save Settings</Button>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-soft">
          <h3 className="font-heading text-lg font-bold mb-4">Site Information</h3>
          <div className="space-y-3 text-sm">
            <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium">{content.site.phone}</span></div>
            <div><span className="text-muted-foreground">Email:</span> <span className="font-medium">{content.site.email}</span></div>
            <div><span className="text-muted-foreground">Address:</span> <span className="font-medium">{content.site.address}</span></div>
          </div>
          <p className="text-xs text-muted-foreground mt-4">Site info is stored in src/i18n/en.json. Edit there to update, or implement a settings API in production.</p>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-soft">
          <h3 className="font-heading text-lg font-bold mb-4">Backend Integration</h3>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>This admin dashboard currently uses localStorage as a mock database.</p>
            <p>To switch to a real backend:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Set <code className="bg-muted px-1 rounded">VITE_API_BASE_URL</code> in .env</li>
              <li>Replace mock functions in src/mock-api/db.ts with API calls</li>
              <li>Implement JWT auth with your backend</li>
              <li>Set up file storage (S3/Cloudinary) for uploads</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
