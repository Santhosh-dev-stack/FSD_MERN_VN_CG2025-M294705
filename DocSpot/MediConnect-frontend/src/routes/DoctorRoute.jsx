import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DoctorRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (user.role !== 'DOCTOR') return <Navigate to="/login" />;

  return children;
};

export default DoctorRoute;
