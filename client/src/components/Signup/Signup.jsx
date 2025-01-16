import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {server} from "../../../server" 
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post(`${server}/user/create-user`, {
        name,
        email,
        password,
      });
      toast.success(res.data.message);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      // Use error.response to handle server errors
      const errorMessage =
        error.response?.data?.message || "Something went wrong, please try again.";
      toast.error(errorMessage);
    }
  };
  

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=600)",
      }}
    >
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Create Your Account
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Start your journey with us today!
        </p>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="John Doe"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              placeholder="example@example.com"
            />
          </div>
          
          <div className="mb-4 relative">
  <label
    htmlFor="password"
    className="block text-sm font-medium text-gray-700"
  >
    Password
  </label>
  <input
    type={visible ? "text" : "password"}
    id="password"
    name="password"
    autoComplete="current-password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
    placeholder="••••••••"
  />
  {visible ? (
    <AiOutlineEye
      className="absolute right-2 top-[2rem] cursor-pointer"
      size={25}
      onClick={() => setVisible(false)}
      aria-label="Hide password"
    />
  ) : (
    <AiOutlineEyeInvisible
      className="absolute right-2 top-[2rem] cursor-pointer"
      size={25}
      onClick={() => setVisible(true)}
      aria-label="Show password"
    />
  )}
</div>

          
          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
