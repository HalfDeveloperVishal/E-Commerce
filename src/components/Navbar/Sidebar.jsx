import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { AuthContext } from "../AuthContext"; // Import AuthContext

function Sidebar() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [isSignupVisible, setSignupVisible] = useState(false);
  const [isLoginVisible, setLoginVisible] = useState(false);

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

  const toggleSidebar = () => setSidebarVisible(!isSidebarVisible);
  const closeSidebar = () => setSidebarVisible(false);

  const openSignupForm = () => {
    setSignupVisible(true);
    setLoginVisible(false);
    closeSidebar();
  };

  const openLoginForm = () => {
    setLoginVisible(true);
    setSignupVisible(false);
    closeSidebar();
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
    if (formData.username && formData.email && formData.password && formData.phone && formData.termsAccepted) {
      handleSignup(formData);
      setTimeout(() => {
        setSignupVisible(false);
      }, 100);
      setFormData({ username: "", email: "", password: "", phone: "", termsAccepted: false });
    } else {
      alert("Please fill in all fields and accept the terms & conditions.");
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    handleLogin(loginData);
    setTimeout(() => {
      setLoginVisible(false);
    }, 100);
    setLoginData({ loginIdentifier: "", password: "" });
  };

  return (
    <div>
      {welcomeMessage && (
        <div className="welcome-message-container">
          <p className="welcome-message">{welcomeMessage}</p>
        </div>
      )}

      <GiHamburgerMenu onClick={toggleSidebar} aria-label="Toggle Sidebar" className="hamburger-icon" />

      <div className={`sidebar bg-dark text-white ${isSidebarVisible ? "active" : ""}`}>
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <button className="close-btn" onClick={toggleSidebar}>
            <IoClose size={24} />
          </button>

          <a href="/" className="d-flex align-items-center mb-3 text-white text-decoration-none">
            <span className="fs-4">IMart</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li><button className="nav-link text-white" onClick={closeSidebar}>Home</button></li>
            <li><button className="nav-link text-white" onClick={closeSidebar}>Categories</button></li>
            <li><button className="nav-link text-white" onClick={closeSidebar}>Deals</button></li>
            <li><button className="nav-link text-white" onClick={closeSidebar}>What's New</button></li>
            <li><button className="nav-link text-white" onClick={closeSidebar}>Delivery</button></li>
            {!isLoggedIn ? (
              <>
                <li><button className="nav-link text-white" onClick={openSignupForm}>Sign-Up</button></li>
                <li><button className="nav-link text-white" onClick={openLoginForm}>Login</button></li>
              </>
            ) : (
              <li><button className="nav-link text-white" onClick={handleLogout}>Logout</button></li>
            )}
          </ul>
          <hr />
        </div>
      </div>

      {isSidebarVisible && <div className="overlay" onClick={closeSidebar}></div>}

      {isSignupVisible && (
        <div className="signup-modal">
          <div className="signup-content">
            <button className="close-btn" onClick={closeModals}><IoClose size={24} /></button>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
              <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} required />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} required />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} required />
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required />
              <label className="terms-checkbox">
                <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleInputChange} required />
                I accept the Terms & Conditions
              </label>
              <button type="submit">Register</button>
              <p>Already have an account? <a href="#" onClick={openLoginForm}>Sign In</a></p>
            </form>
          </div>
        </div>
      )}

      {isLoginVisible && (
        <div className="login-modal">
          <div className="login-content">
            <button className="close-btn" onClick={closeModals}><IoClose size={24} /></button>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <input type="text" name="loginIdentifier" placeholder="Username or Email" value={loginData.loginIdentifier} onChange={handleLoginChange} required />
              <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
              <button type="submit">Login</button>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <p>Create New Account ?  <a href="#" onClick={openSignupForm}>Sign up</a></p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;