// src/components/Form.jsx
import React, { useState, useEffect, useRef } from "react";
import QRCodeDisplay from "./QRCodeDisplay";
import CryptoJS from "crypto-js";
import { useDispatch, useSelector } from "react-redux";
import { submitFormRequest } from "../redux/slices/formSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export default function Form() {
  const dispatch = useDispatch();
  const hasSubmittedRef = useRef(false);

  const { loading, lastInsertedId, error } = useSelector((s) => s.form);

  const [formData, setFormData] = useState({
    gramPanchayat: "",
    taluka: "",
    district: "",
    entryNo: "",
    entryName: "",
    applicantName: "",
    gramsevakName: "",
    issueDate: "",
  });

  const [qrUrl, setQrUrl] = useState("");
  const [qrVisible, setQrVisible] = useState(false);

  /* ---------- SAFE ENCRYPT ---------- */
  const encryptData = (obj) => {
    try {
      return CryptoJS.AES.encrypt(JSON.stringify(obj), SECRET_KEY).toString();
    } catch (e) {
      console.error("Encryption error", e);
      return null;
    }
  };

  /* ---------- SUBMIT ---------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    const encrypted = encryptData(formData);
    if (!encrypted) {
      toast.error("Encryption failed");
      return;
    }

    hasSubmittedRef.current = true;

    const baseUrl = window.location.origin;
    const tempId = crypto.randomUUID(); // temporary UUID
    const qrUrl = `${baseUrl}/details?id=${tempId}`;

    toast.dismiss();
    toast.info("Submitting form...", { autoClose: false });

    dispatch(
      submitFormRequest({
        ...formData,
        encryptedPayload: encrypted,
        qrUrl, // ✅ SEND qr_url DURING INSERT
      })
    );
  };

  /* ---------- SUCCESS ---------- */
  useEffect(() => {
    if (!lastInsertedId || !hasSubmittedRef.current) return;

    const baseUrl = window.location.origin;
    const finalUrl = `${baseUrl}/details?id=${lastInsertedId}`;

    setQrUrl(finalUrl);
    setQrVisible(true);

    toast.dismiss();
    toast.success("Form submitted successfully!");

    hasSubmittedRef.current = false;
  }, [lastInsertedId]);

  /* ---------- ERROR ---------- */
  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.error(error);
    }
  }, [error]);

  /* ---------- Handle Redirect ---------- */
  const handleRedirect = () => {
    if (!qrUrl) return;

    // Open details page generated from successful submit
    window.open(qrUrl, "_blank");
  };

  return (
    <div style={page}>
      <div style={card}>
        <h2 style={title}>प्रमाणपत्र (दाखला) फॉर्म</h2>

        <form onSubmit={handleSubmit} style={form}>
          {[
            ["entryNo", "दाखला क्रमांक"],
            ["entryName", "दाखल्याचे नाव"],
            ["applicantName", "दाखला मागणी केलेल्या व्यक्तीचे नाव"],
            ["gramsevakName", "ग्रामसेवकांचे नाव"],
            ["issueDate", "दाखला वितरण दिनांक", "date"],
            ["gramPanchayat", "ग्रामपंचायत"],
            ["taluka", "तालुका"],
            ["district", "जिल्हा"],
          ].map(([name, label, type = "text"]) => (
            <label key={name}>
              {label}:
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={(e) =>
                  setFormData({ ...formData, [name]: e.target.value })
                }
                required
                disabled={loading}
                style={inputStyle}
              />
            </label>
          ))}

          <div style={{ display: "flex", gap: "1rem" }}>
            <button style={primaryButton} disabled={loading}>
              {loading ? "Submitting..." : "QR कोड तयार करा"}
            </button>

            <button
              type="button"
              onClick={() => {
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
                setQrUrl("");
              }}
              style={dangerButton}
              disabled={loading}
            >
              सर्व साफ करा
            </button>
          </div>
        </form>

        {qrVisible && (
          <>
            <button
              type="button"
              onClick={handleRedirect}
              style={successButton}
              disabled={loading}
            >
              तपशील पृष्ठावर जा
            </button>
            <QRCodeDisplay qrUrl={qrUrl} />
          </>
        )}
        <ToastContainer position="top-center" />
      </div>
    </div>
  );
}

/* ---------- ORIGINAL STYLES RESTORED ---------- */

const page = {
  minHeight: "100vh",
  background: "#0b2b52",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const card = {
  background: "#fff",
  borderRadius: "12px",
  padding: "2rem",
  maxWidth: "520px",
  width: "100%",
};

const title = {
  textAlign: "center",
  color: "#0078d7",
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const inputStyle = {
  width: "100%",
  padding: "0.5rem",
  marginTop: "4px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const primaryButton = {
  flex: 1,
  background: "#0078d7",
  color: "#fff",
  border: "none",
  padding: "0.6rem",
  borderRadius: "6px",
};

const dangerButton = {
  flex: 1,
  background: "#f44336",
  color: "#fff",
  border: "none",
  padding: "0.6rem",
  borderRadius: "6px",
};

const successButton = {
  marginTop: "1.5rem",
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  background: "linear-gradient(135deg, #43a047, #66bb6a)",
  color: "#fff",
  border: "none",
  padding: "0.75rem 2.2rem",
  borderRadius: "10px",
  fontSize: "15px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.25s ease",
};
