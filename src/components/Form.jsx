// src/components/Form.js (Updated with Gram Panchayat, Taluka, District fields)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCodeDisplay from "./QRCodeDisplay";

const Form = () => {
  const [formData, setFormData] = useState({
    gramPanchayat: "", // New field
    taluka: "", // New field
    district: "", // New field
    entryNo: "",
    entryName: "",
    applicantName: "",
    gramsevakName: "",
    issueDate: "",
  });

  const [qrVisible, setQrVisible] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setQrVisible(true);
  };

  // Clear all inputs
  const handleClear = () => {
    setFormData({
      gramPanchayat: "",
      taluka: "",
      district: "",
      entryNo: "",
      entryName: "",
      applicantName: "",
      gramsevakName: "",
      issueDate: "",
    });
    setQrVisible(false);
  };

  // Redirect to details page
  const handleRedirect = () => {
    const queryParams = new URLSearchParams(formData).toString();
    navigate(`/details?${queryParams}`);
  };

  const baseUrl =
    import.meta.env.MODE === "development"
      ? window.location.origin
      : "https://www.gp-mahaegram.co.in/";

  const queryParams = new URLSearchParams(formData).toString();
  const qrUrl = `${baseUrl}/details?${queryParams}`;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b2b52",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "2rem",
          width: "100%",
          maxWidth: "520px",
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
          प्रमाणपत्र (दाखला) फॉर्म
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <label style={{ fontWeight: 500 }}>
            दाखला क्रमांक:
            <input
              type="text"
              name="entryNo"
              value={formData.entryNo}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="उदा. 54679661200037"
            />
          </label>

          <label style={{ fontWeight: 500 }}>
            दाखल्याचे नाव:
            <input
              type="text"
              name="entryName"
              value={formData.entryName}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="उदा. विवाह नोंद दाखला"
            />
          </label>

          <label style={{ fontWeight: 500 }}>
            दाखला मागणी केलेल्या व्यक्तीचे नाव:
            <input
              type="text"
              name="applicantName"
              value={formData.applicantName}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="उदा. सुरेश बळे"
            />
          </label>

          <label style={{ fontWeight: 500 }}>
            ग्रामसेवकाचे नाव:
            <input
              type="text"
              name="gramsevakName"
              value={formData.gramsevakName}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="उदा. पांचाळ मधुकर वामनराव"
            />
          </label>

          <label style={{ fontWeight: 500 }}>
            दाखला वितरण दिनांक:
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label>

          {/* New Fields */}
          <label style={{ fontWeight: 500 }}>
            ग्रामपंचायत:
            <input
              type="text"
              name="gramPanchayat"
              value={formData.gramPanchayat}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="उदा. पोखर्णी"
            />
          </label>

          <label style={{ fontWeight: 500 }}>
            तालुका:
            <input
              type="text"
              name="taluka"
              value={formData.taluka}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="उदा. परभणी"
            />
          </label>

          <label style={{ fontWeight: 500 }}>
            जिल्हा:
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              style={inputStyle}
              placeholder="उदा. परभणी"
            />
          </label>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <button type="submit" style={primaryButton}>
              QR कोड तयार करा
            </button>
            <button type="button" onClick={handleClear} style={dangerButton}>
              सर्व साफ करा
            </button>
          </div>

          <button
            type="button"
            onClick={handleRedirect}
            disabled={
              !formData.entryNo ||
              !formData.entryName ||
              !formData.applicantName ||
              !formData.gramsevakName ||
              !formData.issueDate ||
              !formData.gramPanchayat ||
              !formData.taluka ||
              !formData.district
            }
            style={{
              ...successButton,
              opacity:
                !formData.entryNo ||
                !formData.entryName ||
                !formData.applicantName ||
                !formData.gramsevakName ||
                !formData.issueDate ||
                !formData.gramPanchayat ||
                !formData.taluka ||
                !formData.district
                  ? 0.6
                  : 1,
            }}
          >
            तपशील पृष्ठावर जा
          </button>
        </form>

        {/* QR Display */}
        {qrVisible && <QRCodeDisplay qrUrl={qrUrl} />}
      </div>
    </div>
  );
};

// 🎨 Reusable Styles (unchanged)
const inputStyle = {
  width: "100%",
  marginTop: "4px",
  padding: "0.5rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "15px",
  outlineColor: "#0078d7",
};

const primaryButton = {
  flex: 1,
  padding: "0.6rem",
  background: "#0078d7",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
};

const dangerButton = {
  flex: 1,
  padding: "0.6rem",
  background: "#f44336",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
};

const successButton = {
  marginTop: "1rem",
  width: "100%",
  padding: "0.7rem",
  background: "#4caf50",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
};

export default Form;
