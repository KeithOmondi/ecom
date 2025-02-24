import axios from "axios";
import { server } from "../../server";

// Get all orders of user
export const getAllBookingsOfUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "getAllBookingsUserRequest" });

    const { data } = await axios.get(`${server}/order/get-all-bookings/${userId}`);
    
    console.log("User bookings response:", data); // Debugging log

    dispatch({
      type: "getAllBookingsUserSuccess",
      payload: data.orders,
    });
  } catch (error) {
    console.error("Error fetching user bookings:", error.response?.data?.message || error.message); // Debugging log

    dispatch({
      type: "getAllBookingsUserFailed", // ✅ Fixed typo here
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};

// Get all orders of seller
export const getAllBookingsProperty = (shopId) => async (dispatch) => {
  try {
    dispatch({ type: "getAllBookingsPropertyRequest" });

    const { data } = await axios.get(`${server}/order/get-agent-all-orders/${shopId}`);
    
    console.log("Property bookings response:", data); // Debugging log

    dispatch({
      type: "getAllBookingsPropertySuccess",
      payload: data.orders,
    });
  } catch (error) {
    console.error("Error fetching property bookings:", error.response?.data?.message || error.message); // Debugging log

    dispatch({
      type: "getAllBookingsPropertyFailed",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};

// Get all orders of Admin
export const getAllBookingsOfAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: "adminAllBookingsRequest" });

    const { data } = await axios.get(`${server}/order/admin-all-bookings`, {
      withCredentials: true,
    });
    
    console.log("Admin bookings response:", data); // Debugging log

    dispatch({
      type: "adminAllBookingsSuccess",
      payload: data.orders,
    });
  } catch (error) {
    console.error("Error fetching admin bookings:", error.response?.data?.message || error.message); // Debugging log

    dispatch({
      type: "adminAllBookingsFailed",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};
