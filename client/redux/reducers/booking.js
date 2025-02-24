import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  adminOrderLoading: false,
  orders: [],
  adminOrders: [],
  error: null,
};

export const bookingReducer = createReducer(initialState, (builder) => {
  builder
    // Get all bookings for user
    .addCase("getAllBookingsUserRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllBookingsUserSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getAllBookingsUserFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Get all bookings for property
    .addCase("getAllBookingsPropertyRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllBookingsPropertySuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getAllBookingsPropertyFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Get all bookings for admin
    .addCase("adminAllBookingsRequest", (state) => {
      state.adminOrderLoading = true;
    })
    .addCase("adminAllBookingsSuccess", (state, action) => {
      state.adminOrderLoading = false;
      state.adminOrders = action.payload;
    })
    .addCase("adminAllBookingsFailed", (state, action) => {
      state.adminOrderLoading = false;
      state.error = action.payload;
    })

    // Clear errors
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
