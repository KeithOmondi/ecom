import axios from "axios";
import { server } from "../../server";

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });

    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });

    dispatch({
      type: "LoadUserSuccess",
      payload: {
        user: data.user,
        role: data.user.role, // Assuming API response contains user.role
      },
    });
  } catch (error) {
    console.error("LoadUser Error:", error); // Debugging

    dispatch({
      type: "LoadUserFail",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};

// Example of exporting a function
export const getAllUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${server}/user/getallusers`, {
      withCredentials: true,
    });

    dispatch({
      type: "GetAllUsersSuccess",
      payload: data.users,
    });
  } catch (error) {
    console.error("GetAllUsers Error:", error);

    dispatch({
      type: "GetAllUsersFail",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};
