// src/components/DetailsPage.js (Updated to display new fields)
import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/aple-sarkar-logo.png";
import "./DetailsPage.css";

const DetailsPage = () => {
  const { search } = useLocation();
  // const navigate = useNavigate();
  const query = new URLSearchParams(search);

  const formatDate = (dateStr) => {
    if (!dateStr) return "----";
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <div
      style={{
        backgroundColor: "#0b2b52",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          maxWidth: "500px",
          width: "100%",
          padding: "1.5rem",
        }}
      >
        {/* Logo and Title */}
        <div style={{ textAlign: "center" }}>
          <img
            src={logo}
            alt="आपले सरकार"
            style={{ width: "120px", marginBottom: "1rem" }}
          />
          <h2 style={{ color: "#0078d7", marginBottom: "0.5rem" }}>
            प्रमाणपत्र (दाखला) सत्यापन
          </h2>
        </div>

        {/* Certificate Box */}
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            lineHeight: "1.8",
            fontSize: "15px",
          }}
        >
          <p>
            <strong>दाखला क्रमांक:</strong> {query.get("entryNo") || "----"}
          </p>
          <p>
            <strong>दाखल्याचे नाव:</strong> {query.get("entryName") || "----"}
          </p>
          <p>
            <strong>दाखला मागणी केलेल्या व्यक्तीचे नाव:</strong>{" "}
            {query.get("applicantName") || "----"}
          </p>
          <p>
            <strong>ग्रामसेवकाचे नाव:</strong>{" "}
            {query.get("gramsevakName") || "----"}
          </p>
          <p>
            <strong>दाखला वितरण दिनांक:</strong>{" "}
            {formatDate(query.get("issueDate"))}
          </p>
          {/* New Fields Display */}
          <p>
            <strong>ग्रामपंचायत:</strong> {query.get("gramPanchayat") || "----"}
          </p>
          <p>
            <strong>तालुका:</strong> {query.get("taluka") || "----"}
          </p>
          <p>
            <strong>जिल्हा:</strong> {query.get("district") || "----"}
          </p>
        </div>

        {/* Footer Note */}
        <p
          style={{
            fontSize: "14px",
            marginTop: "1.5rem",
            color: "#333",
            lineHeight: "1.6",
          }}
        >
          * वरील दाखला ग्रामपंचायत {query.get("gramPanchayat") || "पोखर्णी"},
          तालुका - {query.get("taluka") || "परभणी"}, जिल्हा -{" "}
          {query.get("district") || "परभणी"} यांचे वतीने वितरित केलेला आहे.
        </p>
        <div style={{ marginTop: "1rem" }}>
          <button
            className="back-button"
            title="back"
            // onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
