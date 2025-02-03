import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import financialSummaryReducer from "./slices/financialSummarySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    financialSummary: financialSummaryReducer,
  },
});
