import React from "react";
import { Link } from "react-router-dom";

import "./Hero.css";

import product1 from "../Image/product1.PNG";
import OrderBox from "../OrderBox/OrderBox";
import ReviewSection from "../ReviewSection/ReviewSection";
const HeroSection = () => {
return ( <section id="home" className="hero">
{/* ✨ PARTICLES */} <div className="particles">
{Array.from({ length: 40 }).map((_, i) => {
const style = {
top: Math.random() * 100 + "%",
left: Math.random() * 100 + "%",
animationDelay: Math.random() * 4 + "s",
animationDuration: 2 + Math.random() * 3 + "s",
};


      return <span key={i} style={style}></span>;
    })}
  </div>

  {/* 🔥 HERO INTRO SECTION */}
  <div className="hero-intro">
    <h1>Pure Ayurvedic Care for Your Health 🌿</h1>

    <p>
      Trusted by thousands for natural relief &amp; daily wellness
    </p>

    <div className="hero-tags">
      <span>🌿 100% Natural</span>
      <span>⚡ Fast Relief</span>
      <span>🔒 Safe &amp; Trusted</span>
    </div>
  </div>

  {/* 🌿 AYUR NETRA PRODUCT */}
  <div id="eye-product" className="hero-container">
    {/* PRODUCT IMAGE */}
    <div className="hero-image">
      <img src={product1} alt="Ayur Netra Eye Drops" />

      <Link to="/details-eye" className="learn-more-link">
        <button type="button" className="learn-more">
          🌿 ਫਾਇਦੇ ਵੇਖੋ <span className="arrow">→</span>
        </button>
      </Link>
    </div>

    {/* PRODUCT DETAILS AND ORDER BOX */}
    <div className="hero-card">
      <h1>
        Ayur Netra Eye Drops
        <br />
        <span>(ਅੱਖਾਂ ਲਈ ਆਯੁਰਵੇਦਿਕ ਬੂੰਦਾਂ)</span>
      </h1>

      <div className="hero-benefits">
        <p>👁️ Eye Relief (ਅੱਖਾਂ ਨੂੰ ਆਰਾਮ)</p>
        <p>
          💧 Soothes Irritation (ਅੱਖਾਂ ਦੀ ਜਲਨ ਘਟਾਉਣ ਵਿੱਚ ਮਦਦ)
        </p>
        <p>🌿 100% Ayurvedic (100% ਆਯੁਰਵੇਦਿਕ)</p>
      </div>

      {/* REUSABLE ORDER BOX */}
      <OrderBox
        productName="Ayur Netra Eye Drops"
        pricePerPack={499}
        boxesPerPack={2}
        minPacks={1}
        heading="Buy More & Save More"
      />
    </div>
  </div>
 <ReviewSection /> 
  {/* 🚚 DELIVERY AND TRUST SECTION */}
  <div className="delivery-section">
    <div className="timeline">
      <div className="timeline-step">
        <div className="circle">🛒</div>
        <h4>Today</h4>
        <p>Order Placed</p>
      </div>

      <div className="timeline-line"></div>

      <div className="timeline-step">
        <div className="circle">📦</div>
        <h4>Tomorrow</h4>
        <p>Order Ready</p>
      </div>

      <div className="timeline-line"></div>

      <div className="timeline-step">
        <div className="circle">🚚</div>
        <h4>2–3 Days</h4>
        <p>Delivered</p>
      </div>
    </div>

    <div className="trust-section">
      <div className="trust-card">🚚 Free Shipping</div>
      <div className="trust-card">✅ Trusted Quality</div>
      <div className="trust-card">🔒 Secure Ordering</div>
      <div className="trust-card">↩ Easy Returns</div>
    </div>
  </div>
  
</section>


);
};

export default HeroSection;
