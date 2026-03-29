import React from "react";
import "./Terms.css";

const TermsConditions = () => {
  return (
    <div className="policy-page">

      {/* 🔝 HERO */}
      <div className="policy-hero">
        <h1>Terms & Conditions</h1>
        <p>Please read these terms carefully before using our website</p>
      </div>

      {/* 📄 CONTENT */}
      <div className="policy-container">

        <div className="policy-card">
          <h3>📜 Use of Website</h3>
          <p>
            By accessing and using this website, you agree to comply with all
            applicable laws and these terms. Any misuse of the website is strictly prohibited.
          </p>
        </div>

        <div className="policy-card">
          <h3>🛍️ Product Information</h3>
          <p>
            We strive to ensure all product details are accurate. However,
            slight variations in packaging or appearance may occur.
          </p>
        </div>

        <div className="policy-card">
          <h3>💳 Pricing & Payments</h3>
          <p>
            All prices are listed in INR. We reserve the right to modify pricing
            without prior notice. Payments must be completed at checkout unless
            opting for Cash on Delivery.
          </p>
        </div>

        <div className="policy-card">
          <h3>📦 Order Acceptance</h3>
          <p>
            We reserve the right to cancel or refuse any order due to stock
            issues, incorrect pricing, or suspicious activity.
          </p>
        </div>

        <div className="policy-card">
          <h3>⚠️ Limitation of Liability</h3>
          <p>
            We are not responsible for any indirect or incidental damages
            resulting from the use of our products or website.
          </p>
        </div>

        <div className="policy-card">
          <h3>🔄 Changes to Terms</h3>
          <p>
            We may update these terms at any time. Continued use of the website
            means you accept the updated terms.
          </p>
        </div>

        <div className="policy-card">
          <h3>📧 Contact Us</h3>
          <p>
            For any questions regarding these terms, contact us at
            <b> support@vaidya.co</b>
          </p>
        </div>

      </div>

    </div>
  );
};

export default TermsConditions;