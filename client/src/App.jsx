import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import SignupPage from "./pages/auth/Signup";
import { ToastContainer } from "react-toastify";
import ActivationPage from "./pages/auth/ActivationPage";
import Loader from "./components/Loader/Loader";
import HomePage from "./pages/dashboard/HomePage";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgotPassword from "./pages/auth/ForgotPasswordPage";
import OtpPage from "./pages/auth/otp";
import RentingPage from "./components/Renting/RentingPage";
import BlogAndEventsPage from "./components/BlogsAndEvents/BlogAndEventsPage";
import CartPage from "./components/Renting/CartPage";
//import LoginModal from "./components/Login/LoginModal";
// //mport PropTypes from "prop-types";
import AdminDashboardPage from "./pages/AdminDashboardPage";
//import ProtectedAdminRoute from "./components/routes/ProtectedAdminRoute";
import PropertyDashboardPage from "./pages/property/PropertyDashboardPage";
import AdminDashboardUsers from "./pages/AdminDashboardUsers";
import AdminDashboardAgents from "./pages/AdminDashboardAgents";
//import ProtectedRoute from "./components/routes/ProtectedRoute";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  {
    /*const authRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/login/otp",
  ];*/
  }

  {
    /*const isAuthPage = authRoutes.includes(location.pathname) || location.pathname.startsWith("/reset-password/");*/
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/activation/:activation_token"
              element={<ActivationPage />}
            />
            <Route path="/login/otp" element={<OtpPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin-users" element={<AdminDashboardUsers />} />
            <Route
              path="/agent-dashboard"
              element={<PropertyDashboardPage />}
            />
            <Route
              path="/admin-agents"
              element={<AdminDashboardAgents />}
            />

            {/* Protected Routes */}
            <Route path="/rent" element={<RentingPage />} />
            <Route path="/rent/cart" element={<CartPage />} />

            <Route path="/events" element={<BlogAndEventsPage />} />
          </Routes>
        </>
      )}

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
