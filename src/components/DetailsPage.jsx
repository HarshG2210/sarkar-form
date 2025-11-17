// src/components/DetailsPage.js
import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import certificate from "../assets/certificate.png";
import "./DetailsPage.css";

const marathiDigitsMap = {
  0: "०",
  1: "१",
  2: "२",
  3: "३",
  4: "४",
  5: "५",
  6: "६",
  7: "७",
  8: "८",
  9: "९",
};

const toMarathiDigits = (input = "") =>
  String(input)
    .split("")
    .map((ch) =>
      marathiDigitsMap[ch] !== undefined ? marathiDigitsMap[ch] : ch
    )
    .join("");

const formatDateToMarathi = (dateStr) => {
  if (!dateStr) return "----";
  // expect yyyy-mm-dd or similar
  const parts = dateStr.split("-");
  if (parts.length < 3) {
    // fallback: convert any digits in the whole string
    return toMarathiDigits(dateStr);
  }
  const [year, month, day] = parts;
  return `${toMarathiDigits(day)}-${toMarathiDigits(month)}-${toMarathiDigits(
    year
  )}`;
};

const safeGet = (query, key, fallback = "----") => {
  const val = query.get(key);
  if (val === null || val === undefined || String(val).trim() === "")
    return fallback;
  return val;
};

const DetailsPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  // fetch values (prefer provided values; fallback to ----)
  const entryNo = safeGet(query, "entryNo", "----");
  const entryName = safeGet(query, "entryName", "----");
  const applicantName = safeGet(query, "applicantName", "----");
  const gramsevakName = safeGet(query, "gramsevakName", "----");
  const issueDateRaw = query.get("issueDate") || "";
  const gramPanchayat = safeGet(query, "gramPanchayat", "----");
  const taluka = safeGet(query, "taluka", "----");
  const district = safeGet(query, "district", "----");

  return (
    <div
      style={{
        backgroundColor: "#0b2b52",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        fontFamily: `"Noto Sans Devanagari", "Segoe UI", Roboto, sans-serif`,
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
          <img src={logo} alt="आपले सरकार" style={{ width: "120px" }} />

          <h2
            style={{
              color: "#0078d7",
              marginBottom: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            <img
              src={certificate}
              alt="aple sarkar"
              style={{ width: "50px", height: "50px" }}
            />
            <span>प्रमाणपत्र (दाखला) सत्यापन</span>
          </h2>

          {/* New Fields Display */}
          <p
            style={{
              fontSize: "15px",
            }}
          >
            ग्रामपंचायत - {gramPanchayat || "----"}, तालुका - {taluka || "----"}
            , जिल्हा - {district || "----"}
          </p>
        </div>

        {/* Certificate Box */}
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            lineHeight: "1.8",
            fontSize: "15px",
            marginTop: "1rem",
            textAlign: "left",
          }}
        >
          <p>
            दाखला क्रमांक -{" "}
            <strong>
              {entryNo && entryNo !== "----"
                ? toMarathiDigits(entryNo)
                : "----"}
            </strong>
          </p>

          <p>
            दाखल्याचे नाव - <strong> {entryName}</strong>
          </p>

          <p>
            दाखला मागणी केलेल्या व्यक्तीचे नाव -{" "}
            <strong> {applicantName}</strong>
          </p>

          <p>
            ग्रामसेवकांचे नाव - <strong> {gramsevakName}</strong>
          </p>

          <p>
            दाखला वितरण दिनांक -{" "}
            <strong>
              {issueDateRaw ? formatDateToMarathi(issueDateRaw) : "----"}
            </strong>
          </p>
        </div>

        {/* Footer Note: centered */}
        <p
          style={{
            fontSize: "14px",
            marginTop: "1.5rem",
            color: "#333",
            lineHeight: "1.6",
            textAlign: "center",
          }}
        >
          * वरील दाखला ग्रामपंचायत {gramPanchayat || "पोखर्णी"}, तालुका -{" "}
          {taluka || "परभणी"}, जिल्हा - {district || "परभणी"} यांचे वतीने वितरित
          केलेला आहे.
        </p>

        <div style={{ marginTop: "1rem", textAlign: "left" }}>
          <button className="back-button" title="back">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
