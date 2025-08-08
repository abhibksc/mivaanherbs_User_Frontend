import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/logo.png";
import { FaBars, FaTimes, FaUser, FaCaretDown, FaShareAlt, FaDownload } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const isAuthenticated = Boolean(username);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const moreRef = useRef(null);

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

  const toggleMore = () => setIsMoreOpen((prev) => !prev);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  const handleShare = () => {
    const sponsorId = localStorage.getItem('MYsponsor_id');
    const referralUrl = `${window.location.origin}/authentication/ref/${sponsorId}`;
    if (navigator.share) {
      navigator.share({ title: "Check out this site!", url: referralUrl });
    } else {
      alert("Share not supported on this browser.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeMenusAndNavigate = (to) => {
    setMobileMenuOpen(false);
    navigate(to);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 items-center">
          <NavLink to="/" label="Home" />
          <NavLink to="/about" label="About" />
          <NavLink to="/store" label="Store" />
          <NavLink to="/joinUs" label="Join Us" />
          <NavLink to="/contact" label="Contact" />
          {isAuthenticated && (
            <div className="relative" ref={moreRef}>
              <button
                onClick={toggleMore}
                className="text-gray-700 hover:text-green-600 text-sm flex items-center"
              >
                More <FaCaretDown className="ml-1" />
              </button>
              {isMoreOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
                  <DropdownLink
                    to="https://play.google.com/store/apps/details?id=your.app.id"
                    label="Download App"
                    icon={<FaDownload />}
                  />
                  <button
                    onClick={handleShare}
                    className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                  >
                    <FaShareAlt className="mr-2" />
                    Share
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {isAuthenticated && (
            <>
              <UserButton onClick={() => navigate("/dashboard")} label="Dashboard" />
              <UserButton onClick={() => navigate("/profile")} label="My Profile" />
            </>
          )}
          <UserButton onClick={handleAuth} label={isAuthenticated ? "Logout" : "Login/SignUp"} />
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 text-2xl focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white shadow-md px-4 py-4 space-y-3">
          <MobileNavLink label="Home" onClick={() => closeMenusAndNavigate("/")} />
          <MobileNavLink label="About" onClick={() => closeMenusAndNavigate("/about")} />
          <MobileNavLink label="Store" onClick={() => closeMenusAndNavigate("/store")} />
          <MobileNavLink label="Join Us" onClick={() => closeMenusAndNavigate("/joinUs")} />
          <MobileNavLink label="Contact" onClick={() => closeMenusAndNavigate("/contact")} />

          {isAuthenticated && (
            <>
              <MobileNavLink label="Dashboard" onClick={() => closeMenusAndNavigate("/dashboard")} />
              <MobileNavLink label="My Profile" onClick={() => closeMenusAndNavigate("/profile")} />
              <MobileNavLink
                label="Download App"
                isExternal
                to="https://play.google.com/store/apps/details?id=your.app.id"
              />
              <MobileNavLink label="Share" onClick={handleShare} />
            </>
          )}

          <MobileNavLink label={isAuthenticated ? "Logout" : "Login/SignUp"} onClick={handleAuth} />
        </div>
      )}
    </header>
  );
};

const NavLink = ({ to, label }) => (
  <Link to={to} className="text-gray-700 hover:text-green-600 text-sm">
    {label}
  </Link>
);

const DropdownLink = ({ to, label, icon }) => (
  <a
    href={to}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
  >
    {icon && <span className="mr-2">{icon}</span>} {label}
  </a>
);

const UserButton = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="text-gray-700 hover:text-green-600 focus:outline-none text-sm"
  >
    <FaUser className="inline mr-1" /> {label}
  </button>
);

const MobileNavLink = ({ label, onClick, isExternal, to }) => {
  if (isExternal) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-gray-700 hover:text-green-600 text-sm"
      >
        {label}
      </a>
    );
  }
  return (
    <button
      onClick={onClick}
      className="block w-full text-left text-gray-700 hover:text-green-600 text-sm"
    >
      {label}
    </button>
  );
};

export default Header;
