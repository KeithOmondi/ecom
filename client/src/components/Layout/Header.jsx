import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaSearch, FaShoppingCart, FaPhoneAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../assets/logo.jpg";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve username from session storage
    const storedUser = sessionStorage.getItem("user");
    console.log("storedUser", storedUser);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsername(parsedUser.name || "");
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Clear session storage
    sessionStorage.removeItem("user"); // Clear session storage
    setUsername(""); // Reset state
    toast.success("Logged out successfully!"); // Show toast notification
    navigate("/login"); // Redirect to login page
  };

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

            {username ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-blue-950 hover:text-white px-4 py-2 rounded-full"
                >
                  {username} <IoIosArrowDown />
                </button>
                {userDropdownOpen && (
                  <div className="absolute mt-2 w-40 bg-gray-100 shadow-lg rounded-lg">
                    <ul className="py-2">
                      <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer">
                        Profile
                      </li>
                      <li className="px-4 py-2 hover:bg-blue-50 cursor-pointer">
                        Settings
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-950 text-white rounded-full text-sm hover:bg-blue-800"
              >
                Login
              </Link>
            )}

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
