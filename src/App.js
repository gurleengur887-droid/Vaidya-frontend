import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import HeroSection from "./HeroSection/HeroSection";
import StickyBar from "./Stickybar/Stickybar";
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


/* =========================================
   APP CONTENT
========================================= */

function AppContent() {
  const location = useLocation();

  // Header should ONLY appear on homepage
  const isHomePage = location.pathname === "/";

  // Sticky Order Now bar should NOT appear
  // on Checkout and Success pages
  const hideStickyBar =
    location.pathname === "/checkout" ||
    location.pathname === "/success";

  return (
    <>
      {/* 🌿 HEADER — HOMEPAGE ONLY */}
      {isHomePage && <Header />}


      {/* 🛒 STICKY ORDER BAR */}
      {!hideStickyBar && <StickyBar />}


      {/* 📄 PAGES */}
      <Routes>

        {/* 🏠 HOME */}
        <Route
          path="/"
          element={<HeroSection />}
        />

        {/* 🔐 AUTH */}
        <Route
          path="/auth"
          element={<AuthPage />}
        />

        {/* 📜 POLICIES */}
        <Route
          path="/return"
          element={<ReturnPolicy />}
        />

        <Route
          path="/privacy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/terms"
          element={<TermsConditions />}
        />

        {/* 🌿 PRODUCTS */}
        <Route
          path="/details-eye"
          element={<ProductDetails />}
        />

        <Route
          path="/details-tooth"
          element={<ToothProduct />}
        />

        {/* 🧾 CHECKOUT */}
        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* ✅ SUCCESS */}
        <Route
          path="/success"
          element={<SuccessPage />}
        />

      </Routes>


      {/* 🌿 FOOTER — ALL PAGES */}
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
      <AppContent />
    </Router>
  );
}

export default App;