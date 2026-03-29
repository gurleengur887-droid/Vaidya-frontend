import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HeroSection from "./HeroSection/HeroSection";
import StickyBar from "./Stickybar/Stickybar";
import AuthPage from "./AuthPage/AuthPage";
import ReturnPolicy from "./ReturnPolicy/ReturnPolicy";
import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./TermsConditions/TermsConditions";
import ProductDetails from "./ProperDetails/ProductDetails";
import ToothProduct from "./ToothProduct/ToothProduct";
import Checkout from "./Checkout/Checkout";
import SuccessPage from "./SuccessPage/SuccessPage";
function App() {
  return (
    <Router>
      <StickyBar /> {/* keep it outside so it shows on all pages */}

      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/auth" element={<AuthPage />} />
           <Route path="/return" element={<ReturnPolicy />} />
         <Route path="/privacy" element={<PrivacyPolicy />} />  
             <Route path="/terms" element={<TermsConditions />} />  
             <Route path="/details-eye" element={<ProductDetails />} />    
               <Route path="/details-tooth" element={<ToothProduct />} />    
               <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<SuccessPage />} />         
      </Routes>
    </Router>
  );
}

export default App;