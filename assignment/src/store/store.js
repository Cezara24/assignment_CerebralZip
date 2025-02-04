import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import financialSummaryReducer from "./slices/financialSummarySlice";
import performanceScoreReducer from "./slices/performanceScoreSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    financialSummary: financialSummaryReducer,
    performanceScore: performanceScoreReducer,
  },
});
