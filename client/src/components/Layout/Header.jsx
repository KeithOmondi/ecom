import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <a href="/" className="flex items-center">
              <img
                src="https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Real Estate Logo"
                className="h-8 w-8 mr-2"
              />
              Find A Home
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <div className="relative">
              <a href="#home" className="hover:text-gray-300">
                Home
              </a>
            </div>
            <div className="relative group">
              <a href="#buy-rent" className="hover:text-gray-300">
                Buy/Rent
              </a>
              <div className="absolute left-0 hidden mt-2 space-y-2 bg-blue-700 group-hover:block p-4 w-auto rounded-lg">
                <a href="#buy" className="block text-white hover:text-gray-300">
                  For Sale
                </a>
                <a href="#rent" className="block text-white hover:text-gray-300">
                  For Rent
                </a>
              </div>
            </div>
            <div className="relative group">
              <a href="#developments" className="hover:text-gray-300">
                Developments
              </a>
              <div className="absolute left-0 hidden mt-2 space-y-2 bg-blue-700 group-hover:block p-4 rounded-lg">
                <a href="#new-projects" className="block text-white hover:text-gray-300">
                  New Projects
                </a>
                <a href="#upcoming" className="block text-white hover:text-gray-300">
                  Upcoming Developments
                </a>
              </div>
            </div>
            <div className="relative">
              <a href="#vaal-insider" className="hover:text-gray-300">
                Vaal Insider
              </a>
            </div>
            <div className="relative">
              <a href="#about-us" className="hover:text-gray-300">
                About Us
              </a>
            </div>
            <div className="relative">
              <a href="#vaal-global" className="hover:text-gray-300">
                Vaal Global
              </a>
            </div>
            <div className="relative">
              <a href="#contact-us" className="hover:text-gray-300">
                Contact Us
              </a>
            </div>
          </nav>

          {/* Phone Number */}
          <div className="hidden md:block text-yellow-500">
            <a href="tel:+254725111444" className="hover:text-yellow-300">
              +254 725 111 444
            </a>
          </div>

          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800">
          <nav className="space-y-2 px-4 py-2">
            <a href="#home" className="block hover:text-gray-300">
              Home
            </a>
            <div className="space-y-2">
              <a href="#buy-rent" className="block hover:text-gray-300">
                Buy/Rent
              </a>
              <div className="space-y-2 pl-4">
                <a href="#buy" className="block hover:text-gray-300">
                  Buy
                </a>
                <a href="#rent" className="block hover:text-gray-300">
                  Rent
                </a>
              </div>
            </div>
            <div className="space-y-2">
              <a href="#developments" className="block hover:text-gray-300">
                Developments
              </a>
              <div className="space-y-2 pl-4">
                <a href="#new-projects" className="block hover:text-gray-300">
                  New Projects
                </a>
                <a href="#upcoming" className="block hover:text-gray-300">
                  Upcoming Developments
                </a>
              </div>
            </div>
            <a href="#vaal-insider" className="block hover:text-gray-300">
              Vaal Insider
            </a>
            <a href="#about-us" className="block hover:text-gray-300">
              About Us
            </a>
            <a href="#vaal-global" className="block hover:text-gray-300">
              Vaal Global
            </a>
            <a href="#contact-us" className="block hover:text-gray-300">
              Contact Us
            </a>
            <a href="tel:+254725111444" className="block text-yellow-500 hover:text-yellow-300">
              +254 700 111 222
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
