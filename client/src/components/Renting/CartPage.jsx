import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import { Checkbox } from "@headlessui/react";

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [showCheckout, setShowCheckout] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [mpesaNumber, setMpesaNumber] = useState("");
    const [bank, setBank] = useState("");

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
    }, []);

    const handleRemove = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(cart.map(item => item.id));
        }
        setSelectAll(!selectAll);
    };

    const handleSelectItem = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const handleCheckout = () => {
        if (selectedItems.length === 0) return;
        setShowCheckout(true);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
            <h1 className="text-3xl text-blue-950 font-bold mb-6">Renting Cart</h1>
            <div className="bg-white shadow-lg p-6 rounded-lg w-full max-w-3xl">
                <div className="flex justify-between mb-4">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSelectAll}>
                        {selectAll ? "Deselect All" : "Select All"}
                    </button>
                </div>
                <div className="space-y-4">
                    {cart.map(({ id, name, price }, index) => (
                        <motion.div key={id || index} className="p-4 bg-gray-200 rounded flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <Checkbox
                                    checked={selectedItems.includes(id)}
                                    onChange={() => handleSelectItem(id)}
                                    className="w-5 h-5 border border-gray-400 rounded focus:ring-2 focus:ring-blue-600"
                                />
                                <span>{name} - KES {price.toLocaleString()}</span>
                            </div>
                            <button className="text-red-600" onClick={() => handleRemove(id)}><FaTrash /></button>
                        </motion.div>
                    ))}
                </div>
                <button
                    className={`mt-6 w-full py-2 rounded ${selectedItems.length > 0 ? "bg-green-600 text-white" : "bg-gray-400 text-gray-300 cursor-not-allowed"}`}
                    onClick={handleCheckout}
                    disabled={selectedItems.length === 0}>
                    Checkout ({selectedItems.length} items)
                </button>
            </div>

            <Dialog open={showCheckout} onClose={() => setShowCheckout(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <Dialog.Panel className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <Dialog.Title className="text-xl font-bold">Choose Payment Method</Dialog.Title>
                    <div className="mt-4 space-y-3">
                        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setPaymentMethod("mpesa")}>Pay via Mpesa</button>
                        <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded" onClick={() => setPaymentMethod("bank")}>Pay via Bank</button>
                    </div>
                    {paymentMethod === "mpesa" && (
                        <div className="mt-4">
                            <label className="block text-sm font-bold">Enter Mpesa Number</label>
                            <input type="text" className="w-full p-2 border rounded mt-1" value={mpesaNumber} onChange={(e) => setMpesaNumber(e.target.value)} />
                            <button className="mt-2 w-full bg-blue-600 text-white py-2 rounded">Submit</button>
                        </div>
                    )}
                    {paymentMethod === "bank" && (
                        <div className="mt-4">
                            <label className="block text-sm font-bold">Select Bank</label>
                            <select className="w-full p-2 border rounded mt-1" value={bank} onChange={(e) => setBank(e.target.value)}>
                                <option value="">Select a Bank</option>
                                <option value="KCB">KCB</option>
                                <option value="Equity">Equity</option>
                                <option value="Co-op Bank">Co-op Bank</option>
                            </select>
                            <label className="block text-sm font-bold mt-2">Enter Amount</label>
                            <input type="number" className="w-full p-2 border rounded mt-1" />
                            <button className="mt-2 w-full bg-yellow-500 text-white py-2 rounded">Pay</button>
                        </div>
                    )}
                    <button className="mt-4 w-full bg-gray-400 text-white py-2 rounded" onClick={() => setShowCheckout(false)}>Close</button>
                </Dialog.Panel>
            </Dialog>
        </div>
    );
}
