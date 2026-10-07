import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

import "./Footer.css";

export default function Footer() {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubscribe = async () => {

    if (!email.trim()) {
      alert("Vaidya Co.: Please enter your email.");
      return;
    }

    try {

      const res = await fetch(
        "http://localhost:5000/api/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        }
      );

      const data = await res.json();

      if (res.ok) {

        alert("Vaidya Co.: Subscribed successfully 🌿");

        setEmail("");

      } else {

        alert(
          data.message ||
          "Vaidya Co.: Subscription failed."
        );

      }

    } catch (error) {

      console.log("SUBSCRIBE ERROR:", error);

      alert(
        "Vaidya Co.: Something went wrong. Please try again."
      );

    }
  };


  return (
    <footer className="site-footer">

      <div className="site-footer-content">

        {/* =========================
            BRAND
        ========================= */}

        <div className="site-footer-column brand-column">

          <div
            className="footer-brand"
            onClick={() => navigate("/")}
          >
            Vaidya Co.
          </div>

          <p>
            Pure Ayurvedic Care for Everyday Wellness 🌿
          </p>

          <div className="footer-socials">

            <a
              href="https://instagram.com/vaidya.co"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>

           <span
  className="footer-social-link"
  aria-label="Facebook"
>
  <FaFacebookF />
</span>

          </div>

        </div>


        {/* =========================
            QUICK LINKS
        ========================= */}

        <div className="site-footer-column">

          <h3>Quick Links</h3>

          <ul>

            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <a href="/#eye-product">
                Eye Drops
              </a>
            </li>

            <li>
              <a href="/#tooth-product">
                Tooth Lotion
              </a>
            </li>

          </ul>

        </div>


        {/* =========================
            POLICIES
        ========================= */}

        <div className="site-footer-column">

          <h3>Policies</h3>

          <ul>

            <li>
              <Link to="/return">
                Return Policy
              </Link>
            </li>

            <li>
              <Link to="/privacy">
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link to="/terms">
                Terms & Conditions
              </Link>
            </li>

          </ul>

        </div>


        {/* =========================
            SUBSCRIBE
        ========================= */}

        <div className="site-footer-column subscribe-column">

          <h3>Subscribe</h3>

          <p>
            Get exclusive offers & updates
          </p>

          <div className="footer-subscribe">

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <button onClick={handleSubscribe}>
              Sign up
            </button>

          </div>

        </div>

      </div>


      <div className="footer-bottom">

        <p>
          © 2026 Vaidya Co. All rights reserved.
        </p>

      </div>

    </footer>
  );
}