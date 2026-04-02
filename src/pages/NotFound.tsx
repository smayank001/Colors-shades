import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F9F7F5] p-6 relative overflow-hidden">
      <div className="blob w-[600px] h-[600px] bg-[#FFD93D] -top-40 -left-40 opacity-10"></div>
      <div className="blob w-[600px] h-[600px] bg-[#4D96FF] -bottom-40 -right-40 opacity-10"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="text-center relative z-10 bg-white p-16 sm:p-20 rounded-[50px] shadow-card border border-[#1E293B]/5 w-full max-w-2xl"
      >
        <div className="text-9xl mb-8 select-none">🎨</div>
        <h1 className="text-7xl sm:text-8xl font-extrabold text-[#1E293B] mb-6">404</h1>
        <p className="text-2xl text-[#1E293B]/60 font-bold mb-12 max-w-md mx-auto leading-relaxed">
          Whoops! It looks like this masterpiece is still in the making.
        </p>
        <Button size="xl" className="bg-[#1E293B] hover:bg-[#FF6B6B] text-white border-0 transition-all shadow-xl rounded-full px-12 h-16 text-lg font-extrabold uppercase tracking-widest group" asChild>
          <Link to="/">
            <Home className="h-5 w-5 mr-3 group-hover:-translate-y-1 transition-transform" />
            Back to Home
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
