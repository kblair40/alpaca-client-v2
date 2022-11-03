import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userAuth",
  initialState: {
    data: {},
    isAuthenticated: false,
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
        state.isAuthenticated = isAuthenticated;
      }
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload.data;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
