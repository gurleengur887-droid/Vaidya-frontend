import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";

import checkoutAnim from "../assets/shoppingCart.json";
import VaidyaNotification from "../VaidyaNotification/VaidyaNotification";

import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const { productName, quantity } = location.state || {};

  const [qty, setQty] = useState(quantity || 1);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "error",
  });

  /* =========================
     NOTIFICATION
  ========================= */

  const showNotification = (message, type = "error") => {
    setNotification({
      show: true,
      message,
      type,
    });
  };

  const closeNotification = () => {
    setNotification({
      show: false,
      message: "",
      type: "error",
    });
  };

  /* =========================
     PLACE ORDER
  ========================= */

  const handlePlaceOrder = async () => {
    if (!productName) {
      showNotification("No product has been selected.");
      return;
    }

    if (!name.trim() || !phone.trim() || !address.trim()) {
      showNotification(
        "Please fill in all your details before placing the order."
      );
      return;
    }

    if (phone.trim().length !== 10) {
      showNotification("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      setIsPlacingOrder(true);

      const res = await fetch(
      "https://vaidya-backend-0lhd.onrender.com/api/order/create",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: name.trim(),
            productName,
            quantity: qty,
            address: address.trim(),
            phone: phone.trim(),
            payment: "COD",
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        navigate("/success");
      } else {
        showNotification(
          data.message ||
            "We couldn't place your order. Please try again."
        );
      }
    } catch (err) {
      console.error("ORDER ERROR:", err);

      showNotification(
        "Unable to place your order. Please try again."
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  /* =========================
     TOTAL
  ========================= */

  const getTotal = () => {
    if (qty === 1) return 299;

    if (qty === 2) return 499;

    return qty * 299;
  };

  return (
    <div className="checkout">

      {/* =========================
          BACKGROUND PARTICLES
      ========================= */}

      <div className="particles">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            style={{
              "--i": Math.random(),
              "--j": Math.random(),
            }}
          />
        ))}
      </div>

      <div className="checkout-bg"></div>

      {/* =========================
          MAIN CHECKOUT WRAPPER
      ========================= */}

      <div className="checkout-wrapper">

        {/* =========================
            CART ANIMATION
            Hidden on mobile through CSS
        ========================= */}

        <div className="checkout-animation">
          <Lottie
            animationData={checkoutAnim}
            loop
          />
        </div>

        {/* =========================
            CHECKOUT FORM
        ========================= */}

        <div className="checkout-card">

          <h1>
            Secure Checkout 🧾
          </h1>

          {/* PRODUCT */}

          <div className="checkout-product">

            <h3>
              {productName || "No product selected"}
            </h3>

            {/* QUANTITY */}

            <div className="checkout-qty">

              <button
                type="button"
                onClick={() =>
                  setQty(qty > 1 ? qty - 1 : 1)
                }
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span>
                {qty}
              </span>

              <button
                type="button"
                onClick={() =>
                  setQty(qty + 1)
                }
                aria-label="Increase quantity"
              >
                +
              </button>

            </div>

          </div>


          {/* =========================
              FULL NAME
          ========================= */}

          <div className="checkout-input">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              autoComplete="name"
              required
            />

          </div>


          {/* =========================
              PHONE NUMBER
          ========================= */}

          <div className="checkout-input">

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 10);

                setPhone(value);
              }}
              inputMode="numeric"
              autoComplete="tel"
              maxLength="10"
              required
            />

          </div>


          {/* =========================
              ADDRESS
          ========================= */}

          <div className="checkout-input">

            <textarea
              placeholder="Full Address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              autoComplete="street-address"
              required
            />

          </div>


          {/* =========================
              PAYMENT METHOD
          ========================= */}

          <div className="checkout-payment">

            <h3>
              Payment Method
            </h3>

            <div className="checkout-cod">

              <span>
                Cash on Delivery
              </span>

            </div>

          </div>


          {/* =========================
              PLACE ORDER
          ========================= */}

          <button
            type="button"
            className="place-order"
            onClick={handlePlaceOrder}
            disabled={isPlacingOrder}
          >

            {isPlacingOrder
              ? "Placing Order..."
              : "🚀 Place Order"}

          </button>

        </div>


        {/* =========================
            ORDER SUMMARY
        ========================= */}

        <div className="floating-summary">

          <h2>
            Order Summary
          </h2>

          <div className="summary-item">

            <span>
              Product
            </span>

            <span>
              {productName || "—"}
            </span>

          </div>


          <div className="summary-item">

            <span>
              Qty
            </span>

            <span>
              {qty}
            </span>

          </div>


          <div className="summary-item total">

            <span>
              Total
            </span>

            <span>
              ₹ {getTotal()}
            </span>

          </div>

        </div>

      </div>


      {/* =========================
          VAIDYA NOTIFICATION
      ========================= */}

      <VaidyaNotification
        show={notification.show}
        message={notification.message}
        type={notification.type}
        onClose={closeNotification}
      />

    </div>
  );
}