import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPerformanceScoreData = createAsyncThunk(
  "performanceScore/fetchData",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { username, password } = getState().auth;
      if (!username || !password) {
        throw new Error("Not authenticated");
      }

      const response = await fetch(
        "http://3.111.196.92:8020/api/v1/sample_assignment_api_3/",
        {
          method: "GET",
          headers: {
            Authorization: "Basic " + btoa(`${username}:${password}`),
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorMessage = `Error ${response.status}: ${response.statusText}`;
        console.error(errorMessage);
        throw new Error("Failed to fetch performance score");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const performanceScoreSlice = createSlice({
  name: "performanceScore",
  initialState: {
    data: {
      message: "Your performance score is being calculated...",
      score: 0,
      title: "Performance Score",
    },
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerformanceScoreData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPerformanceScoreData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPerformanceScoreData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default performanceScoreSlice.reducer;
