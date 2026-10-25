import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderBox.css";

const OrderBox = ({
productName,
pricePerPack,
boxesPerPack = 2,
minPacks = 1,
heading = "Buy More & Save More",
currency = "₹",
}) => {
const navigate = useNavigate();
const [packs, setPacks] = useState(minPacks);

const totalPrice = packs * pricePerPack;

const handleOrder = () => {
navigate("/checkout", {
state: {
productName,
quantity: packs * boxesPerPack,
packs,
boxesPerPack,
pricePerPack,
price: totalPrice,
},
});
};

return ( <div className="reusable-order-box"> <h3 className="order-box-heading">{heading}</h3>


  <div className="order-box-pack">
    <div className="order-box-pack-info">
      <span className="order-box-small-label">
        Pack Size (ਪੈਕ ਵਿੱਚ)
      </span>

      <strong>
        {boxesPerPack} Boxes ({boxesPerPack} ਡੱਬੀਆਂ)
      </strong>

      <span className="order-box-subtitle">
        {productName}
      </span>
    </div>

    <div className="order-box-pack-price">
      <span className="order-box-small-label">
        Price (ਕੀਮਤ)
      </span>

      <strong>
        {currency}{pricePerPack.toLocaleString("en-IN")}
      </strong>
    </div>
  </div>

  <div className="order-box-quantity-row">
    <div>
      <span className="order-box-quantity-title">
        Select Pack (ਪੈਕ ਚੁਣੋ)
      </span>

      <p className="order-box-quantity-subtitle">
        Choose your order
      </p>
    </div>

    <div className="order-box-counter">
      <button
        type="button"
        className="order-box-counter-btn"
        onClick={() =>
          setPacks((current) =>
            Math.max(minPacks, current - 1)
          )
        }
        disabled={packs <= minPacks}
        aria-label="Decrease packs"
      >
        −
      </button>

      <span className="order-box-count" aria-live="polite">
        {packs}
      </span>

      <button
        type="button"
        className="order-box-counter-btn"
        onClick={() => setPacks((current) => current + 1)}
        aria-label="Increase packs"
      >
        +
      </button>
    </div>
  </div>

  <div className="order-box-summary">
    <div className="order-box-summary-row order-box-grand-total">
      <span>
        Total Price (ਕੁੱਲ ਕੀਮਤ)
      </span>

      <strong>
        {currency}{totalPrice.toLocaleString("en-IN")}
      </strong>
    </div>
  </div>

  <button
    type="button"
    className="order-box-button"
    onClick={handleOrder}
  >
    🛒 Order Now (ਹੁਣੇ ਆਰਡਰ ਕਰੋ)
  </button>

  <p className="order-box-trust">
    🌿 Natural Care, Delivered to Your Doorstep
    <br />
    ਘਰ ਬੈਠੇ ਮੰਗਵਾਓ, ਪੈਸੇ ਸਮਾਨ ਮਿਲਣ 'ਤੇ ਦਿਓ
  </p>
</div>


);
};

export default OrderBox;
