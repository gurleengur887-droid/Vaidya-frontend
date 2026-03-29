import React from "react";
import "./Tooth.css";

const ToothProduct = () => {
  return (
    <div className="tooth-page">

      {/* 🌿 BACKGROUND GLOW */}
      <div className="bg-glow"></div>

      <div className="tooth-container">

        {/* 🎥 VIDEO */}
        <div className="tooth-video">
          <div className="video-box">
            🎥 ਵੀਡੀਓ ਇੱਥੇ ਆਵੇਗੀ
          </div>
        </div>

        {/* 📦 CARD */}
        <div className="tooth-card">

          <h1>
            ਨੈਚਰਲ ਟੂਥ ਲੋਸ਼ਨ <br />
            <span>(ਦੰਦਾਂ ਲਈ ਆਯੁਰਵੇਦਿਕ ਲੋਸ਼ਨ)</span>
          </h1>

          <div className="features">

            <div className="feature">🦷 ਦੰਦਾਂ ਦੇ ਦਰਦ ਤੋਂ ਰਾਹਤ ਦਿੰਦਾ ਹੈ</div>
            <div className="feature">🌿 ਮਸੂੜਿਆਂ ਨੂੰ ਮਜ਼ਬੂਤ ਬਣਾਉਂਦਾ ਹੈ</div>
            <div className="feature">✨ ਮੂੰਹ ਦੀ ਬਦਬੂ ਦੂਰ ਕਰਦਾ ਹੈ</div>
            <div className="feature">💧 ਪਾਇਰੀਆ ਅਤੇ ਸੁੱਜਣ ਘਟਾਉਂਦਾ ਹੈ</div>
            <div className="feature">🛡️ 100% ਆਯੁਰਵੇਦਿਕ – ਕੋਈ ਸਾਈਡ ਇਫੈਕਟ ਨਹੀਂ</div>

          </div>
          <div className="usage">
            <h3>ਵਰਤੋਂ ਦਾ ਤਰੀਕਾ</h3>
  <p>ਰੋਜ਼ਾਨਾ ਸਵੇਰੇ ਅਤੇ ਰਾਤ ਦੰਦ ਸਾਫ਼ ਕਰਨ ਤੋਂ ਬਾਅਦ ਮਸੂੜਿਆਂ ‘ਤੇ ਲਗਾਓ ਅਤੇ ਹੌਲੀ ਮਸਾਜ ਕਰੋ।</p>
</div>

          {/* 🔥 TRUST */}
          <div className="trust">
            <span>🚚 ਮੁਫ਼ਤ ਡਿਲੀਵਰੀ</span>
            <span>✔️ ਭਰੋਸੇਯੋਗ</span>
            <span>🔒 ਸੁਰੱਖਿਅਤ</span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default ToothProduct;