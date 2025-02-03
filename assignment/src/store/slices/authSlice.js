import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: localStorage.getItem("username") || null,
  password: localStorage.getItem("password") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      localStorage.setItem("username", action.payload.username);
      localStorage.setItem("password", action.payload.password);
    },
    logout: (state) => {
      state.username = null;
      state.password = null;
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
