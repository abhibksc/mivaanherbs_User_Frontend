import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const isAuthenticated = Boolean(username);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef(null); // 🔧 Reference for "More" dropdown

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/authentication");
  };

  const handleAuth = () => {
    if (isAuthenticated) {
      handleLogout();
    } else {
      navigate("/authentication");
    }
  };

  const toggleMore = () => {
    setIsMoreOpen((prev) => !prev);
  };

  // 🔍 Close "More" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex space-x-6 items-center">
          <NavLink to="/" label="Home" />
          <NavLink to="/about" label="About" />
          <NavLink to="/store" label="Store" />
          <NavLink to="/joinUs" label="Join Us" />
          <NavLink to="/contact" label="Contact" />

          {/* More Menu */}
      {localStorage.getItem("token") &&    <div className="relative" ref={moreRef}>
            <button
              onClick={toggleMore}
              className="text-gray-700 hover:text-green-600 text-sm focus:outline-none"
            >
              More <i className="fa-solid fa-caret-down ml-1"></i>
            </button>
            {isMoreOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                <DropdownLink
                  to="https://play.google.com/store/apps/details?id=your.app.id"
                  label="Download App"
                />
                <button
                onClick={() => {
  const sponsorId = localStorage.getItem('MYsponsor_id');
  const referralUrl = `${window.location.origin}/authentication/ref/${sponsorId}`;

  if (navigator.share) {
    navigator.share({
      title: "Check out this site!",
      url: referralUrl,
    });
  } else {
    alert("Share not supported on this browser.");
  }
}}

                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                >
                  Share
                </button>
              </div>
            )}
          </div>}
        </nav>

        {/* Auth / User Buttons */}
        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <>
              <UserButton onClick={() => navigate("/dashboard")} label="Dashboard" />
              <UserButton onClick={() => navigate("/profile")} label="My Profile" />
            </>
          )}
          <UserButton onClick={handleAuth} label={isAuthenticated ? "Logout" : "Login/SignUp"} />
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, label }) => (
  <Link to={to} className="text-gray-700 hover:text-green-600">
    {label}
  </Link>
);

const DropdownLink = ({ to, label }) => (
  <a
    href={to}
    target="_blank"
    rel="noopener noreferrer"
    className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
  >
    {label}
  </a>
);

const UserButton = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="text-gray-700 hover:text-green-600 focus:outline-none text-sm"
  >
    <i className="fa-solid fa-user mr-1"></i> {label}
  </button>
);

export default Header;
