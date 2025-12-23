// src/components/DetailsPage.jsx
import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import certificate from "../assets/certificate.png";
import "./DetailsPage.css";
import { supabase } from "../supabase/client";

/* ---------------- MARATHI ---------------- */

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
  const [year, month, day] = dateStr.split("-");
  return `${toMarathiDigits(day)}-${toMarathiDigits(month)}-${toMarathiDigits(
    year
  )}`;
};

/* ================= COMPONENT ================= */

export default function DetailsPage() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const id = query.get("id");

  const cardRef = useRef(null);
  // const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);

  /* ---------- FETCH DATA BY ID ---------- */

  useEffect(() => {
    if (!id) return;

    (async () => {
      const { data, error } = await supabase
        .from("forms")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Invalid QR");
        return;
      }

      setData(data);
    })();
  }, [id]);

  if (!data) return null;

  /* ---------- SCROLL ---------- */

  const scrollToTop = () => {
    cardRef.current.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        {/* -------- HEADER -------- */}
        <div style={{ textAlign: "center" }}>
          <img src={logo} alt="logo" style={{ width: 120 }} />

          <h2 style={{ color: "#0078d7", fontWeight: 700 }}>
            <img src={certificate} alt="" width={40} /> प्रमाणपत्र (दाखला)
            सत्यापन
          </h2>

          <p>
            ग्रामपंचायत - {data.gram_panchayat}, तालुका - {data.taluka}, जिल्हा
            - {data.district}
          </p>
        </div>

        {/* -------- BODY -------- */}
        <div
          style={{ border: "1px solid #ccc", padding: "1rem", marginTop: 16 }}
        >
          <p>
            दाखला क्रमांक - <strong>{toMarathiDigits(data.entry_no)}</strong>
          </p>
          <p>
            दाखल्याचे नाव - <strong>{data.entry_name}</strong>
          </p>
          <p>
            दाखला मागणी केलेल्या व्यक्तीचे नाव -{" "}
            <strong>{data.applicant_name}</strong>
          </p>
          <p>
            ग्रामसेवकांचे नाव - <strong>{data.gramsevak_name}</strong>
          </p>
          <p>
            दाखला वितरण दिनांक -{" "}
            <strong>{formatDateToMarathi(data.issue_date)}</strong>
          </p>
        </div>

        <p style={{ marginTop: 20, textAlign: "center", fontSize: 14 }}>
          * वरील दाखला ग्रामपंचायत {data.gram_panchayat}, तालुका - {data.taluka}
          , जिल्हा - {data.district} यांचे वतीने वितरित केलेला आहे.
        </p>

        <button onClick={scrollToTop} className="back-button">
          Back
        </button>
      </div>
    </div>
  );
}
