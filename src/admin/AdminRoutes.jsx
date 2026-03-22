// AdminRoutes.jsx
// Main entry point for the Admin Dashboard.
// Import this component in your App.jsx and place it within your <Routes>
// Example:
// import AdminRoutes from './admin/AdminRoutes';
// <Route path="/admin/*" element={<AdminRoutes />} />

import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Services from './Services';
import Courses from './Courses';
import Media from './Media';
import Enquiries from './Enquiries';
import QR from './QR';
import AdminLayout from './AdminLayout';
import ProtectedRoute from './ProtectedRoute';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="services" element={<Services />} />
          <Route path="courses" element={<Courses />} />
          <Route path="media" element={<Media />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="qr" element={<QR />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
