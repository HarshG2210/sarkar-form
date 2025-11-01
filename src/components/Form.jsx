import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCodeDisplay from "./QRCodeDisplay";

const Form = () => {
  const [formData, setFormData] = useState({
    entryNo: "",
    entryName: "",
    applicantName: "",
    gramsevakName: "",
    issueDate: "",
  });

  const [qrVisible, setQrVisible] = useState(false);
  const navigate = useNavigate();

  // 🔹 handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setQrVisible(true);
  };

  // 🔹 clear all inputs
  const handleClear = () => {
    setFormData({
      entryNo: "",
      entryName: "",
      applicantName: "",
      gramsevakName: "",
      issueDate: "",
    });
    setQrVisible(false);
  };

  // 🔹 redirect to details page with query params
  const handleRedirect = () => {
    const queryParams = new URLSearchParams(formData).toString();
    navigate(`/details?${queryParams}`);
  };

  const queryParams = new URLSearchParams(formData).toString();
  const qrUrl = `http://192.168.1.5:5174/details?${queryParams}`;

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "500px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <label>
          दाखला क्रमांक:
          <input
            type="text"
            name="entryNo"
            value={formData.entryNo}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          दाखल्याचे नाव:
          <input
            type="text"
            name="entryName"
            value={formData.entryName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          दाखला मागणी केलेल्या व्यक्तीचे नाव:
          <input
            type="text"
            name="applicantName"
            value={formData.applicantName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          ग्रामसेवकाचे नाव:
          <input
            type="text"
            name="gramsevakName"
            value={formData.gramsevakName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          दाखला वितरण दिनांक:
          <input
            type="date"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            required
          />
        </label>

        {/* Buttons Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <button
            type="submit"
            style={{
              flex: 1,
              padding: "0.6rem",
              background: "#0078d7",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            QR Code
          </button>

          <button
            type="button"
            onClick={handleClear}
            style={{
              flex: 1,
              padding: "0.6rem",
              background: "#f44336",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Clear All
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
            !formData.issueDate
          }
          style={{
            marginTop: "1rem",
            padding: "0.6rem",
            background: "#4caf50",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
            opacity:
              !formData.entryNo ||
              !formData.entryName ||
              !formData.applicantName ||
              !formData.gramsevakName ||
              !formData.issueDate
                ? 0.6
                : 1,
          }}
        >
          Details
        </button>
      </form>

      {qrVisible && <QRCodeDisplay qrUrl={qrUrl} />}
    </div>
  );
};

export default Form;
