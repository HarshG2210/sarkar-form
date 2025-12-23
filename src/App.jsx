import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Home from "./pages/Home";
import AdminLogin from "./components/AdminLogin";
import OwnerLogin from "./components/OwnerLogin";
import OwnerDashboard from "./components/OwnerDashboard";
import PrivateRoute from "./components/PrivateRoute";
import OwnerPrivateRoute from "./components/OwnerPrivateRoute";
import DetailsPage from "./components/DetailsPage";
import { hydrateAdminAuth } from "./redux/slices/adminAuthSlice";
import { hydrateOwnerAuth } from "./redux/slices/ownerAuthSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const admin = localStorage.getItem("adminAuth");
    const owner = localStorage.getItem("ownerAuth");

    if (admin) dispatch(hydrateAdminAuth(JSON.parse(admin)));
    if (owner) dispatch(hydrateOwnerAuth(JSON.parse(owner)));
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/owner-login" element={<OwnerLogin />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/owner-account"
        element={
          <OwnerPrivateRoute>
            <OwnerDashboard />
          </OwnerPrivateRoute>
        }
      />

      <Route path="/:id" element={<DetailsPage />} />
    </Routes>
  );
}
