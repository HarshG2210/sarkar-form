// src/components/DetailsPage.jsx

import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchFormByIdRequest } from "../redux/slices/formSlice";

import logo from "../assets/logo.png";
import certificate from "../assets/certificate.png";
import "./DetailsPage.css";

/* ================= MARATHI HELPERS ================= */

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
    .map((c) => marathiDigitsMap[c] ?? c)
    .join("");

const formatDateToMarathi = (dateStr) => {
  if (!dateStr) return "----";
  const [y, m, d] = dateStr.split("-");
  return `${toMarathiDigits(d)}-${toMarathiDigits(m)}-${toMarathiDigits(y)}`;
};

/* ================= COMPONENT ================= */

export default function DetailsPage() {
  /* ---------- GET ID FROM URL PATH ---------- */
  const { id } = useParams();

  const dispatch = useDispatch();
  const cardRef = useRef(null);

  const { selectedForm, loading, error } = useSelector((s) => s.form);

  /* ---------- FETCH FORM BY ROW ID ---------- */
  useEffect(() => {
    if (id) {
      dispatch(fetchFormByIdRequest(id));
    }
  }, [id, dispatch]);

  /* ---------- STATES ---------- */
  if (loading) return null;

  if (error)
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0b2b52",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
        }}
      >
        Invalid QR
      </div>
    );

  if (!selectedForm) return null;

  const f = selectedForm;

  /* ---------- SCROLL ---------- */
  const scrollToTop = () => {
    if (cardRef.current) {
      cardRef.current.scrollTop = 0;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= UI (UNCHANGED DESIGN) ================= */

  return (
    <div
      style={{
        backgroundColor: "#0b2b52",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        padding: "1rem",
        fontFamily: `"Noto Sans Devanagari", "Segoe UI", Roboto, sans-serif`,
      }}
    >
      <div
        ref={cardRef}
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          maxWidth: "500px",
          width: "100%",
          padding: "1.5rem",
          maxHeight: "calc(100vh - 2rem)",
          overflowY: "scroll",
          overflowX: "hidden",
          WebkitMaskImage: "-webkit-radial-gradient(white, black)",
          WebkitOverflowScrolling: "touch",
          position: "relative",
        }}
      >
        {/* ---------- HEADER ---------- */}
        <div style={{ textAlign: "center" }}>
          <img src={logo} alt="logo" style={{ width: 120 }} />

          <h2
            style={{
              color: "#0078d7",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <img src={certificate} alt="certificate" width={40} />
            प्रमाणपत्र (दाखला) सत्यापन
          </h2>

          <p style={{ fontSize: "15px" }}>
            ग्रामपंचायत - {f.gram_panchayat}, तालुका - {f.taluka}, जिल्हा -{" "}
            {f.district}
          </p>
        </div>

        {/* ---------- BODY ---------- */}
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            marginTop: "1rem",
            lineHeight: "1.8",
            fontSize: "15px",
          }}
        >
          <p>
            दाखला क्रमांक - <strong>{toMarathiDigits(f.entry_no)}</strong>
          </p>

          <p>
            दाखल्याचे नाव - <strong>{f.entry_name}</strong>
          </p>

          <p>
            दाखला मागणी केलेल्या व्यक्तीचे नाव -{" "}
            <strong>{f.applicant_name}</strong>
          </p>

          <p>
            ग्रामसेवकांचे नाव - <strong>{f.gramsevak_name}</strong>
          </p>

          <p>
            दाखला वितरण दिनांक -{" "}
            <strong>{formatDateToMarathi(f.issue_date)}</strong>
          </p>
        </div>

        <p
          style={{
            fontSize: "14px",
            marginTop: "1.5rem",
            textAlign: "center",
          }}
        >
          * वरील दाखला ग्रामपंचायत {f.gram_panchayat}, तालुका - {f.taluka},
          जिल्हा - {f.district} यांचे वतीने वितरित केलेला आहे.
        </p>

        <button onClick={scrollToTop} className="back-button">
          Back
        </button>
      </div>
    </div>
  );
}
