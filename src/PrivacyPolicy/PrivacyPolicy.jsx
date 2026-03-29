import React from "react";
import "./Privacy.css";

const PrivacyPolicy = () => {
  return (
    <div className="policy-page">

      {/* 🔝 HERO */}
      <div className="policy-hero">
        <h1>Privacy Policy</h1>
        <p>Your data is safe, secure, and respected</p>
      </div>

      {/* 📄 CONTENT */}
      <div className="policy-container">

        <div className="policy-card">
          <h3>📊 Information We Collect</h3>
          <p>
            We collect basic details such as your name, phone number, email,
            and address to process orders and improve your experience.
          </p>
        </div>

        <div className="policy-card">
          <h3>⚙️ How We Use Your Data</h3>
          <p>
            Your information is used for order processing, customer support,
            and improving our services. We do not sell or misuse your data.
          </p>
        </div>

        <div className="policy-card">
          <h3>🍪 Cookies</h3>
          <p>
            We use cookies to enhance your browsing experience and personalize
            content for better usability.
          </p>
        </div>

        <div className="policy-card">
          <h3>🔐 Data Security</h3>
          <p>
            We implement strong security measures to protect your personal
            information from unauthorized access or misuse.
          </p>
        </div>

        <div className="policy-card">
          <h3>👤 Your Rights</h3>
          <p>
            You have the right to access, update, or request deletion of your
            personal data at any time.
          </p>
        </div>

        <div className="policy-card">
          <h3>📧 Contact Us</h3>
          <p>
            For any privacy-related concerns, contact us at <b>support@vaidya.co</b>
          </p>
        </div>

      </div>

    </div>
  );
};

export default PrivacyPolicy;