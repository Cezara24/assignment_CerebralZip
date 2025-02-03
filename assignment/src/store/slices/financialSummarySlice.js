import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFinancialSummary = createAsyncThunk(
  "financialSummary/fetchData",
  async (_, { getState, rejectWithValue }) => {
    try {
      // Obținem username și parola din Redux Store
      const { username, password } = getState().auth;

      if (!username || !password) {
        throw new Error("Not authenticated");
      }

      const response = await fetch("http://3.111.196.92:8020/api/v1/sample_assignment_api_1/", {
        method: "GET",
        headers: {
          Authorization: "Basic " + btoa(`${username}:${password}`),
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorMessage = `Error ${response.status}: ${response.statusText}`;
        console.error(errorMessage);
        throw new Error("Failed to fetch financial summary");
      }

      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const financialSummarySlice = createSlice({
  name: "financialSummary",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFinancialSummary.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFinancialSummary.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchFinancialSummary.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default financialSummarySlice.reducer;
