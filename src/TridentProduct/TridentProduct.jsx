import React from "react";
import { Link } from "react-router-dom";

import "./TridentProduct.css";
import Header from "../Header/Header";
import toothImage from "../Image/tooth.PNG";
import OrderBox from "../OrderBox/OrderBox";
import TridentReviewSection from "../TridentReviewSection/TridentReviewSection";
const TridentProduct = () => {
  return (
    <>
      {/* HEADER GOES HERE — ABOVE THE PRODUCT SECTION */}
      <Header />

      <section id="trident-product" className="hero trident-hero">


  {/* BACKGROUND PARTICLES */}
  <div className="particles">
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

  {/* PRODUCT SECTION */}
  <div className="hero-container trident-container">

    {/* PRODUCT IMAGE */}
    <div className="hero-image trident-image">
      <img
        src={toothImage}
        alt="Trident Natural Tooth Lotion"
      />

     <Link
  to="/details-tooth"
  className="learn-more-link"
>
  <button type="button" className="learn-more">
    🌿 ਫਾਇਦੇ ਵੇਖੋ <span className="arrow">→</span>
  </button>
</Link>
    </div>

    {/* PRODUCT DETAILS AND ORDER BOX */}
    <div className="hero-card trident-card">

      <h1>
        Trident Natural Tooth Lotion
        <br />
        <span>(ਦੰਦਾਂ ਲਈ ਆਯੁਰਵੇਦਿਕ ਲੋਸ਼ਨ)</span>
      </h1>

      <div className="hero-benefits trident-benefits">
        <p>🦷 Daily Oral Care (ਰੋਜ਼ਾਨਾ ਦੰਦਾਂ ਦੀ ਦੇਖਭਾਲ)</p>

        <p>🌿 Ayurvedic-Inspired Care (ਆਯੁਰਵੇਦਿਕ ਦੇਖਭਾਲ)</p>

        <p>✨ Easy to Use (ਵਰਤਣ ਵਿੱਚ ਆਸਾਨ)</p>
      </div>

      {/* EXISTING REUSABLE ORDER BOX */}
      <OrderBox
        productName="Trident Natural Tooth Lotion"
        pricePerPack={499}
        boxesPerPack={2}
        minPacks={1}
        heading="Buy More & Save More"
      />

    </div>
  </div>
  
</section>
<TridentReviewSection />
</>

);
};

export default TridentProduct;
