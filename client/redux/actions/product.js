import axios from "axios";
import { server } from "../../server";

// Create property
export const createProperty =
  (
    name,
    description,
    category,
    tags,
    originalPrice,
    discountPrice,
    stock,
    propertyId,
    images
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "propertyCreateRequest",
      });

      const { data } = await axios.post(`${server}/property/create-property`, {
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        propertyId,
        images,
      });

      dispatch({
        type: "propertyCreateSuccess",
        payload: data.property,
      });
    } catch (error) {
      dispatch({
        type: "propertyCreateFail",
        payload: error.response?.data?.message || "Something went wrong",
      });
    }
  };

// Get all properties of an agent
export const getAllPropertyAgent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllPropertyAgentRequest",
    });

    const { data } = await axios.get(
      `${server}/property/get-all-property-agent/${id}`
    );
    
    dispatch({
      type: "getAllPropertyAgentSuccess",
      payload: data.properties,
    });
  } catch (error) {
    dispatch({
      type: "getAllPropertyAgentFailed",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};

// Delete property
export const deleteProperty = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePropertyRequest",
    });

    const { data } = await axios.delete(
      `${server}/property/delete-shop-property/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deletePropertySuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletePropertyFailed",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};

// Get all properties
export const getAllProperty = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllPropertyRequest",
    });

    const { data } = await axios.get(`${server}/property/get-all-properties`);
    
    dispatch({
      type: "getAllPropertySuccess",
      payload: data.properties,
    });
  } catch (error) {
    dispatch({
      type: "getAllPropertyFailed",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};
