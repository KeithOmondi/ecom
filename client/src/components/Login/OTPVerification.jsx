import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState(60); // 60 seconds countdown
  const navigate = useNavigate();

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      return toast.error("Please enter the OTP.");
    }

    try {
      const response = await axios.post(`/user/verify-otp`, { otp });
      if (response.status === 200) {
        toast.success("OTP Verified Successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP.");
    }
  };

  const resendOtp = async () => {
    try {
      const response = await axios.post(`/user/resend-otp`);
      if (response.status === 200) {
        toast.success("OTP resent successfully.");
        setCounter(60); // Reset the countdown
      }
    } catch {
      toast.error("Failed to resend OTP.");
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVgIOX-gnBM8M5NGDD12poL1UqDYIbjBnEoRvA6nus3eCDZnMC1jHyBt2B93EhUw799W8&usqp=CAU)",
      }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Reset Password Box */}
      <div className="relative bg-white shadow-lg rounded-lg max-w-sm w-full p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Verify OTP</h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter the OTP sent to your email.
        </p>
        <form onSubmit={handleVerifyOtp}>
          <div className="mb-4">
            <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
              placeholder="Enter OTP"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Verify OTP
          </button>
        </form>
        <div className="mt-4 text-center">
          {counter > 0 ? (
            <p className="text-sm text-gray-500">
              Resend OTP in <span className="text-blue-600">{counter}s</span>
            </p>
          ) : (
            <button
              onClick={resendOtp}
              className="text-sm text-blue-600 hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
