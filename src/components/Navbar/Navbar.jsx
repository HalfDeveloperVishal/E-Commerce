import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartContext } from "../CartContext";
import { IoClose } from "react-icons/io5";
import { AuthContext } from "../AuthContext";

const Navbar = () => {
  const { cart, setCart, clearCart } = useContext(CartContext);
  const {
    isLoggedIn,
    loggedInUser,
    welcomeMessage,
    errorMessage,
    handleSignup,
    handleLogin,
    handleLogout,
    setErrorMessage,
  } = useContext(AuthContext);

  const [isSignupVisible, setSignupVisible] = useState(false);
  const [isLoginVisible, setLoginVisible] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    termsAccepted: false,
  });

  const [loginData, setLoginData] = useState({
    loginIdentifier: "",
    password: "",
  });

  // Load cart data from local storage when user logs in
  useEffect(() => {
    if (loggedInUser && loggedInUser.email) {
      const savedCart =
        JSON.parse(localStorage.getItem(`cart_${loggedInUser.email}`)) || [];
      setCart(savedCart);
    }
  }, [loggedInUser, setCart]);

  const openSignupForm = () => {
    setSignupVisible(true);
    setLoginVisible(false);
  };

  const openLoginForm = () => {
    setLoginVisible(true);
    setSignupVisible(false);
    setErrorMessage("");
  };

  const closeModals = () => {
    setSignupVisible(false);
    setLoginVisible(false);
    setErrorMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (
      formData.username &&
      formData.email &&
      formData.password &&
      formData.phone &&
      formData.termsAccepted
    ) {
      handleSignup(formData);
      setSignupVisible(false);
      setFormData({
        username: "",
        email: "",
        password: "",
        phone: "",
        termsAccepted: false,
      });
    } else {
      alert("Please fill in all fields and accept the terms & conditions.");
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    handleLogin(loginData);

    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (user && user.email) {
        const savedCart =
          JSON.parse(localStorage.getItem(`cart_${user.email}`)) || [];
        setCart(savedCart);
      }
    }, 500); // Delay to ensure localStorage updates
    setLoginVisible(false);
    setLoginData({ loginIdentifier: "", password: "" });
  };

  const handleUserLogout = () => {
    if (loggedInUser && loggedInUser.email) {
      localStorage.removeItem(`cart_${loggedInUser.email}`); // Remove user-specific cart
    }

    clearCart(); // Reset cart in state
    handleLogout(); // Log out the user

    // Ensure cart count resets immediately
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));

    // Force a hard refresh to reflect the changes
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <nav className="navbar fixed-top">
      {welcomeMessage && (
        <div className="welcome-message-container">
          <p className="welcome-message">{welcomeMessage}</p>
        </div>
      )}

      <div className="navbar-left">
        <Sidebar />
        <img src="https://via.placeholder.com/40" alt="Logo" className="logo" />
        <h2 className="company-name">Company Name</h2>
      </div>

      <ul className="nav-links">
        <li>Categories</li>
        <li>Deals</li>
        <li>What's New</li>
        <li>Delivery</li>
      </ul>

      <div className="navbar-right">
        <div className="search-bar-section">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <FaSearch className="search-icon" />
          </div>
        </div>

        <div className="icon-section">
          <div className="btn-group">
            {isLoggedIn ? (
              <button className="btn account-button" onClick={handleUserLogout}>
                Logout
              </button>
            ) : (
              <>
                <button type="button" className="btn account-button">
                  Account
                </button>
                <button
                  type="button"
                  className="btn dropdown-toggle dropdown-toggle-split account-button"
                  data-bs-toggle="dropdown"
                >
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <button className="dropdown-item" onClick={openLoginForm}>
                      Log-in
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={openSignupForm}>
                      Sign-Up
                    </button>
                  </li>
                </ul>
              </>
            )}
          </div>

          <div className="user" onClick={() => navigate("/cart")}>
            <FaShoppingCart className="user-icon" />
            <p>Cart ({cart.length})</p>
            {/* Persist cart count */}
          </div>
        </div>
      </div>

      {isSignupVisible && (
        <div className="signup-modal">
          <div className="signup-content">
            <button className="close-btn" onClick={closeModals}>
              <IoClose size={24} />
            </button>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
              <button type="submit">Register</button>
            </form>
          </div>
        </div>
      )}

      {isLoginVisible && (
        <div className="login-modal">
          <div className="login-content">
            <button className="close-btn" onClick={closeModals}>
              <IoClose size={24} />
            </button>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="text"
                name="loginIdentifier"
                placeholder="Username or Email"
                value={loginData.loginIdentifier}
                onChange={handleLoginChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
              <button type="submit">Login</button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
