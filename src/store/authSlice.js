import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
  roleId: localStorage.getItem("roleId") || null,
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.roleId = action.payload.roleId;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("roleId", action.payload.roleId);
    },
    logout(state) {
      state.token = null;
      state.userId = null;
      state.roleId = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("roleId");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
