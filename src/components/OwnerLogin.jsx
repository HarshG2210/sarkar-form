import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ownerLoginRequest } from "../redux/slices/ownerAuthSlice";

export default function OwnerLogin() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((s) => s.ownerAuth);

  const [showPassword, setShowPassword] = useState(false);

  // If already logged in as owner, redirect
  if (user) return <Navigate to="/owner-account" />;

  const submit = (e) => {
    e.preventDefault();

    dispatch(
      ownerLoginRequest({
        email: e.target.email.value,
        password: e.target.password.value,
      })
    );
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Owner Login</h2>
        <p style={styles.subtitle}>Sign in to access owner dashboard</p>

        <form onSubmit={submit} style={styles.form}>
          {/* Username */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              name="email"
              placeholder="Owner Admin"
              required
              style={styles.input}
            />
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>

            <div style={styles.inputContainer}>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                required
                style={styles.passwordInput}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
                aria-label="Toggle password visibility"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* Error */}
          {error && <p style={styles.error}>{error}</p>}

          {/* Button */}
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0b2b52, #123c6f)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Poppins, sans-serif",
  },
  card: {
    background: "#ffffff",
    padding: "2.5rem",
    borderRadius: "14px",
    width: "100%",
    maxWidth: "380px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
  },
  title: {
    textAlign: "center",
    color: "#0b2b52",
    marginBottom: "0.3rem",
    fontWeight: 600,
  },
  subtitle: {
    textAlign: "center",
    fontSize: "14px",
    color: "#666",
    marginBottom: "1.5rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#333",
  },
  input: {
    padding: "0.7rem 0.8rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
  },
  inputContainer: {
    position: "relative",
    width: "85%",
  },
  passwordInput: {
    width: "100%",
    padding: "0.7rem 2.6rem 0.7rem 0.8rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
  },
  eyeIcon: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "18px",
    color: "#555",
    userSelect: "none",
  },
  button: {
    marginTop: "0.5rem",
    padding: "0.75rem",
    borderRadius: "8px",
    border: "none",
    background: "#0078d7",
    color: "#fff",
    fontSize: "15px",
    fontWeight: 500,
    cursor: "pointer",
  },
  error: {
    color: "#e53935",
    fontSize: "13px",
    textAlign: "center",
  },
};
