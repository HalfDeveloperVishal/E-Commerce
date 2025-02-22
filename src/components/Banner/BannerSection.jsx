import React, { useState, useEffect, useRef } from "react";
import "./BannerSection.css"; // Import CSS file
import { CiLocationOn } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { FaEllipsisVertical } from "react-icons/fa6";

const BannerSection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("Language");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [location, setLocation] = useState("Location");
  const [loading, setLoading] = useState(false);

  const languages = ["English", "Spanish", "French", "German", "Italian"];

  // Ref for dropdown to detect clicks outside
  const dropdownRef = useRef(null);

  // Handle language selection
  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
    setDropdownOpen(false); // Close dropdown after selecting
  };

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get user location
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        )
          .then((res) => res.json())
          .then((data) => {
            const city =
              data.address?.city ||
              data.address?.town ||
              data.address?.village ||
              "Unknown";
            const country = data.address?.country || "Unknown";
            setLocation(`${city}, ${country}`);
            setLoading(false);
          })
          .catch(() => {
            setLocation("Unable to fetch location");
            setLoading(false);
          });
      },
      () => {
        setLocation("Permission Denied");
        setLoading(false);
      }
    );
  };

  return (
    <div className="contact-container">
      {/* Left Section - Contact Info */}
      <div className="left-section">
        <IoCallOutline className="contact-icon" />
        <p>+91 6206390989</p>
      </div>

      {/* Middle Section - Message & Shop Now */}
      <div className="middle-section">
        <p>Get 50% off on selected Items</p>
        <FaEllipsisVertical className="vertical-line-icon" />
        <span className="shop-now">Shop Now</span>
      </div>

      {/* Right Section - Language & Location */}
      <div className="right-section">
        {/* Language Dropdown */}
        <div className="language-dropdown" ref={dropdownRef}>
          <span className="selected-language">{selectedLanguage}</span>
          <FaChevronDown
            className="dropdown-icon"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <ul className="dropdown-menu">
              {languages.map((lang) => (
                <li key={lang} onClick={() => handleSelectLanguage(lang)}>
                  {lang}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Location Section with Icon */}
        <div
          className="location-section"
          onClick={getLocation}
          style={{ cursor: "pointer" }}
        >
          <CiLocationOn className="location-icon" />
          <span>{loading ? "Fetching..." : location}</span>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;