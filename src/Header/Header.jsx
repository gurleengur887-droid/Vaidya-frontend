import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

import mylogo from "../Image/mylogo.PNG";

export default function Header() {
const navigate = useNavigate();
const [search, setSearch] = useState("");

const products = [
{
name: "Ayur Netra Eye Drops",
keywords: ["ayur netra", "ayurnetra", "eye drops", "eye drop", "netra"],
path: "/",
},
{
name: "Trident Natural Tooth Lotion",
keywords: ["trident", "tooth lotion", "tooth", "lotion", "oral care"],
path: "/trident",
},
];

const handleSearch = (event) => {
event.preventDefault();


const query = search.trim().toLowerCase();

if (!query) return;

const matchedProduct = products.find((product) =>
  product.keywords.some((keyword) => keyword.includes(query) || query.includes(keyword))
);

if (matchedProduct) {
  navigate(matchedProduct.path);
  setSearch("");
}


};

const handleKeyDown = (event) => {
if (event.key === "Escape") {
setSearch("");
}
};

return ( <header className="site-header">
{/* LOGO */}
<button
type="button"
className="site-header-logo"
onClick={() => navigate("/")}
aria-label="Vaidya Co. home"
> <img src={mylogo} alt="Vaidya Co." /> </button>


  {/* PRODUCT LINKS */}
  <nav className="header-products" aria-label="Our products">
   <button
  type="button"
  className="header-product-link eye-product-link"
  onClick={() => navigate("/")}
>
  Ayur Netra
</button>

    <span className="header-product-divider" aria-hidden="true">
      |
    </span>

   <button
  type="button"
  className="header-product-link tooth-product-link"
  onClick={() => navigate("/trident")}
>
  Trident Tooth Lotion
  <span className="header-new-badge">NEW</span>
</button>
  </nav>

  {/* SEARCH */}
  <form className="site-header-search" onSubmit={handleSearch} role="search">
    <input
      type="search"
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      onKeyDown={handleKeyDown}
      placeholder="Search products..."
      aria-label="Search products"
      list="vaidya-products"
    />

    <datalist id="vaidya-products">
      <option value="Ayur Netra Eye Drops" />
      <option value="Trident Natural Tooth Lotion" />
    </datalist>

    <button type="submit" aria-label="Search">
      ⌕
    </button>
  </form>

  {/* ACTIONS */}
  <div className="site-header-actions">
    <button
      type="button"
      className="header-icon"
      onClick={() => navigate("/")}
      aria-label="Home"
    >
      🏠
    </button>

    <button
      type="button"
      className="header-icon"
      onClick={() => navigate("/auth")}
      aria-label="Account"
    >
      👤
    </button>
  </div>
</header>


);
}
