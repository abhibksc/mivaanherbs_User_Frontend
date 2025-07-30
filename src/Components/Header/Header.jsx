import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const isAuthenticated = Boolean(username);

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

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden lg:flex space-x-6 items-center">
          <NavLink to="/" label="Home" />
          <NavLink to="/about" label="About" />
          <NavLink to="/store" label="Store" />
          <NavLink to="/joinUs" label="Join Us" />

          {/* Dropdown Menu */}
          <div className="relative group">
            <span className="cursor-pointer text-gray-700 hover:text-green-600">More</span>
            <div className="absolute hidden group-hover:block bg-white shadow-md rounded mt-2 w-40 z-50">
              <DropdownLink to="/feature" label="Features" />
              <DropdownLink to="/blog" label="Blog Article" />
              <DropdownLink to="/testimonial" label="Testimonial" />
              <DropdownLink to="/404" label="404 Page" />
            </div>
          </div>

          <NavLink to="/contact" label="Contact" />
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
  <Link to={to} className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700">
    {label}
  </Link>
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
