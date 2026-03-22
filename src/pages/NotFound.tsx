import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0F1C] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="text-center relative z-10 bg-card/40 backdrop-blur-md border border-white/5 p-12 rounded-3xl shadow-2xl">
        <h1 className="mb-4 text-8xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-sky to-brand-coral">404</h1>
        <p className="mb-8 text-xl text-white/70 font-light">Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className="inline-block bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-3 rounded-full font-medium transition-colors">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
