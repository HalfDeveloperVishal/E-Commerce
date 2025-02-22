import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BannerSection from "./components/Banner/BannerSection";
import Navbar from "./components/Navbar/Navbar";
import Heropart from "./components/HeroSection/Heropart";
import Products from "./components/ProductSection/Products";
import ProductDescription from "./components/ProductDescription/ProductDescription";
import CartPage from "./components/CartSection/CartPage";
import { CartProvider } from "./components/CartContext";
import { AuthProvider } from "./components/AuthContext";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div>
            <Navbar />
            <Routes>
              {/* Home Page */}
              <Route
                path="/"
                element={
                  <>
                    <BannerSection />
                    <Heropart />
                    <Products />
                  </>
                }
              />
              {/* Cart Page */}
              <Route path="/cart" element={<CartPage />} />
              {/* Product Description Page */}
              <Route path="/product-description" element={<ProductDescription />} />
            </Routes>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
