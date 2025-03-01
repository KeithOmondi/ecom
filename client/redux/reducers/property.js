import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  property: null,
  properties: [],
  allProperties: [],
  error: null,
  success: false,
  message: null,
};

export const propertyReducer = createReducer(initialState, (builder) => {
  builder
    // Create Property
    .addCase("propertyCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("propertyCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.property = action.payload;
      state.success = true;
    })
    .addCase("propertyCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    // Get all properties of an agent
    .addCase("getAllPropertyAgentRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllPropertyAgentSuccess", (state, action) => {
      state.isLoading = false;
      state.properties = action.payload;
    })
    .addCase("getAllPropertyAgentFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Delete Property
    .addCase("deletePropertyRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deletePropertySuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("deletePropertyFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Get all properties
    .addCase("getAllPropertyRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllPropertySuccess", (state, action) => {
      state.isLoading = false;
      state.allProperties = action.payload;
    })
    .addCase("getAllPropertyFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Clear Errors
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
