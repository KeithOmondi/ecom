import PropTypes from "prop-types";
import { motion } from "framer-motion";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CloseIcon from "@mui/icons-material/Close";

const LoginModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-md z-50">
            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative bg-white p-6 rounded-xl shadow-2xl w-96 max-w-md text-center border-t-4 border-red-600"
            >
                {/* Warning Icon */}
                <div className="flex justify-center">
                    <WarningAmberIcon className="text-red-600" fontSize="large" />
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mt-3">Access Restricted!</h2>
                <p className="text-gray-600 mt-2">
                    ⚠️ You need to log in to access this page.
                </p>

                {/* Login Button */}
                <button
                    onClick={() => {
                        onClose();
                        window.location.href = "/login";
                    }}
                    className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                >
                    <WarningAmberIcon fontSize="small" /> Go to Login
                </button>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <CloseIcon />
                </button>
            </motion.div>
        </div>
    );
};

LoginModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default LoginModal;
