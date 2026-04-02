import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Palette, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/api';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Welcome back, admin!');
      navigate('/admin');
    } catch (err: any) {
      toast.error(err.message || 'Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F7F5] p-6 relative overflow-hidden">
      <div className="blob w-[600px] h-[600px] bg-[#FF6B6B] -top-40 -left-40 opacity-5"></div>
      <div className="blob w-[600px] h-[600px] bg-[#4D96FF] -bottom-40 -right-40 opacity-5"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-[50px] p-12 sm:p-16 shadow-card border border-[#1E293B]/5 w-full max-w-lg z-10 relative"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[30px] bg-[#FF6B6B] mb-8 shadow-lg shadow-[#FF6B6B]/20">
            <Palette className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-[#1E293B] mb-2">Admin <span className="text-[#FF6B6B]">Hub</span></h1>
          <p className="text-[#1E293B]/40 font-bold text-xs uppercase tracking-[0.2em]">Colors N Shades Institute</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <Label htmlFor="email" className="text-[#1E293B] font-bold text-xs uppercase tracking-widest pl-2">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="rounded-2xl bg-[#F9F7F5] border-transparent focus:bg-white focus:ring-2 focus:ring-[#FF6B6B] transition-all h-16 px-6 font-medium text-[#1E293B]" 
              placeholder="admin@example.com" 
              required
            />
          </div>
          
          <div className="space-y-4">
            <Label htmlFor="password" className="text-[#1E293B] font-bold text-xs uppercase tracking-widest pl-2">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              className="rounded-2xl bg-[#F9F7F5] border-transparent focus:bg-white focus:ring-2 focus:ring-[#FF6B6B] transition-all h-16 px-6 font-medium text-[#1E293B]" 
              placeholder="••••••••" 
              required
            />
          </div>

          <Button type="submit" size="xl" className="w-full bg-[#1E293B] hover:bg-[#FF6B6B] text-white border-0 transition-all shadow-xl rounded-2xl h-16 text-lg font-extrabold uppercase tracking-widest mt-4 group">
            <Lock className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
            Authenticate
          </Button>
        </form>

        <div className="mt-12 flex items-center gap-4 p-4 rounded-2xl bg-[#F9F7F5]/50 border border-[#1E293B]/5">
           <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <span className="text-xl">💡</span>
           </div>
           <p className="text-[10px] sm:text-xs font-bold text-[#1E293B]/40 uppercase tracking-widest leading-relaxed">
             Access restricted to authorized faculty members only.
           </p>
        </div>
      </motion.div>
    </div>
  );
}
