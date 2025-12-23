import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function OwnerPrivateRoute({ children }) {
  const { user } = useSelector((s) => s.ownerAuth);

  return user ? children : <Navigate to="/owner-login" replace />;
}
