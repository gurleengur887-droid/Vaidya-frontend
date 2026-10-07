import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

import mylogo from "../Image/mylogo.PNG";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="site-header">

      <div
        className="site-header-logo"
        onClick={() => navigate("/")}
      >
        <img src={mylogo} alt="Vaidya Co." />
      </div>

      <div className="site-header-search">
        <input
          type="text"
          placeholder="Search products..."
        />
        <span>⌕</span>
      </div>

      <div className="site-header-actions">

        <button
          className="header-icon"
          onClick={() => navigate("/")}
          aria-label="Home"
        >
          🏠
        </button>

        <button
          className="header-icon"
          onClick={() => navigate("/auth")}
          aria-label="Account"
        >
          👤
        </button>

      </div>

    </header>
  );
}