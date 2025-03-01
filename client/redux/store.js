import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import {agentReducer } from "./reducers/agent"
import { bookingReducer } from "./reducers/booking";
import { propertyReducer } from "./reducers/property";

const store = configureStore({
  reducer: {
    user: userReducer,
    agent: agentReducer,
    booking: bookingReducer,
    property: propertyReducer,
  },
});

export default store;
