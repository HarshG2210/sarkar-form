import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeDisplay = ({ qrUrl }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h3>आपला QR कोड:</h3>
      <QRCodeCanvas value={qrUrl} size={180} />
      <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
        स्कॅन करा आणि फॉर्म तपशील पहा
      </p>
    </div>
  );
};

export default QRCodeDisplay;
