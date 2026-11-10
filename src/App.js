import React, { useEffect, useRef } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Customer Website Components
import HeroSection from "./HeroSection/HeroSection";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

import AuthPage from "./AuthPage/AuthPage";
import ReturnPolicy from "./ReturnPolicy/ReturnPolicy";
import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./TermsConditions/TermsConditions";
import ProductDetails from "./ProperDetails/ProductDetails";
import ToothProduct from "./ToothProduct/ToothProduct";
import Checkout from "./Checkout/Checkout";
import SuccessPage from "./SuccessPage/SuccessPage";
import TridentProduct from "./TridentProduct/TridentProduct";
import ScrollToTop from "./ScrollToTop";

// Admin Components
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import ProtectedAdminRoute from "./Admin/ProtectedAdminRoute";

/* =========================================
   APP CONTENT
========================================= */

function AppContent() {
  const location = useLocation();

  // Remember previous route for Meta Pixel tracking
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    if (previousPath.current === location.pathname) {
      return;
    }

    previousPath.current = location.pathname;

    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [location.pathname]);

  // Route conditions
  const isHomePage = location.pathname === "/";
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {/* CUSTOMER HEADER */}
      {!isAdminPage && isHomePage && <Header />}

      {/* ALL ROUTES */}
      <Routes>

        {/* =================================
            CUSTOMER WEBSITE
        ================================= */}

        <Route path="/" element={<HeroSection />} />

        {/* AUTH */}
        <Route path="/auth" element={<AuthPage />} />

        {/* POLICIES */}
        <Route path="/return" element={<ReturnPolicy />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsConditions />} />

        {/* PRODUCTS */}
        <Route path="/details-eye" element={<ProductDetails />} />
        <Route path="/details-tooth" element={<ToothProduct />} />
        <Route path="/trident" element={<TridentProduct />} />

        {/* CHECKOUT */}
        <Route path="/checkout" element={<Checkout />} />

        {/* SUCCESS */}
        <Route path="/success" element={<SuccessPage />} />


        {/* =================================
            ADMIN LOGIN
        ================================= */}

        <Route
          path="/admin"
          element={<AdminLogin />}
        />


        {/* =================================
            PROTECTED ADMIN DASHBOARD
        ================================= */}

        <Route element={<ProtectedAdminRoute />}>

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          >

            {/* ALL ORDERS */}
            <Route
              path="orders"
              element={null}
            />

            {/* PENDING ORDERS */}
            <Route
              path="pending"
              element={null}
            />

            {/* COMPLETED ORDERS */}
            <Route
              path="completed"
              element={null}
            />

          </Route>

        </Route>

      </Routes>

      {/* CUSTOMER FOOTER */}
      {!isAdminPage && <Footer />}

    </>
  );
}


/* =========================================
   MAIN APP
========================================= */

function App() {
  return (
    <Router>

      <ScrollToTop />

      <AppContent />

    </Router>
  );
}

export default App;