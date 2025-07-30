import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const logedin = localStorage.getItem("username");

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>

        <nav className="hidden lg:flex space-x-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-green-600">
            Home
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-green-600">
            About
          </Link>
          <Link to="/store" className="text-gray-700 hover:text-green-600">
            Store
          </Link>

          <div className="relative group">
            <div className="absolute hidden group-hover:block bg-white shadow-md rounded mt-2">
              <Link to="/feature" className="block px-4 py-2 hover:bg-gray-100">
                Features
              </Link>
              <Link to="/blog" className="block px-4 py-2 hover:bg-gray-100">
                Blog Article
              </Link>
              <Link
                to="/testimonial"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Testimonial
              </Link>
              <Link to="/404" className="block px-4 py-2 hover:bg-gray-100">
                404 Page
              </Link>
            </div>
          </div>

          <Link to="/contact" className="text-gray-700 hover:text-green-600">
            Contact
          </Link>

          <div id="authButtonContainer"></div>
        </nav>

        <div className="flex gap-4 flex-row">
         {logedin && <div>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-gray-700 hover:text-green-600 focus:outline-none text-sm"
            >
              <i className="fa-solid fa-user mr-1"></i> Dashboard
            </button>
          </div>}

        {logedin &&  <div>
            <button
              onClick={() => navigate("/profile")}
              className="text-gray-700 hover:text-green-600 focus:outline-none text-sm"
            >
              <i className="fa-solid fa-user mr-1"></i> My Profile
            </button>
          </div>}

          <div>
            <button
              onClick={() => {
                if (logedin) {
                  localStorage.removeItem("username");
                  localStorage.removeItem("token");
                  navigate("/authentication");
                } else {
                  navigate("/authentication");
                }
              }}
              className="text-gray-700 hover:text-green-600 focus:outline-none text-sm"
            >
              {console.log(logedin)}
              <i className="fa-solid fa-user mr-1"></i>{" "}
              {!logedin ? "Login/SingUp" : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
