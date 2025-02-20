import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import { Checkbox } from "@headlessui/react";
import Header from "../Layout/Header";

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [mpesaNumber, setMpesaNumber] = useState("");
    const [bank, setBank] = useState("");

    // Load cart from localStorage
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    // Remove item from cart
    const handleRemove = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Select/Deselect all items
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cart.map(item => item.id));
        }
        setSelectAll(!selectAll);
    };

    // Toggle item selection
    const handleSelectItem = (id) => {
        setSelectedItems((prev) =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    // Open Checkout Modal
    const handleCheckout = () => {
        if (selectedItems.length === 0) return;
        setShowCheckout(true);
    };

    return (
        <>
            <Header />

            <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
                <h1 className="text-3xl text-blue-950 font-bold mb-6">Renting Cart</h1>

                <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-3xl">
                    {/* Select All Button */}
                    <div className="flex justify-between mb-4">
                        <button
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                            onClick={handleSelectAll}
                        >
                            {selectAll ? "Deselect All" : "Select All"}
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="space-y-4">
                        {cart.length > 0 ? (
                            cart.map(({ id, name, price }) => (
                                <motion.div
                                    key={id}
                                    className="p-4 bg-gray-200 rounded flex justify-between items-center"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="flex items-center space-x-4">
                                        <Checkbox
                                            checked={selectedItems.includes(id)}
                                            onChange={() => handleSelectItem(id)}
                                            className="w-5 h-5 border border-gray-400 rounded focus:ring-2 focus:ring-blue-600"
                                        />
                                        <span className="text-gray-800 font-medium">{name} - KES {price.toLocaleString()}</span>
                                    </div>
                                    <button
                                        className="text-red-600 hover:text-red-800 transition"
                                        onClick={() => handleRemove(id)}
                                    >
                                        <FaTrash />
                                    </button>
                                </motion.div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center">Your cart is empty.</p>
                        )}
                    </div>

                    {/* Checkout Button */}
                    <button
                        className={`mt-6 w-full py-2 rounded transition ${
                            selectedItems.length > 0
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : "bg-gray-400 text-gray-300 cursor-not-allowed"
                        }`}
                        onClick={handleCheckout}
                        disabled={selectedItems.length === 0}
                    >
                        Checkout ({selectedItems.length} items)
                    </button>
                </div>

                {/* Checkout Modal */}
                <Dialog open={showCheckout} onClose={() => setShowCheckout(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <Dialog.Title className="text-xl font-bold text-center">Choose Payment Method</Dialog.Title>

                        <div className="mt-4 space-y-3">
                            <button
                                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                                onClick={() => setPaymentMethod("mpesa")}
                            >
                                Pay via Mpesa
                            </button>
                            <button
                                className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition"
                                onClick={() => setPaymentMethod("bank")}
                            >
                                Pay via Bank
                            </button>
                        </div>

                        {/* Mpesa Payment Form */}
                        {paymentMethod === "mpesa" && (
                            <div className="mt-4">
                                <label className="block text-sm font-bold text-gray-700">Enter Mpesa Number</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded mt-1 focus:ring focus:ring-blue-300"
                                    value={mpesaNumber}
                                    onChange={(e) => setMpesaNumber(e.target.value)}
                                    placeholder="e.g. 0712345678"
                                />
                                <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition">Submit</button>
                            </div>
                        )}

                        {/* Bank Payment Form */}
                        {paymentMethod === "bank" && (
                            <div className="mt-4">
                                <label className="block text-sm font-bold text-gray-700">Select Bank</label>
                                <select
                                    className="w-full p-2 border rounded mt-1 focus:ring focus:ring-yellow-300"
                                    value={bank}
                                    onChange={(e) => setBank(e.target.value)}
                                >
                                    <option value="">Select a Bank</option>
                                    <option value="KCB">KCB</option>
                                    <option value="Equity">Equity</option>
                                    <option value="Co-op Bank">Co-op Bank</option>
                                </select>

                                <label className="block text-sm font-bold mt-2 text-gray-700">Enter Amount</label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded mt-1 focus:ring focus:ring-yellow-300"
                                    placeholder="Amount in KES"
                                />

                                <button className="mt-2 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded transition">Pay</button>
                            </div>
                        )}

                        <button
                            className="mt-4 w-full bg-gray-400 hover:bg-gray-500 text-white py-2 rounded transition"
                            onClick={() => setShowCheckout(false)}
                        >
                            Close
                        </button>
                    </Dialog.Panel>
                </Dialog>
            </div>
        </>
    );
}
