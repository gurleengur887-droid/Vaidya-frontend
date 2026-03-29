import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import Tilt from "react-parallax-tilt";

import loginAnim from "../assets/Login Leady.json";
import signupAnim from "../assets/greeting animation for call to action.json";

import "./Auth.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ NEW STATES (ADDED)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ SIGNUP FUNCTION (ADDED)
const handleSignup = async () => {
  console.log("BUTTON CLICKED 🔥");
  console.log("SENDING:", { name, email, password });

  try {
    const res = await fetch("https://vaidya-backend-0lhd.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    console.log("RESPONSE:", data);

    if (res.ok) {
      alert("Signup successful 🔥");
    } else {
      alert(data.message || "Signup failed ❌");
    }

  } catch (err) {
    console.log(err);
    alert("Something went wrong ❌");
  }
};     

  // ✅ LOGIN FUNCTION (ADDED)
 const handleLogin = async () => {
  try {
    const res = await fetch("https://vaidya-backend-0lhd.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      // ✅ SAVE TOKEN
      localStorage.setItem("token", data.token);

      // ✅ OPTIONAL: SAVE USER
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("userId", data.user.id);

      alert("Login successful 🔥");
    } else {
      alert(data.message); // ❌ wrong password / user not found
    }

  } catch (err) {
    console.log(err);
    alert("Something went wrong ❌");
  }
};

  return (
    <div className="auth-container">

      {/* LEFT PANEL */}
      <div className="left-panel">
        <motion.div
          key={isLogin ? "loginAnim" : "signupAnim"}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Lottie
            animationData={isLogin ? loginAnim : signupAnim}
            loop
            className="lottie"
          />
        </motion.div>

        <h2>{isLogin ? "Welcome Back to Vaidya.Co 🌿" : "Welcome to Vaidya.Co 🌱"}</h2>
        <p>
          {isLogin
            ? "Pure Ayurvedic care for your wellness"
            : "Start your natural healing journey"}
        </p>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">

        <div className="stars">
          {Array.from({ length: 60 }).map((_, i) => (
            <span
              key={i}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            ></span>
          ))}
        </div>

        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable glareMaxOpacity={0.2}>
          <motion.div
            className="auth-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                >
                  <h2>Login</h2>

                  <div className="input-group">
                    <input
                      type="email"
                      placeholder=" "
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Email</label>
                  </div>

                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder=" "
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Password</label>
                    <span className="eye" onClick={() => setShowPassword(!showPassword)}>👁️</span>
                  </div>

                  <button className="btn" onClick={handleLogin}>Login</button>

                  <p className="switch">
                    Don’t have an account?{" "}
                    <span onClick={() => setIsLogin(false)}>Sign Up</span>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="signup"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                >
                  <h2>Sign Up</h2>

                  <div className="input-group">
                    <input
                      type="text"
                      placeholder=" "
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label>Name</label>
                  </div>

                  <div className="input-group">
                    <input
                      type="email"
                      placeholder=" "
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Email</label>
                  </div>

                  <div className="input-group">
                    <input
                      type="password"
                      placeholder=" "
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Password</label>
                  </div>

                  <button className="btn" onClick={handleSignup}>Create Account</button>

                  <p className="switch">
                    Already have an account?{" "}
                    <span onClick={() => setIsLogin(true)}>Login</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </Tilt>
      </div>
    </div>
  );
}