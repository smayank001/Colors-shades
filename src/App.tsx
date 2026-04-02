import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { useTheme } from "@/hooks/useTheme";
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
import AdminCoursesPage from "./pages/admin/AdminCoursesPage";
import AdminMediaPage from "./pages/admin/AdminMediaPage";
import AdminEnquiriesPage from "./pages/admin/AdminEnquiriesPage";
import AdminQRPage from "./pages/admin/AdminQRPage";
import NotFound from "./pages/NotFound";

import ScrollToTop from "@/components/shared/ScrollToTop";

const queryClient = new QueryClient();

function AppContent() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      {/* Public routes */}
      <Route
        element={
          <PublicLayout>
            <></>
          </PublicLayout>
        }
      ></Route>
      <Route
        path="/"
        element={
          <PublicLayout>
            <HomePage />
          </PublicLayout>
        }
      />
      <Route
        path="/about"
        element={
          <PublicLayout>
            <AboutPage />
          </PublicLayout>
        }
      />
      <Route
        path="/services"
        element={
          <PublicLayout>
            <ServicesPage />
          </PublicLayout>
        }
      />
      <Route
        path="/services/:slug"
        element={
          <PublicLayout>
            <ServiceDetailPage />
          </PublicLayout>
        }
      />
      <Route
        path="/events"
        element={
          <PublicLayout>
            <EventsPage />
          </PublicLayout>
        }
      />
      <Route
        path="/student-work"
        element={
          <PublicLayout>
            <StudentWorkPage />
          </PublicLayout>
        }
      />
      <Route
        path="/achievements"
        element={
          <PublicLayout>
            <AchievementsPage />
          </PublicLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <PublicLayout>
            <ContactPage />
          </PublicLayout>
        }
      />

      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="services" element={<AdminServicesPage />} />
        <Route path="courses" element={<AdminCoursesPage />} />
        <Route path="media" element={<AdminMediaPage />} />
        <Route path="enquiries" element={<AdminEnquiriesPage />} />
        <Route path="qr" element={<AdminQRPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}

const App = () => {
  // Initialize theme hook at root level
  useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
