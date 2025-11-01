import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeDisplay = ({ qrUrl }) => {
  const qrRef = useRef(null);

  const downloadQR = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "form-qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }} ref={qrRef}>
      <h3>आपला QR कोड:</h3>
      <QRCodeCanvas id="qrCode" value={qrUrl} size={180} includeMargin />
      <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        स्कॅन करा आणि फॉर्म तपशील पहा
      </p>
      <button
        onClick={downloadQR}
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1.2rem",
          background: "#0078d7",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        QR Code Download
      </button>
    </div>
  );
};

export default QRCodeDisplay;
