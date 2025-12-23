import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { adminLogout } from "../redux/slices/adminAuthSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate("/login");
  };

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#0078d7" }}>
          प्रमाणपत्र (दाखला) फॉर्म
        </h1>

        <button
          onClick={handleLogout}
          style={{
            padding: "0.5rem 1rem",
            background: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <Form />
    </div>
  );
};

export default Home;
