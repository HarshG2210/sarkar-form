import React from "react";
import { useLocation } from "react-router-dom";

const DetailsPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  return (
    <div style={{ padding: "2rem", fontFamily: "Poppins, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#0078d7" }}>दाखला तपशील</h2>
      <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
        <p>
          <strong>दाखला क्रमांक:</strong> {query.get("entryNo")}
        </p>
        <p>
          <strong>दाखल्याचे नाव:</strong> {query.get("entryName")}
        </p>
        <p>
          <strong>व्यक्तीचे नाव:</strong> {query.get("applicantName")}
        </p>
        <p>
          <strong>ग्रामसेवकाचे नाव:</strong> {query.get("gramsevakName")}
        </p>
        <p>
          <strong>वितरण दिनांक:</strong> {query.get("issueDate")}
        </p>
      </div>
    </div>
  );
};

export default DetailsPage;
