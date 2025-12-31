import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaUserMd,
  FaCalendarCheck,
  FaUsers,
  FaSignOutAlt,
  FaHome,
  FaStethoscope,
  FaUserEdit,
} from 'react-icons/fa';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <FaStethoscope className="text-blue-600" />
          <span className="text-blue-600">Medi</span>
          <span className="text-gray-700">Connect</span>
        </Link>

        {user && (
          <nav className="flex items-center gap-6 font-medium">
            {/* ================= PATIENT ================= */}
            {user.role === 'PATIENT' && (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 hover:text-blue-600">
                  <FaHome /> Dashboard
                </Link>

                <Link to="/doctors" className="flex items-center gap-2 hover:text-blue-600">
                  <FaUserMd /> Doctors
                </Link>

                <Link to="/book" className="flex items-center gap-2 hover:text-blue-600">
                  <FaCalendarCheck /> Book
                </Link>

                <Link to="/appointments" className="flex items-center gap-2 hover:text-blue-600">
                  <FaCalendarCheck /> My Appointments
                </Link>
              </>
            )}

            {/* ================= DOCTOR ================= */}
            {user.role === 'DOCTOR' && (
              <>
                <Link
                  to="/doctor/dashboard"
                  className="flex items-center gap-2 hover:text-blue-600"
                >
                  <FaHome /> Dashboard
                </Link>

                <Link
                  to="/doctor/appointments"
                  className="flex items-center gap-2 hover:text-blue-600"
                >
                  <FaCalendarCheck /> Appointments
                </Link>

                <Link to="/doctor/profile" className="flex items-center gap-2 hover:text-blue-600">
                  <FaUserEdit /> Edit Profile
                </Link>
              </>
            )}

            {/* ================= ADMIN ================= */}
            {user.role === 'ADMIN' && (
              <>
                <Link to="/admin/dashboard" className="flex items-center gap-2 hover:text-blue-600">
                  <FaHome /> Dashboard
                </Link>

                <Link to="/admin/doctors" className="flex items-center gap-2 hover:text-blue-600">
                  <FaUserMd /> Approve Doctors
                </Link>

                <Link to="/admin/users" className="flex items-center gap-2 hover:text-blue-600">
                  <FaUsers /> Users
                </Link>
              </>
            )}

            {/* Logout */}
            <button
              onClick={logout}
              className="ml-6 flex items-center gap-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              <FaSignOutAlt /> Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
