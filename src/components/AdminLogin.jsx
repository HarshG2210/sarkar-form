// src/components/AdminLogin.js (Updated with consistent styling & press effect)
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (login(email, password)) {
      navigate("/", { replace: true });
    } else {
      setError("Invalid credentials. Use: admin / admin");
    }
  };

  const from = location.state?.from?.pathname || "/";

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0b2b52",
        fontFamily: "Poppins, sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "2rem",
          width: "100%",
          maxWidth: "400px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#0078d7",
            marginBottom: "1rem",
          }}
        >
          Admin Login
        </h2>

        {from !== "/" && (
          <p
            style={{ textAlign: "center", color: "#666", marginBottom: "1rem" }}
          >
            Please log in to access the form.
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="text"
            placeholder="User Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
              fontSize: "15px",
              outlineColor: "#0078d7",
            }}
          />

          {/* Password + Eye Icon */}
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "15px",
                outlineColor: "#0078d7",
              }}
            />

            {/* Eye Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
                color: "#555",
                padding: "4px",
              }}
            >
              {showPassword ? "👁" : "👁‍🗨"}
            </button>
          </div>

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}

          {/* Login Button with Press Effect */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.7rem",
              background: "#0078d7",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
              transition: "transform 0.1s ease, opacity 0.1s ease",
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "scale(0.94)";
              e.currentTarget.style.opacity = "0.85";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.opacity = "1";
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
