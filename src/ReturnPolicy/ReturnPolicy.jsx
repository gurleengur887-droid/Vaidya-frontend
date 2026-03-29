import React from "react";
import "./Return.css";

const ReturnPolicy = () => {
  return (
    <div className="policy-page">

      {/* 🔝 HERO */}
      <div className="policy-hero">
        <h1>Return Policy</h1>
        <p>Simple & transparent policies for your peace of mind</p>
      </div>

      {/* 📄 CONTENT */}
      <div className="policy-container">

        <div className="policy-card">
          <h3>📦 Returns & Eligibility</h3>
          <p>
            We offer a 7-day return policy from the date of delivery. Products must be unused,
            sealed, and in their original packaging to qualify for a return.
          </p>
        </div>

        <div className="policy-card">
          <h3>⚠️ Non-Returnable Items</h3>
          <p>
            Due to hygiene and safety reasons, opened or used Ayurvedic products
            cannot be returned.
          </p>
        </div>

        <div className="policy-card">
          <h3>💰 Refund Process</h3>
          <p>
            Once your return is approved, refunds will be processed within
            5–7 business days to your original payment method.
          </p>
        </div>

        <div className="policy-card">
          <h3>📸 Damaged or Wrong Product</h3>
          <p>
            If you receive a damaged or incorrect product, contact us within 48 hours
            with proper proof. We will arrange a replacement at no extra cost.
          </p>
        </div>

        <div className="policy-card">
          <h3>📧 Contact Support</h3>
          <p>
            For return requests, email us at <b>support@vaidya.co</b> with your order details.
          </p>
        </div>

      </div>

    </div>
  );
};

export default ReturnPolicy;