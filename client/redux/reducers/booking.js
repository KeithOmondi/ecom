import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  adminOrderLoading: false,
  userBookings: [], 
  propertyBookings: [],
  adminBookings: [],
  error: null,
};

export const bookingReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("getAllBookingsUserRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllBookingsUserSuccess", (state, action) => {
      state.isLoading = false;
      state.userBookings = action.payload; // Store user bookings separately
    })
    .addCase("getAllBookingsUserFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    .addCase("getAllBookingsPropertyRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllBookingsPropertySuccess", (state, action) => {
      state.isLoading = false;
      state.propertyBookings = action.payload; // Store property bookings separately
    })
    .addCase("getAllBookingsPropertyFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    .addCase("adminAllBookingsRequest", (state) => {
      state.adminOrderLoading = true;
    })
    .addCase("adminAllBookingsSuccess", (state, action) => {
      state.adminOrderLoading = false;
      state.adminBookings = action.payload; // Store admin bookings separately
    })
    .addCase("adminAllBookingsFailed", (state, action) => {
      state.adminOrderLoading = false;
      state.error = action.payload;
    })

    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
