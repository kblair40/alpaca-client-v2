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
    logoutLocal(state) {
      state.authenticated.local = false;
    },
    logoutAlpaca(state) {
      console.log("\nLOGGING OUT OF ALPACA\n");
      state.authenticated.alpaca = false;
    },
    loginAlpaca(state) {
      console.log("\nLOGGING IN TO ALPACA\n");
      state.authenticated.alpaca = true;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
