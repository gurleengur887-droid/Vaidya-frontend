
import React, { useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

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

/* =========================================
   APP CONTENT
========================================= */

function AppContent() {
  const location = useLocation();

  // Remember the previous route to avoid duplicating
  // the initial PageView already sent by index.html.
  const previousPath = useRef(location.pathname);

  // Track navigation between React pages.
  useEffect(() => {
    if (previousPath.current === location.pathname) {
      return;
    }

    previousPath.current = location.pathname;

    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [location.pathname]);

  // Header appears only on the homepage
  const isHomePage = location.pathname === "/";

  return (
    <>
      {/* HEADER — HOMEPAGE ONLY */}
      {isHomePage && <Header />}

      {/* PAGES */}
      <Routes>
        {/* HOME */}
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
      </Routes>

      {/* FOOTER — ALL PAGES */}
      <Footer />
    </>
  );
}

/* =========================================
   APP
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

