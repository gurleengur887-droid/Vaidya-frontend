import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ added
import "./Stickybar.css";

const Stickybar = () => {
  const [hide, setHide] = useState(false);
  const navigate = useNavigate(); // ✅ added

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById("footer");

      if (!footer) return;

      const rect = footer.getBoundingClientRect();

      if (rect.top <= window.innerHeight) {
        setHide(true);
      } else {
        setHide(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ NEW LOGIC (ONLY THIS PART ADDED)
  const handleOrderClick = () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/auth", {
        state: {
          productName: "Ayur Netra Eye Drops",
          quantity: 1,
        },
      });
    } else {
      navigate("/checkout", {
        state: {
          productName: "Ayur Netra Eye Drops",
          quantity: 1,
        },
      });
    }
  };

  return (
  <div className={`sticky-wrapper ${hide ? "hide" : ""}`}>
      <div className="sticky-bar">

        {/* ORDER BUTTON */}
        <button className="sticky-order" onClick={handleOrderClick}>
          🟢 Order Now (ਹੁਣੇ ਆਰਡਰ ਕਰੋ)
        </button>

      </div>
    </div>
  );
};

export default Stickybar;