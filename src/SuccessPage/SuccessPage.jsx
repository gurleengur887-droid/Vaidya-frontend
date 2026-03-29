import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import successAnim from "../assets/cartcheckout.json"; // 👈 your animation file
import "./Success.css";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="success-page">

      {/* 🌌 BACKGROUND */}
      <div className="success-bg"></div>

      {/* ✨ PARTICLES */}
      <div className="particles">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      {/* 💎 CARD */}
      <div className="success-card">

        {/* 🎬 LOTTIE */}
        <Lottie animationData={successAnim} loop={false} className="success-lottie" />

        <h1>Order Placed Successfully 🎉</h1>

        <p>Your order will reach you in 2–3 days 🚚</p>

        {/* BUTTONS */}
        <div className="success-actions">
          <button onClick={() => navigate("/")}>
            🏠 Go Home
          </button>

          <button onClick={() => navigate("/")}>
            🛒 Order Again
          </button>
        </div>

      </div>
    </div>
  );
}