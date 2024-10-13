"use client"; 

import React from "react";

const RegistrationSuccessPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Payment Successful!</h1>
      <p>Thank you for your payment. Your registration is now complete.</p>
      <a href="/" style={{ padding: "10px 20px", marginTop: "20px", display: "inline-block", backgroundColor: "#0070f3", color: "#fff", textDecoration: "none", borderRadius: "5px" }}>
        Go to Home Page
      </a>
    </div>
  );
};

export default RegistrationSuccessPage;
