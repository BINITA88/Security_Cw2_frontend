import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const location = useLocation();

  if (
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/admin/dashboard" ||
    location.pathname === "/Home" ||
    location.pathname.match(/^\/admin\/update\/.*/) ||
    location.pathname.match(/^\/product\/.*/) ||
    location.pathname.match(/^\/placeorder/)
  ) {
    return null;
  }

  return (
    <nav className="bg-[#4a1f0d] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-4">
            <a href="/homepage" className="text-2xl font-bold tracking-wide text-white hover:text-[#f8eee3]">
              Bookish
            </a>
          </div>


          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={handleLogin}
              className="bg-[#f3e7c6] hover:bg-[#f3e7c6] text-black px-4 py-2 rounded-md transition duration-300 font-medium"
            >
              Login
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleNavbar}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-[#4a1f0d]">
          <button
            onClick={handleLogin}
            className="w-full text-left bg-[#159A9C] hover:bg-[#11787b] text-white px-4 py-2 rounded-md mt-2 transition duration-300"
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
