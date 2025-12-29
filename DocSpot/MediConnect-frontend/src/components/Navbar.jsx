import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <span className="font-semibold">Book-A-Doctor</span>

      <div className="space-x-4">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        {user?.role === 'PATIENT' && (
          <>
            <Link to="/doctors">Doctors</Link>
            <Link to="/book">Book</Link>
            <Link to="/appointments">My Appointments</Link>
          </>
        )}

        {user?.role === 'DOCTOR' && <Link to="/doctor/appointments">Appointments</Link>}

        {user?.role === 'ADMIN' && (
          <>
            <Link to="/admin/doctors">Approve Doctors</Link>
            <Link to="/admin/users">Users</Link>
          </>
        )}

        <button onClick={logout} className="ml-4 underline">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
