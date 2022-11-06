import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    authenticated: {
      local: Boolean(window.localStorage.getItem("auth-token")),
      alpaca: Boolean(window.localStorage.getItem("alpaca-token")),
    },
  },
  reducers: {
    setUserData(state, action) {
      const { data, isAuthenticated } = action.payload;
      state.data = data;

      if (isAuthenticated !== undefined) {
        state.authenticated.local = isAuthenticated;
      }
    },
    setIsAuthenticated(state, action) {
      state.authenticated.local = action.payload.data;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
