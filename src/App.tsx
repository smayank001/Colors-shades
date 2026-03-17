import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PublicLayout } from "@/components/layout/PublicLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import EventsPage from "./pages/EventsPage";
import StudentWorkPage from "./pages/StudentWorkPage";
import AchievementsPage from "./pages/AchievementsPage";
import ContactPage from "./pages/ContactPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminServicesPage from "./pages/admin/AdminServicesPage";
import AdminGalleryPage from "./pages/admin/AdminGalleryPage";
import AdminAchievementsPage from "./pages/admin/AdminAchievementsPage";
import AdminEnquiriesPage from "./pages/admin/AdminEnquiriesPage";
import AdminSettingsPage from "./pages/admin/AdminSettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout><></></PublicLayout>}>
          </Route>
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
          <Route path="/services/:slug" element={<PublicLayout><ServiceDetailPage /></PublicLayout>} />
          <Route path="/events" element={<PublicLayout><EventsPage /></PublicLayout>} />
          <Route path="/student-work" element={<PublicLayout><StudentWorkPage /></PublicLayout>} />
          <Route path="/achievements" element={<PublicLayout><AchievementsPage /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="services" element={<AdminServicesPage />} />
            <Route path="gallery" element={<AdminGalleryPage />} />
            <Route path="achievements" element={<AdminAchievementsPage />} />
            <Route path="enquiries" element={<AdminEnquiriesPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
