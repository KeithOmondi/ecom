import axios from "axios";
import { server } from "../../server";

// Get all bookings of a user
export const getAllBookingsOfUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "getAllBookingsUserRequest" });

    const { data } = await axios.get(`${server}/api/v2/booking/get-all-bookings/${userId}`);

    dispatch({
      type: "getAllBookingsUserSuccess",
      payload: data.bookings,
    });
  } catch (error) {
    dispatch({
      type: "getAllBookingsUserFailed",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};

// Get all bookings for a property
export const getAllBookingsProperty = (propertyId) => async (dispatch) => {
  try {
    dispatch({ type: "getAllBookingsPropertyRequest" });

    const { data } = await axios.get(`${server}/api/v2/booking/get-property-all-bookings/${propertyId}`);

    dispatch({
      type: "getAllBookingsPropertySuccess",
      payload: data.bookings,
    });
  } catch (error) {
    dispatch({
      type: "getAllBookingsPropertyFailed",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};

// Get all bookings (Admin)
export const getAllBookingsOfAdmin = () => async (dispatch) => {
  try {
    dispatch({ type: "adminAllBookingsRequest" });

    const { data } = await axios.get(`${server}/api/v2/booking/admin-all-bookings`, {
      withCredentials: true,
    });

    dispatch({
      type: "adminAllBookingsSuccess",
      payload: data.bookings,
    });
  } catch (error) {
    dispatch({
      type: "adminAllBookingsFailed",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};
