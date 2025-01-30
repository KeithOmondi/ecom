import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../../../server";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("Please enter your email.");
    }

    try {
      // Send the email to the backend to request password reset
      const response = await axios.post(`${server}/user/forgot-password`, { email });

      if (response.status === 200) {
        toast.success("Password reset link sent to your email.");
        // Clear the input field and redirect to reset page
        setEmail("");
      }
    } catch (error) {
      console.error("Forgot Password Error:", error);
      const message =
        error.response?.data?.message || "Server error, please try again later.";
      toast.error(message);
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLZcoM9WgJdntMTpKH0kKDADp222A7kzqnw6k-t1PjcJHC5AaJ_F55q5jVz8_mPq8GxXE&usqp=CAU)",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      <div className="relative bg-white shadow-lg rounded-lg max-w-sm w-full p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Forgot Password</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter your email to reset your password.
        </p>
        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              placeholder="example@example.com"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
