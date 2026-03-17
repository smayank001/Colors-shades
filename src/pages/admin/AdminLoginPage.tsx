import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Palette, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockLogin } from '@/mock-api/db';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = mockLogin(username, password);
    if (result) {
      toast.success('Welcome back, admin!');
      navigate('/admin');
    } else {
      toast.error('Invalid credentials. Try admin / admin123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-cream p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl p-8 shadow-soft w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-primary mb-4">
            <Palette className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="font-heading text-2xl font-extrabold">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-1">Colors 'n' Shades Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={username} onChange={e => setUsername(e.target.value)} className="mt-1 rounded-xl" placeholder="admin" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="mt-1 rounded-xl" placeholder="admin123" />
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full">
            <Lock className="h-4 w-4 mr-2" />
            Sign In
          </Button>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-6">
          Demo: admin / admin123
        </p>
      </motion.div>
    </div>
  );
}
