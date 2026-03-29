import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import checkoutAnim from "../assets/shoppingCart.json";
import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const { productName, quantity } = location.state || {};

  const [qty, setQty] = useState(quantity || 1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handlePlaceOrder = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      navigate("/auth");
      return;
    }

    if (!name || !phone || !address) {
      alert("Please fill all details ❌");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/order/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productName,
          quantity: qty,
          address,
          phone,
          payment: "COD"
        })
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/success");
      } else {
        alert(data.message || "Order failed ❌");
      }

    } catch (err) {
      alert("Order failed ❌");
    }
  };

  const getTotal = () => {
    if (qty === 1) return 299;
    if (qty === 2) return 499;
    return qty * 299;
  };

  return (
    <div className="checkout">

      {/* ✨ PARTICLES */}
      <div className="particles">
  {Array.from({ length: 40 }).map((_, i) => (
    <span
      key={i}
      style={{
        "--i": Math.random(),
        "--j": Math.random(),
      }}
    ></span>
  ))}
</div>

      <div className="checkout-bg"></div>

      <div className="checkout-wrapper">

        {/* 🎬 LOTTIE */}
        <div className="checkout-animation">
          <Lottie animationData={checkoutAnim} loop />
        </div>

        {/* 💎 MAIN CARD */}
        <div className="checkout-card">

          <h1>Secure Checkout 🧾</h1>

          <div className="checkout-product">
            <h3>{productName || "No product selected"}</h3>

            <div className="checkout-qty">
              <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          <div className="checkout-input">
            <input onChange={(e) => setName(e.target.value)} required />
            <label>Full Name</label>
          </div>

          <div className="checkout-input">
            <input onChange={(e) => setPhone(e.target.value)} required />
            <label>Phone Number</label>
          </div>

          <div className="checkout-input">
            <textarea onChange={(e) => setAddress(e.target.value)} required />
            <label>Full Address</label>
          </div>

          <div className="checkout-payment">
            <h3>Payment Method</h3>
            <div className="checkout-cod">
              <span>Cash on Delivery</span>
            </div>
          </div>

          <button className="place-order" onClick={handlePlaceOrder}>
            🚀 Place Order
          </button>
        </div>

        {/* 🧾 SUMMARY */}
        <div className="floating-summary">
          <h2>Order Summary</h2>

          <div className="summary-item">
            <span>Product</span>
            <span>{productName}</span>
          </div>

          <div className="summary-item">
            <span>Qty</span>
            <span>{qty}</span>
          </div>

          <div className="summary-item total">
            <span>Total</span>
            <span>₹ {getTotal()}</span>
          </div>
        </div>

      </div>
    </div>
  );
}