import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Eye, EyeOff, Lock, Mail } from "lucide-react";

import { adminLogin } from "./adminApi";
import "./Admin.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await adminLogin(email.trim(), password);

      sessionStorage.setItem("adminToken", data.token);
      sessionStorage.setItem("adminEmail", data.admin.email);

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">

      <div className="login-glow login-glow-one"></div>
      <div className="login-glow login-glow-two"></div>

      <div className="admin-login-container">

        <div className="admin-login-brand">
          <div className="admin-brand-icon">
            <ShieldCheck size={27} />
          </div>

          <div>
            <h1>VAIDYA<span>CARE</span></h1>
            <p>ADMINISTRATION PORTAL</p>
          </div>
        </div>

        <div className="admin-login-card">

          <div className="admin-login-heading">
            <div className="admin-login-badge">
              <Lock size={15} />
              SECURE ACCESS
            </div>

            <h2>Welcome back.</h2>

            <p>
              Sign in to manage your orders and monitor
              your store operations.
            </p>
          </div>

          <form onSubmit={handleLogin}>

            <div className="admin-form-group">

              <label htmlFor="admin-email">
                ADMIN EMAIL
              </label>

              <div className="admin-input-wrapper">

                <Mail size={18} />

                <input
                  id="admin-email"
                  type="email"
                  placeholder="Enter your admin email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  required
                />

              </div>

            </div>

            <div className="admin-form-group">

              <label htmlFor="admin-password">
                PASSWORD
              </label>

              <div className="admin-input-wrapper">

                <Lock size={18} />

                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {error && (
              <div className="admin-login-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="admin-login-button"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Access Dashboard"}
            </button>

          </form>

          <div className="admin-login-footer">
            <ShieldCheck size={15} />
            Restricted access · Authorized personnel only
          </div>

        </div>

        <p className="admin-copyright">
          © {new Date().getFullYear()} Vaidya Care. All rights reserved.
        </p>

      </div>
    </div>
  );
}