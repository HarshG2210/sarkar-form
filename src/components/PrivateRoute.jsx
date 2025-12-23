import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { user } = useSelector((s) => s.adminAuth);
  return user ? children : <Navigate to="/login" />;
}
