import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaWarehouse,
  FaBuilding,
  FaShoppingCart,
} from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Layout/Header";

const categories = [
  { name: "Warehouses", icon: FaWarehouse },
  { name: "Real Estate", icon: FaHome },
  { name: "Event Spaces", icon: FaBuilding },
  { name: "Office Spaces", icon: FaBuilding },
];

const listings = [
  {
    id: 1,
    category: "Warehouses",
    name: "Large Storage Unit",
    price: "KES 50,000",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2022/10/ZH/OT/OG/75867042/warehouse-for-long-lease-in-thane-500x500.jpeg",
  },
  {
    id: 2,
    category: "Real Estate",
    name: "3 Bedroom Apartment",
    price: "KES 80,000",
    image: "https://thumbs.dreamstime.com/b/apartment-building-19532951.jpg",
  },
  {
    id: 3,
    category: "Event Spaces",
    name: "Wedding Hall",
    price: "KES 100,000",
    image:
      "https://media.istockphoto.com/id/486993238/photo/interior-of-a-wedding-tent-decoration-ready-for-guests.jpg?s=612x612&w=0&k=20&c=Rco782IaCKFSr409we4GPy01-vc4taHweUuuFJJbegk=",
  },
  {
    id: 4,
    category: "Office Spaces",
    name: "Private Office",
    price: "KES 60,000",
    image:
      "https://t4.ftcdn.net/jpg/03/84/55/29/360_F_384552930_zPoe9zgmCF7qgt8fqSedcyJ6C6Ye3dFs.jpg",
  },
  {
    id: 5,
    category: "Real Estate",
    name: "Luxury Villa",
    price: "KES 250,000",
    image:
      "https://plus.unsplash.com/premium_photo-1682377521753-58d1fd9fa5ce?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bHV4dXJ5JTIwdmlsbGF8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 6,
    category: "Warehouses",
    name: "Industrial Storage",
    price: "KES 120,000",
    image:
      "https://villacarekenya.com/wp-content/uploads/2021/12/5whatsappimage2019-06-12at3.35.59pm.jpeg",
  },
];

export default function RentingPage() {
  const [selectedListing, setSelectedListing] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [filteredListings, setFilteredListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    queryParams.get("category") || "All"
  );

  useEffect(() => {
    const filtered =
      selectedCategory === "All"
        ? listings
        : listings.filter((item) => item.category === selectedCategory);
    setFilteredListings(filtered);
  }, [selectedCategory]);

  const handleRentClick = (listing) => {
    setSelectedListing(listing);
    setShowConfirmModal(true);
  };

  const confirmRent = () => {
    setShowConfirmModal(false);

    // Retrieve existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add the selected listing
    const updatedCart = [...existingCart, selectedListing];
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Navigate to cart page
    navigate("/rent/cart");
  };

  return (
    <>
    <Header />
    <div className="p-6 bg-gray-100 text-gray-900 min-h-screen">
      <motion.h1
        className="text-3xl font-bold text-center mb-6"
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -10 }}
      >
        Rent Your Ideal Space
      </motion.h1>

      {/* Filter Card */}
      <div className="bg-white shadow-md p-4 rounded-lg flex justify-center gap-4 mb-6">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-4 py-2 rounded ${
            selectedCategory === "All"
              ? "bg-blue-950 text-white"
              : "bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => setSelectedCategory(name)}
            className={`px-4 py-2 rounded flex items-center gap-2 ${
              selectedCategory === name
                ? "bg-blue-950 text-white"
                : "bg-gray-200"
            }`}
          >
            <Icon /> {name}
          </button>
        ))}
      </div>

      {/* Listings */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredListings.map(({ id, name, price, image }) => (
          <motion.div
            key={id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            whileHover={{ scale: 1.03 }}
          >
            <img src={image} alt={name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold">{name}</h2>
              <p className="text-lg text-blue-700 font-semibold">{price}</p>
              <button
                className="mt-4 w-full bg-blue-950 text-white flex items-center justify-center py-2 rounded hover:bg-blue-700"
                onClick={() => handleRentClick({ name, price })}
              >
                <FaShoppingCart className="mr-2" /> Rent Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Confirm Rent Modal */}
      <Dialog
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg">
          <Dialog.Title className="text-xl font-bold">
            Confirm Rental
          </Dialog.Title>
          <p className="mt-2">
            Are you sure you want to rent{" "}
            <span className="font-semibold">{selectedListing?.name}</span> for{" "}
            <span className="text-blue-600 font-semibold">
              {selectedListing?.price}
            </span>
            ?
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              onClick={() => setShowConfirmModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-700"
              onClick={confirmRent}
            >
              Add to Cart
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* Payment Selection Modal */}
      <Dialog
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg">
          <Dialog.Title className="text-xl font-bold">
            Choose Payment Method
          </Dialog.Title>
          <p className="mt-2">
            How would you like to pay for{" "}
            <span className="font-semibold">{selectedListing?.name}</span>?
          </p>
          <div className="mt-4 space-y-3">
            <button className="w-full px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-700">
              Pay via Mpesa
            </button>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Pay via Credit Card
            </button>
            <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
              Pay via PayPal
            </button>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              onClick={() => setShowPaymentModal(false)}
            >
              Close
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
    
    </>
  );
}
