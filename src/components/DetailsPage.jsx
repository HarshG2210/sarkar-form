// src/components/DetailsPage.js (Fixed for mobile scroll)
import React, { useMemo, useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import certificate from "../assets/certificate.png";
import "./DetailsPage.css";
import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY || "gp-secret-key-123!";

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
  const parts = dateStr.split("-");
  if (parts.length < 3) return toMarathiDigits(dateStr);
  const [year, month, day] = parts;
  return `${toMarathiDigits(day)}-${toMarathiDigits(month)}-${toMarathiDigits(
    year
  )}`;
};

const decryptData = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    if (!plaintext) throw new Error("Empty plaintext after decryption");
    return JSON.parse(plaintext);
  } catch (err) {
    console.warn("Decryption failed", err);
    return null;
  }
};

const DetailsPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const SCROLL_THRESHOLD = 200;

  const decrypted = useMemo(() => {
    const encrypted =
      query.get("data") || query.get("Data") || query.get("encrypted");
    if (!encrypted) return null;
    try {
      return decryptData(decodeURIComponent(encrypted));
    } catch {
      return null;
    }
  }, [search]);

  const entryNo = decrypted?.entryNo ?? query.get("entryNo") ?? "----";
  const entryName = decrypted?.entryName ?? query.get("entryName") ?? "----";
  const applicantName =
    decrypted?.applicantName ?? query.get("applicantName") ?? "----";
  const gramsevakName =
    decrypted?.gramsevakName ?? query.get("gramsevakName") ?? "----";
  const issueDateRaw = decrypted?.issueDate ?? query.get("issueDate") ?? "";
  const gramPanchayat =
    decrypted?.gramPanchayat ?? query.get("gramPanchayat") ?? "----";
  const taluka = decrypted?.taluka ?? query.get("taluka") ?? "----";
  const district = decrypted?.district ?? query.get("district") ?? "----";

  const scrollToTop = () => {
    const el = cardRef.current;

    if (!el) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Force scroll to top with multiple fallback methods
    const forceScroll = () => {
      el.scrollTop = 0;
      el.scrollTo?.(0, 0);
      el.scrollTo?.({ top: 0, behavior: "smooth" });
    };

    // Immediate scroll
    forceScroll();

    // Delayed scroll for stubborn browsers
    setTimeout(forceScroll, 10);
    setTimeout(forceScroll, 50);

    // Also scroll window as backup
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const onScroll = () => {
      const scTop = el.scrollTop || 0;
      setVisible(scTop > SCROLL_THRESHOLD);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#0b2b52",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "1rem",
        fontFamily: `"Noto Sans Devanagari", "Segoe UI", Roboto, sans-serif`,
        overflow: "hidden",
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
          WebkitOverflowScrolling: "touch",
          position: "relative",
        }}
      >
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
              fontSize: "clamp(16px, 4vw, 24px)",
              fontWeight: 700,
              flexWrap: "wrap",
            }}
          >
            <img
              src={certificate}
              alt="certificate"
              style={{
                width: "clamp(32px, 8vw, 50px)",
                flexShrink: 0,
              }}
            />
            <span style={{ lineHeight: 1, minWidth: 0 }}>
              प्रमाणपत्र (दाखला) सत्यापन
            </span>
          </h2>

          <p style={{ fontSize: "15px" }}>
            ग्रामपंचायत - {gramPanchayat}, तालुका - {taluka}, जिल्हा -{" "}
            {district}
          </p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "1rem",
            lineHeight: "1.8",
            fontSize: "15px",
            marginTop: "1rem",
          }}
        >
          <p>
            दाखला क्रमांक -{" "}
            <strong>
              {entryNo !== "----" ? toMarathiDigits(entryNo) : "----"}
            </strong>
          </p>

          <p>
            दाखल्याचे नाव - <strong>{entryName}</strong>
          </p>

          <p>
            दाखला मागणी केलेल्या व्यक्तीचे नाव -{" "}
            <strong>{applicantName}</strong>
          </p>

          <p>
            ग्रामसेवकांचे नाव - <strong>{gramsevakName}</strong>
          </p>

          <p>
            दाखला वितरण दिनांक -{" "}
            <strong>
              {issueDateRaw ? formatDateToMarathi(issueDateRaw) : "----"}
            </strong>
          </p>
        </div>

        <p
          style={{
            fontSize: "14px",
            marginTop: "1.5rem",
            color: "#333",
            lineHeight: "1.6",
            textAlign: "center",
          }}
        >
          * वरील दाखला ग्रामपंचायत {gramPanchayat}, तालुका - {taluka}, जिल्हा -{" "}
          {district} यांचे वतीने वितरित केलेला आहे.
        </p>

        <div style={{ marginTop: "1rem", textAlign: "left" }}>
          <button className="back-button" title="back" onClick={scrollToTop}>
            Back
          </button>
        </div>

        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{
            display: visible ? "flex" : "none",
            position: "fixed",
            right: 20,
            bottom: 40,
            zIndex: 1200,
            padding: "10px 14px",
            borderRadius: 8,
            border: "none",
            background: "#0078d7",
            color: "#fff",
            boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 600,
            alignItems: "center",
            justifyContent: "center",
            touchAction: "manipulation",
          }}
        >
          ⬆️ Top
        </button>
      </div>
    </div>
  );
};

export default DetailsPage;
