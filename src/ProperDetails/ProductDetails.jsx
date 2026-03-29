import React from "react";
import videoBG from '../assets/video-eye.mp4';
import "./Details.css";

const ProductDetails = () => {
  return (
    <div className="product-page">

   
    

      <div className="product-layout">
       <div className="media-section">
  <div className="media-frame">
    <video controls className="media-video">
      <source src={videoBG} type="video/mp4" />
    </video>
  </div>
</div>
        {/* 🎥 LEFT */}
       
        

        {/* 🧾 RIGHT */}
        <div className="info-card">

          <h1>ਆਯੁਰ ਨੇਤ੍ਰ ਡ੍ਰਾਪਸ</h1>

          <p className="tagline">
            ਅੱਖਾਂ ਦੀ ਸੰਭਾਲ ਲਈ ਕੁਦਰਤੀ ਤੇ ਭਰੋਸੇਮੰਦ ਹੱਲ
          </p>

          {/* 🌿 FEATURES */}
          <div className="features">

            <div className="feature">
              👁️ ਅੱਖਾਂ ਨੂੰ ਆਰਾਮ ਦਿੰਦੀਆਂ ਹਨ ਅਤੇ ਥਕਾਵਟ ਘਟਾਉਂਦੀਆਂ ਹਨ
            </div>
            <div className="feature">
  🔧 ਵੈਲਡਿੰਗ ਦੇ ਕੰਮ ਕਾਰਨ ਹੋਈ ਅੱਖਾਂ ਦੀ ਸਮੱਸਿਆ ਨੂੰ ਘਟਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦੀਆਂ ਹਨ
</div>

            <div className="feature">
              💧 ਅੱਖਾਂ ਦੀ ਜਲਨ, ਲਾਲੀ ਅਤੇ ਖੁੱਜਲੀ ਘਟਾਉਣ ਵਿੱਚ ਮਦਦ ਕਰਦੀਆਂ ਹਨ
            </div>

            <div className="feature">
              💻 ਮੋਬਾਈਲ ਅਤੇ ਸਕਰੀਨ ਦੇ ਵੱਧ ਵਰਤੋਂ ਨਾਲ ਹੋਈ ਅੱਖਾਂ ਦੀ ਸਮੱਸਿਆ ਵਿੱਚ ਲਾਭਕਾਰੀ
            </div>

            <div className="feature">
              🌿 100% ਆਯੁਰਵੇਦਿਕ — ਕੋਈ ਸਾਈਡ ਇਫੈਕਟ ਨਹੀਂ
            </div>

            <div className="feature">
              ✨ ਰੋਜ਼ਾਨਾ ਵਰਤਣ ਲਈ ਸੁਰੱਖਿਅਤ ਅਤੇ ਉਚਿਤ
            </div>

          </div>

          {/* 📌 USAGE */}
          <div className="usage-box">
            <h3>ਵਰਤੋਂ ਦਾ ਤਰੀਕਾ</h3>
            <p>
              ਹਰ ਅੱਖ ਵਿੱਚ 1–2 ਬੂੰਦ ਦਿਨ ਵਿੱਚ 2 ਵਾਰ ਪਾਓ ਜਾਂ ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਅਨੁਸਾਰ ਵਰਤੋਂ ਕਰੋ।
            </p>
          </div>

          {/* 🛡️ TRUST BADGES */}
          <div className="trust-section">

            <div className="trust">🌿 100% ਕੁਦਰਤੀ</div>
            <div className="trust">🔒 ਸੁਰੱਖਿਅਤ ਵਰਤੋਂ</div>
            <div className="trust">✅ ਕੋਈ ਸਾਈਡ ਇਫੈਕਟ ਨਹੀਂ</div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;