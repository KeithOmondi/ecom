import { useState } from "react";
import { motion } from "framer-motion";
import Logo from "../../assets/logo.jpg";
import { FaPlus, FaSearch, FaShoppingCart, FaPhoneAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  return (
    <div className="bg-gray-50 sticky top-0 z-50 backdrop-blur-lg bg-opacity-60">
      {/* Navigation Bar */}
      <div className="shadow-md sticky top-0 z-50">
        <div className="mx-auto flex justify-between items-center px-6 py-3">
          {/* Logo Section */}
          <img src={Logo} alt="Logo" className="w-10 h-10" />

          {/* Nav Links */}
          <nav className="flex items-center gap-6 text-sm">
            {[
              { name: "Home", path: "/home" },
              { name: "Shop", path: "/shop" },
              { name: "Events", path: "/events" },
              { name: "Courses", path: "/courses" },
              { name: "Services", path: "/services" },
              { name: "Pricing", path: "/pricing" },
            ].map(({ name, path }, index) => (
              <motion.div key={index}>
                <Link
                  to={path}
                  className={`${activeLink === name
                    ? "border-b-2 border-blue-950 font-bold text-base"
                    : "text-blue-950"
                    } transition hover:border-b-2 hover:border-blue-950 hover:font-bold hover:text-base`}
                  onClick={() => setActiveLink(name)}
                >
                  {name}
                </Link>
              </motion.div>
            ))}

            {/* Dropdown for Company */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 text-blue-950 transition hover:border-b-2 border-blue-950 hover:font-bold hover:text-base"
              >
                Company <IoIosArrowDown />
              </button>
              {dropdownOpen && (
                <div className="absolute mt-2 w-48 bg-white text-blue-950 shadow-lg rounded-lg">
                  <ul className="py-2">
                    {["About Us", "Careers", "Contact"].map((option, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            <button className="flex items-center text-sm gap-1 bg-gray-100 hover:bg-blue-950 hover:text-white px-4 py-2 rounded-full">
              <FaPlus /> Appointment
            </button>
            <button className="bg-gray-100 hover:bg-blue-950 hover:text-white p-2 rounded-full">
              <FaSearch />
            </button>
            <button className="bg-gray-100 hover:bg-blue-950 hover:text-white p-2 rounded-full">
              <FaShoppingCart />
            </button>
            <button className="flex items-center text-sm gap-2 bg-gray-100 hover:bg-blue-950 hover:text-white px-4 py-2 rounded-full">
              <FaPhoneAlt /> +123-456-7890
            </button>

            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-blue-950 hover:text-white px-4 py-2 rounded-full"
              >
                Kelvin Njuiri <IoIosArrowDown />
              </button>
              {userDropdownOpen && (
                <div className="absolute mt-2 w-40 bg-gray-100 hover:bg-blue-950 hover:text-white shadow-lg rounded-lg">
                  <ul className="py-2">
                    {["Profile", "Settings", "Logout"].map((option, idx) => (
                      <li
                        key={idx}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <motion.button
              className="px-4 py-2 bg-gray-500 text-sm text-white hover:bg-blue-950 rounded-lg"
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
