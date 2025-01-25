import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../../server";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();
  const [ email, setEmail] = useState("");
  const [ password, setPassword] = useState("");
  const [visible, setVisible] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
        return toast.error("Please provide both email and password");
    }

    await axios.post(`${server}/user/login-user`, {
      email,
      password,
  }, { withCredentials: true })
  .then((response) => {
      if (response.status === 200) {
          toast.success("Login Successful");
          navigate("/");
          window.location.reload(true);
      } else {
          toast.error("Unexpected response status: " + response.status);
      }
  })
  .catch((error) => {
      const message = error.response?.data?.message || "An error occurred";
      toast.error(message);
  });
  
};


  return (
    <div
    className="h-screen bg-cover bg-center flex items-center justify-center relative"
    style={{
      backgroundImage:
        "url(https://png.pngtree.com/thumb_back/fh260/background/20230328/pngtree-living-room-interior-home-life-background-image_2119870.jpg)",
    }}
  >
    {/* Blur Overlay */}
    <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
  
    {/* Login Box */}
    <div className="relative bg-white shadow-lg rounded-lg max-w-md w-full p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Welcome Back
      </h2>
      <p className="text-sm text-gray-500 text-center mt-2">
        Please login to your account
      </p>
      <form className="mt-6" onSubmit={handleSubmit}>
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
            autoComplete="name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
           className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-gray-700"
            placeholder="example@example.com"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
  <input
    type={visible ? "text" : "password"}
    id="password"
    name="password"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-gray-700"
  />
  {visible ? (
    <AiOutlineEye
      className="absolute inset-y-0 right-2 top-2 flex items-center cursor-pointer"
      size={25}
      onClick={() => setVisible(false)}
      aria-label="Hide password"
    />
  ) : (
    <AiOutlineEyeInvisible
      className="absolute inset-y-0 right-2 top-2 flex items-center cursor-pointer"
      size={25}
      onClick={() => setVisible(true)}
      aria-label="Show password"
    />
  )}
</div>

        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              Remember me
            </label>
          </div>
          <button
              type="button"
              onClick={() => navigate("/forgot-password")} 
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Forgot your password?
            </button>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account?
        <Link
          to="/signup"
          className="text-blue-600 font-medium hover:underline"
        >
          Sign up here
        </Link>
      </p>
    </div>
  </div>
  
  );
};

export default Login;
