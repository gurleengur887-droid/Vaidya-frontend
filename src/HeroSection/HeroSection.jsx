import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import "./Hero.css";
import mylogo from "../Image/mylogo.PNG";
import product1 from "../Image/product1.PNG";
import tooth from "../Image/tooth.PNG";
const HeroSection = () => {
const [selected, setSelected] = useState(1);
const [selected2, setSelected2] = useState(1);
const [email, setEmail] = useState("")
const navigate = useNavigate();
const handleOrder = async (productName, quantity) => {
  navigate("/checkout", {
    state: { productName, quantity }
  });
}
const handleSubscribe = async () => {
  if (!email) {
    alert("Enter email first ❌");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (res.ok) {
      alert("Subscribed successfully 🔥");
      setEmail("");
    } else {
      alert(data.message || "Failed ❌");
    }

  } catch (err) {
    console.log(err);
    alert("Something went wrong ❌");
  }
};

  return (
   <section id="home" className="hero">

      {/* ✨ PARTICLES */}
     <div className="particles">
  {Array.from({ length: 40 }).map((_, i) => {
    const style = {
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      animationDelay: Math.random() * 4 + "s",
      animationDuration: 2 + Math.random() * 3 + "s"
    };

    return <span key={i} style={style}></span>;
  })}
</div>
      {/* 🔝 NAVBAR */}
      <div className="hero-navbar">

        <img src={mylogo} alt="logo" className="logo"/>

        <input 
          type="text" 
          placeholder="Search products..." 
          className="search-bar"
        />

        <div className="nav-icons">
  <span className="nav-icon">🔍</span>
          
  <div onClick={() => navigate("/auth")} className="icon">
  👤
</div>
  
  
</div>

      </div>
      {/* 🔥 HERO INTRO SECTION */}
<div className="hero-intro">

  <h1>
    Pure Ayurvedic Care for Your Health 🌿
  </h1>

  <p>
    Trusted by thousands for natural relief & daily wellness
  </p>

  <div className="hero-tags">
    <span>🌿 100% Natural</span>
    <span>⚡ Fast Relief</span>
    <span>🔒 Safe & Trusted</span>
  </div>

</div>

      {/* MAIN */}
  
  <div id="eye-product" className="hero-container">
  
        {/* PRODUCT */}
        <div className="hero-image">
          <div className="glow"></div>
          <img src={product1} alt="product" />
          <Link to="/details-eye">
          <button className="learn-more">
            Learn More <span className="arrow">→</span>

          </button>
          </Link>
        </div>

        {/* CARD */}
        <div className="hero-card">
          <h1>
            Ayur Netra Eye Drops <br />
            <span>(ਅੱਖਾਂ ਲਈ ਆਯੁਰਵੇਦਿਕ ਬੂੰਦਾਂ)</span>
          </h1>

          <div className="hero-benefits">
           <p> 👁️ Eye Relief (ਅੱਖਾਂ ਨੂੰ ਆਰਾਮ)</p>
           <p>💧 Soothes Irritation (ਅੱਖਾਂ ਦੀ ਜਲਨ ਘਟਾਉਣ ਵਿੱਚ ਮਦਦ)</p>
           <p>🌿 100% Ayurvedic (100% ਆਯੁਰਵੇਦਿਕ)</p>
          </div>

      <div className="buy-section">

  <h3>Buy More & Save More</h3>

  {/* OPTION 1 */}
  <div 
    className={`buy-card ${selected === 1 ? "active" : ""}`}
    onClick={() => setSelected(1)}
  >
    <div className="left">
      <input type="radio" checked={selected === 1} readOnly />
      <div>
        <p className="title">Buy 1 Pack (1 ਡੱਬਾ)</p>
        <p className="save">Save ₹200</p>
      </div>
    </div>

    <div className="price">
      <span className="new">₹299</span>
      <span className="old">₹499</span>
    </div>
  </div>

  {/* OPTION 2 */}
  <div 
    className={`buy-card ${selected === 2 ? "active" : ""}`}
    onClick={() => setSelected(2)}
  >
    <div className="left">
      <input type="radio" checked={selected === 2} readOnly />
      <div>
        <p className="title">Buy 2 Pack (2 ਡੱਬੇ)</p>
        <p className="save">Save ₹400</p>
      </div>
    </div>

    <div className="price">
      <span className="new">₹499</span>
      <span className="old">₹899</span>
    </div>
  </div>

</div>
 <button 
  className="order-btn"
  onClick={() =>
    handleOrder(
      "Ayur Netra Eye Drops",
      selected === 1 ? 1 : 2
    )
  }
>
  🛒 Order Now – Cash on Delivery
</button>
          
        </div>
 
      </div>
     

{/* SECOND PRODUCT */}
<div id="tooth-product"  className="hero-container second-product">

  {/* IMAGE */}
  <div className="hero-image">
    <div className="glow"></div>
    <img src={tooth} alt="product2" />
    <Link to="/details-tooth">
    <button className="learn-more">
            Learn More <span className="arrow">→</span>

          </button>
          </Link>
  </div>

  {/* CARD */}
  <div className="hero-card">

    <h1>
      Trident Natural Tooth Lotion <br />
      <span>(ਦੰਦਾਂ ਦੀ ਦੇਖਭਾਲ ਲਈ ਆਯੁਰਵੇਦਿਕ ਲੋਸ਼ਨ)</span>
    </h1>

    <div className="hero-benefits">
      <p>🦷 Tooth Pain Relief (ਦੰਦਾਂ ਦੇ ਦਰਦ ਤੋਂ ਰਾਹਤ)</p>
      <p>🌿 Strengthens Gums (ਮਸੂੜਿਆਂ ਨੂੰ ਮਜ਼ਬੂਤ ਕਰੇ)</p>
      <p>✨ Fresh Breath (ਮੂੰਹ ਦੀ ਬਦਬੂ ਦੂਰ ਕਰੇ)</p>
    </div>

    {/* BUY SECTION (SEPARATE STATE NEEDED) */}
   <div className="buy-section">

  <h3>Buy More & Save More</h3>

  {/* OPTION 1 */}
  <div 
    className={`buy-card ${selected2 === 1 ? "active" : ""}`}
    onClick={() => setSelected2(1)}
  >
    <div className="left">
      <input type="radio" checked={selected2 === 1} readOnly />
      <div>
        <p className="title">Buy 1 Pack (1 ਡੱਬਾ)</p>
        <p className="save">Save ₹200</p>
      </div>
    </div>

    <div className="price">
      <span className="new">₹299</span>
      <span className="old">₹499</span>
    </div>
  </div>

  {/* OPTION 2 */}
  <div 
    className={`buy-card ${selected2 === 2 ? "active" : ""}`}
    onClick={() => setSelected2(2)}
  >
    <div className="left">
      <input type="radio" checked={selected2 === 2} readOnly />
      <div>
        <p className="title">Buy 2 Pack (2 ਡੱਬੇ)</p>
        <p className="save">Save ₹400</p>
      </div>
    </div>

    <div className="price">
      <span className="new">₹499</span>
      <span className="old">₹899</span>
    </div>
  </div>

</div>

   <button 
  className="order-btn"
  onClick={() =>
    handleOrder(
      "Trident Natural Tooth Lotion",
      selected2 === 1 ? 1 : 2
    )
  }
>
  🛒 Order Now – Cash on Delivery
</button>
    

  </div>
  

</div>
{/* 🔥 DELIVERY + TRUST SECTION */}
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
<footer id="footer" className="footer">

  <div className="footer-content">

    {/* LEFT */}
    <div className="footer-col">
      <h2>Vaidya Co.</h2>
      <p>Pure Ayurvedic Care for Everyday Wellness 🌿</p>

      <div className="socials">

  <a 
    href="https://instagram.com/vaidya.co" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <FaInstagram />
  </a>

  <a 
    href="/" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    <FaFacebookF />
  </a>

</div>
    </div>

    {/* QUICK LINKS */}
    <div className="footer-col">
      <h3>Quick Links</h3>
      <ul>
       <li>
  <a href="#home">Home</a>
</li>
       <li>
  <a href="#eye-product">Eye Drops</a>
</li>

<li>
  <a href="#tooth-product">Tooth Lotion</a>
</li>
        
      </ul>
    </div>

    {/* POLICIES */}
    <div className="footer-col">
      <h3>Policies</h3>
      <ul>
       <li>
  <Link to="/return">Return Policy</Link>
</li>
        <li>
        <Link to="/privacy">Privacy Policy</Link>
        </li>
        <li> <Link to="/terms">Terms & Conditions</Link> </li>
      </ul>
    </div>

    {/* SUBSCRIBE */}
    <div className="footer-col subscribe">
      <h3>Subscribe</h3>
      <p>Get exclusive offers & updates</p>

     <input 
  type="email" 
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<button onClick={handleSubscribe}>Sign up</button>
    </div>

  </div>

  <p className="footer-bottom-text">
    © 2026 Vaidya Co. All rights reserved.
  </p>

</footer>
    </section>
    
  );
};

export default HeroSection;