import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setIsLoggedIn(true);
      setLoggedInUser(storedUser);
    }
  }, []);

  const handleSignup = (userData) => {
    localStorage.setItem(userData.email, JSON.stringify(userData));
    localStorage.setItem("loggedInUser", JSON.stringify({ username: userData.username }));
    setIsLoggedIn(true);
    setLoggedInUser(userData.username);
    setWelcomeMessage(`Welcome, ${userData.username}!`);
  };

  const handleLogin = ({ loginIdentifier, password }) => {
    const userData = JSON.parse(localStorage.getItem(loginIdentifier));
    if (userData && userData.password === password) {
      localStorage.setItem("loggedInUser", JSON.stringify({ username: userData.username, email: userData.email }));
      setIsLoggedIn(true);
      setLoggedInUser({ username: userData.username, email: userData.email });
      setWelcomeMessage(`Welcome back, ${userData.username}!`);
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid credentials! Please try again.");
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.setItem("logoutEvent", Date.now()); // 🔥 Trigger event
    setIsLoggedIn(false);
    setLoggedInUser(null);

    setTimeout(() => {
      window.location.reload(); // 🔄 Ensure all states reset
    }, 100);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, loggedInUser, welcomeMessage, errorMessage, handleSignup, handleLogin, handleLogout, setErrorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};