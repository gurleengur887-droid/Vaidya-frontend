import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";

import checkoutAnim from "../assets/shoppingCart.json";
import VaidyaNotification from "../VaidyaNotification/VaidyaNotification";

import "./Checkout.css";

const initialAddress = {
  houseNumber: "",
  street: "",
  area: "",
  landmark: "",
  pincode: "",
  city: "",
  state: "",
};

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

const {
  productName,
  quantity,
  packs: initialPacks,
  boxesPerPack: stateBoxesPerPack,
  pricePerPack: statePricePerPack,
} = location.state || {};

const boxesPerPack =
  Number(stateBoxesPerPack) > 0 ? Number(stateBoxesPerPack) : 2;

const pricePerPack =
  Number(statePricePerPack) > 0 ? Number(statePricePerPack) : 499;

// The counter tracks PACKS, not individual boxes.
const [qty, setQty] = useState(
  Number(initialPacks) > 0
    ? Number(initialPacks)
    : quantity
      ? Math.max(1, Math.ceil(Number(quantity) / boxesPerPack))
      : 1
);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(initialAddress);

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isLookingUpPin, setIsLookingUpPin] = useState(false);
  const [pinMessage, setPinMessage] = useState("");

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "error",
  });

  // ========================================
  // CUSTOM NOTIFICATION
  // ========================================

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

  // ========================================
  // ADDRESS FIELD HANDLER
  // ========================================

  const handleAddressChange = (field, value) => {
    setAddress((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (field === "pincode") {
      setPinMessage("");
    }
  };

  // ========================================
  // AUTOMATIC INDIAN PIN CODE LOOKUP
  // ========================================

  useEffect(() => {
    const pincode = address.pincode;

    if (!/^\d{6}$/.test(pincode)) {
      setIsLookingUpPin(false);
      setPinMessage("");
      return;
    }

    let cancelled = false;

    const timer = setTimeout(async () => {
      setIsLookingUpPin(true);
      setPinMessage("Finding your city and state...");

      try {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${pincode}`
        );

        if (!response.ok) {
          throw new Error("PIN lookup service unavailable");
        }

        const data = await response.json();

        if (cancelled) return;

        const result = data?.[0];

        if (
          result?.Status !== "Success" ||
          !Array.isArray(result.PostOffice) ||
          result.PostOffice.length === 0
        ) {
          setPinMessage(
            "PIN code not found. Please check it or enter your city and state manually."
          );

          return;
        }

        // A PIN code can cover multiple post offices.
        // Use the first result for the initial district/state values.
        const postOffice = result.PostOffice[0];

        setAddress((previous) => {
          // Do not overwrite the PIN if the user has already changed it.
          if (previous.pincode !== pincode) {
            return previous;
          }

          return {
            ...previous,
            city: postOffice.District || previous.city,
            state: postOffice.State || previous.state,
          };
        });

        setPinMessage(
          `Location found: ${postOffice.District}, ${postOffice.State}. Please verify your details.`
        );
      } catch (error) {
        if (!cancelled) {
          console.error("PIN CODE LOOKUP ERROR:", error);

          setPinMessage(
            "We couldn't look up this PIN code. You can enter your city and state manually."
          );
        }
      } finally {
        if (!cancelled) {
          setIsLookingUpPin(false);
        }
      }
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [address.pincode]);

  // ========================================
  // ORDER TOTAL
  // ========================================

 const getTotal = () => {
  return qty * pricePerPack;
};
  // ========================================
  // PLACE ORDER
  // ========================================

  const handlePlaceOrder = async () => {
    if (!productName) {
      showNotification("No product has been selected.");
      return;
    }

    if (!name.trim()) {
      showNotification("Please enter your full name.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      showNotification("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!address.houseNumber.trim()) {
      showNotification("Please enter your house, flat, or building number.");
      return;
    }

    if (!address.street.trim()) {
      showNotification("Please enter your street or road.");
      return;
    }

    if (!address.area.trim()) {
      showNotification("Please enter your area or locality.");
      return;
    }

    if (!/^\d{6}$/.test(address.pincode)) {
      showNotification("Please enter a valid 6-digit PIN code.");
      return;
    }

    if (!address.city.trim()) {
      showNotification("Please enter your city or district.");
      return;
    }

    if (!address.state.trim()) {
      showNotification("Please enter your state.");
      return;
    }

    if (isPlacingOrder) return;

    try {
      setIsPlacingOrder(true);

      const orderPayload = {
        name: name.trim(),
        productName,
        quantity: qty * boxesPerPack,
packs: qty,
boxesPerPack,
price: getTotal(),
        phone,
        address: {
          houseNumber: address.houseNumber.trim(),
          street: address.street.trim(),
          area: address.area.trim(),
          landmark: address.landmark.trim(),
          pincode: address.pincode,
          city: address.city.trim(),
          state: address.state.trim(),
        },
        payment: "COD",
      };

      const response = await fetch(
        "https://vaidya-backend-0lhd.onrender.com/api/order/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderPayload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showNotification(
          data.message ||
            "We couldn't place your order. Please try again."
        );

        return;
      }

      navigate("/success");
    } catch (error) {
      console.error("ORDER ERROR:", error);

      showNotification(
        "Unable to place your order. Please check your connection and try again."
      );
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // ========================================
  // UI
  // ========================================

  return (
    <div className="checkout">
      {/* Background */}

      <div className="particles">
        {Array.from({ length: 40 }).map((_, index) => (
          <span
            key={index}
            style={{
              "--i": Math.random(),
              "--j": Math.random(),
            }}
          />
        ))}
      </div>

      <div className="checkout-bg" />

      {/* Main layout */}

      <div className="checkout-wrapper">
        {/* Cart animation */}

        <div className="checkout-animation">
          <Lottie animationData={checkoutAnim} loop />
        </div>

        {/* Checkout form */}

        <div className="checkout-card">
          <h1>Secure Checkout 🧾</h1>

          {/* Product */}

          <div className="checkout-product">
            <h3>{productName || "No product selected"}</h3>

          <div className="checkout-qty">
  <button
    type="button"
    onClick={() => setQty((current) => Math.max(1, current - 1))}
    disabled={qty <= 1}
    aria-label="Decrease packs"
  >
    −
  </button>

  <span>{qty}</span>

  <button
    type="button"
    onClick={() => setQty((current) => current + 1)}
    aria-label="Increase packs"
  >
    +
  </button>
</div>
          </div>

          {/* Customer details */}

          <div className="checkout-section">
            <h2 className="checkout-section-title">
              Customer Details
            </h2>

            <div className="checkout-input">
              <label htmlFor="customer-name">Full Name *</label>

              <input
                id="customer-name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
                maxLength={100}
                required
              />
            </div>

            <div className="checkout-input">
              <label htmlFor="customer-phone">Phone Number *</label>

              <input
                id="customer-phone"
                type="tel"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(event) => {
                  setPhone(
                    event.target.value.replace(/\D/g, "").slice(0, 10)
                  );
                }}
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                required
              />

              <small className="checkout-field-help">
                Enter the number where the delivery person can reach you.
              </small>
            </div>
          </div>

          {/* Delivery address */}

          <div className="checkout-section">
            <h2 className="checkout-section-title">
              Delivery Address 📦
            </h2>

            <p className="checkout-section-description">
              Enter your complete address so we can deliver your order
              without difficulty.
            </p>

            {/* House / flat */}

            <div className="checkout-input">
              <label htmlFor="house-number">
                House / Flat / Building No. *
              </label>

              <input
                id="house-number"
                type="text"
                placeholder="e.g. House 124, Flat 302"
                value={address.houseNumber}
                onChange={(event) =>
                  handleAddressChange("houseNumber", event.target.value)
                }
                autoComplete="address-line1"
                maxLength={150}
                required
              />
            </div>

            {/* Street */}

            <div className="checkout-input">
              <label htmlFor="street">Street / Road *</label>

              <input
                id="street"
                type="text"
                placeholder="Enter street or road name"
                value={address.street}
                onChange={(event) =>
                  handleAddressChange("street", event.target.value)
                }
                autoComplete="address-line2"
                maxLength={150}
                required
              />
            </div>

            {/* Area */}

            <div className="checkout-input">
              <label htmlFor="area">Area / Locality *</label>

              <input
                id="area"
                type="text"
                placeholder="e.g. Model Town"
                value={address.area}
                onChange={(event) =>
                  handleAddressChange("area", event.target.value)
                }
                maxLength={150}
                required
              />
            </div>

            {/* Landmark */}

            <div className="checkout-input">
              <label htmlFor="landmark">
                Landmark <span>(Optional)</span>
              </label>

              <input
                id="landmark"
                type="text"
                placeholder="e.g. Near the main market"
                value={address.landmark}
                onChange={(event) =>
                  handleAddressChange("landmark", event.target.value)
                }
                maxLength={150}
              />
            </div>

            {/* PIN code */}

            <div className="checkout-input">
              <label htmlFor="pincode">PIN Code *</label>

              <input
                id="pincode"
                type="text"
                placeholder="Enter 6-digit PIN code"
                value={address.pincode}
                onChange={(event) => {
                  const value = event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6);

                  handleAddressChange("pincode", value);
                }}
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={6}
                required
                aria-describedby="pincode-status"
              />

              <div
                id="pincode-status"
                className={`pin-message ${
                  isLookingUpPin ? "pin-message-loading" : ""
                }`}
                aria-live="polite"
              >
                {isLookingUpPin
                  ? "Finding your city and state..."
                  : pinMessage}
              </div>
            </div>

            {/* City / district */}

            <div className="checkout-input">
              <label htmlFor="city">City / District *</label>

              <input
                id="city"
                type="text"
                placeholder="City or district"
                value={address.city}
                onChange={(event) =>
                  handleAddressChange("city", event.target.value)
                }
                autoComplete="address-level2"
                maxLength={100}
                required
              />
            </div>

            {/* State */}

            <div className="checkout-input">
              <label htmlFor="state">State *</label>

              <input
                id="state"
                type="text"
                placeholder="State"
                value={address.state}
                onChange={(event) =>
                  handleAddressChange("state", event.target.value)
                }
                autoComplete="address-level1"
                maxLength={100}
                required
              />
            </div>
          </div>

          {/* Payment */}

          <div className="checkout-payment">
            <h3>Payment Method</h3>

            <div className="checkout-cod">
              <span className="cod-icon">✓</span>

              <div>
                <strong>Cash on Delivery</strong>
                <small>Pay when your order arrives.</small>
              </div>
            </div>
          </div>

          {/* Place order */}

          <button
            type="button"
            className="place-order"
            onClick={handlePlaceOrder}
            disabled={isPlacingOrder}
          >
            {isPlacingOrder
              ? "Placing Order..."
              : `🚀 Place Order · ₹${getTotal()}`}
          </button>

          <p className="checkout-secure-note">
            🌿 Thank you for choosing Vaidya Co.
          </p>
        </div>

        {/* Order summary */}

        <div className="floating-summary">
          <h2>Order Summary</h2>

          <div className="summary-item">
            <span>Product</span>
            <span>{productName || "—"}</span>
          </div>

          <div className="summary-item">
            <span>Quantity</span>
           <span>{qty} {qty === 1 ? "Pack" : "Packs"} ({qty * boxesPerPack} Boxes)</span>
          </div>

          <div className="summary-item">
            <span>Payment</span>
            <span>Cash on Delivery</span>
          </div>

          <div className="summary-item total">
            <span>Total</span>
            <span>₹ {getTotal()}</span>
          </div>
        </div>
      </div>

      {/* Custom Vaidya notification */}

      <VaidyaNotification
        show={notification.show}
        message={notification.message}
        type={notification.type}
        onClose={closeNotification}
      />
    </div>
  );
}