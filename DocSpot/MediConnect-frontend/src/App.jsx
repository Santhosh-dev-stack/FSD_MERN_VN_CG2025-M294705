import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';

import Hero from './pages/Hero';
import Doctors from './pages/Doctors';
import BookAppointment from './pages/BookAppointment';
import MyAppointments from './pages/MyAppointments';
import DoctorAppointments from './pages/DoctorAppointments';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDoctors from './pages/AdminDoctors';
import AdminUsers from './pages/AdminUsers';
import DoctorProfile from './pages/DoctorProfile';
import DoctorEditProfile from './pages/DoctorEditProfile';

/* 🆕 Dashboards */
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';

import ProtectedRoute from './routes/ProtectedRoute';
import DoctorRoute from './routes/DoctorRoute';
import AdminRoute from './routes/AdminRoute';

import MainLayout from './layouts/MainLayout';
import { AuthProvider, useAuth } from './context/AuthContext';

/* ================= HOME (HERO OR DASHBOARD) ================= */
const HomeRoute = () => {
  const { user } = useAuth();

  // ❌ Not logged in → Hero page
  if (!user) return <Hero />;

  // ✅ Logged in → role-based dashboard
  if (user.role === 'ADMIN') return <Navigate to="/admin/dashboard" />;
  if (user.role === 'DOCTOR') return <Navigate to="/doctor/dashboard" />;
  return <Navigate to="/dashboard" />;
};

/* ================= ROUTES ================= */
const AppRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      {/* 🌐 HERO / LANDING */}
      <Route path="/" element={<HomeRoute />} />

      {/* 🔓 PUBLIC (NO LAYOUT) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= PATIENT ================= */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <PatientDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/doctors"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Doctors />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/doctors/:id"
        element={
          <ProtectedRoute>
            <MainLayout>
              <DoctorProfile />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/book"
        element={
          <ProtectedRoute>
            <MainLayout>
              <BookAppointment />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/appointments"
        element={
          <ProtectedRoute>
            <MainLayout>
              <MyAppointments />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ================= DOCTOR ================= */}
      <Route
        path="/doctor/dashboard"
        element={
          <DoctorRoute>
            <MainLayout>
              <DoctorDashboard />
            </MainLayout>
          </DoctorRoute>
        }
      />

      <Route
        path="/doctor/appointments"
        element={
          <DoctorRoute>
            <MainLayout>
              <DoctorAppointments />
            </MainLayout>
          </DoctorRoute>
        }
      />

      <Route
        path="/doctor/profile"
        element={
          <DoctorRoute>
            <MainLayout>
              <DoctorEditProfile />
            </MainLayout>
          </DoctorRoute>
        }
      />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/doctors"
        element={
          <AdminRoute>
            <MainLayout>
              <AdminDoctors />
            </MainLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <MainLayout>
              <AdminUsers />
            </MainLayout>
          </AdminRoute>
        }
      />

      {/* ❓ FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

/* ================= ROOT ================= */
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
