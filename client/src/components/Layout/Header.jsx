import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaSearch, FaShoppingCart, FaPhoneAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Logo from "../../assets/logo.jpg";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [rentDropdownOpen, setRentDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [username, setUsername] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsername(parsedUser.name || "");
    }
  }, []);

  const handleRentSelection = (path, category) => {
    navigate(`${path}?category=${encodeURIComponent(category)}`);
    setRentDropdownOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUsername("");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  useEffect(() => {
    const pathToName = {
      "/home": "Home",
      "/events": "Events",
      "/rent": "Rent",
      "/services": "Services",
    };

    const matchedPath = Object.keys(pathToName).find((key) =>
      location.pathname.startsWith(key)
    );
    setActiveLink(pathToName[matchedPath] || "");
  }, [location.pathname]);

  return (
    <div className="bg-gray-50 sticky top-0 z-50 backdrop-blur-lg bg-opacity-60">
      <div className="shadow-md sticky top-0 z-50">
        <div className="mx-auto flex justify-between items-center px-6 py-3">
          <img src={Logo} alt="Logo" className="w-10 h-10" />

          {/* Navigation */}
          <nav className="flex items-center gap-6 text-sm">
            <motion.div>
              <Link
                to="/home"
                className={`${
                  activeLink === "Home"
                    ? "border-b-2 border-blue-950 font-bold text-base"
                    : "text-blue-950"
                } transition hover:border-b-2 hover:border-blue-950 hover:font-bold hover:text-base`}
              >
                Home
              </Link>
            </motion.div>

            {/* Rent Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRentDropdownOpen(!rentDropdownOpen)}
                className={`${
                  activeLink === "Rent"
                    ? "border-b-2 border-blue-950 flex items-center gap-1 font-bold text-base"
                    : "text-blue-950"
                } transition hover:border-b-2 hover:border-blue-950 hover:font-bold hover:text-base flex items-center gap-1`}
              >
                Rent <IoIosArrowDown />
              </button>
              {rentDropdownOpen && (
                <div className="absolute mt-2 w-48 bg-white text-blue-950 shadow-lg rounded-lg">
                  <ul className="py-2">
                    {[
                      "Warehouses",
                      "Real Estate",
                      "Event Spaces",
                      "Office Spaces",
                    ].map((category, idx) => (
                      <li
                        key={idx}
                        onClick={() => handleRentSelection("/rent", category)}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                      >
                        Rent {category}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <motion.div>
              <Link
                to="/events"
                className={`${
                  activeLink === "Events"
                    ? "border-b-2 border-blue-950 font-bold text-base"
                    : "text-blue-950"
                } transition hover:border-b-2 hover:border-blue-950 hover:font-bold hover:text-base`}
              >
                Blogs & Events
              </Link>
            </motion.div>

            <motion.div>
              <Link
                to="/services"
                className={`${
                  activeLink === "Services"
                    ? "border-b-2 border-blue-950 font-bold text-base"
                    : "text-blue-950"
                } transition hover:border-b-2 hover:border-blue-950 hover:font-bold hover:text-base`}
              >
                Services
              </Link>
            </motion.div>

            {/* Company Dropdown */}
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

          {/* Right Icons and User Profile */}
          <div className="flex items-center gap-4">
            <button className="flex items-center text-sm gap-1 bg-gray-100 hover:bg-blue-950 hover:text-white px-4 py-2 rounded-full  sm:flex">
              <FaPlus /> Appointment
            </button>
            <button className="bg-gray-100 hover:bg-blue-950 hover:text-white p-2 rounded-full hidden sm:flex">
              <FaSearch />
            </button>
            <button
              onClick={() => navigate("/rent/cart")}
              className="bg-gray-100 hover:bg-blue-950 hover:text-white p-2 rounded-full hidden sm:flex"
            >
              <FaShoppingCart />
            </button>
            <button className="flex items-center text-sm gap-2 bg-gray-100 hover:bg-blue-950 hover:text-white px-4 py-2 rounded-full sm:flex">
              <FaPhoneAlt /> +123-456-7890
            </button>

            {/* User Dropdown */}
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
              className="px-4 py-2 bg-gray-500 text-sm text-white hover:bg-blue-950 rounded-lg hidden sm:flex"
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
