import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "api";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const isAuthenticated = !!window.localStorage.getItem("auth-token");
  let res = {};
  if (isAuthenticated) {
    try {
      const response = await api.get(`/user`);
      // console.log("USER DATA:", response.data);
      if (response && response.data) {
        res = response.data;
      }
    } catch (err) {
      console.log("FAILED:", err);
      return null;
    }
  }
  return res;
});

type SliceState = {
  data: any;
  status: null | "loading" | "completed" | "failed";
  error: boolean;
  authenticated: { local: boolean; alpaca: boolean };
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    status: null,
    error: false,
    authenticated: {
      local: Boolean(window.localStorage.getItem("auth-token")),
      alpaca: Boolean(window.localStorage.getItem("alpaca-token")),
    },
  } as SliceState,
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

  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "completed";
        const data = action.payload;
        // console.log("\n\nUSER DATA DATA:", data);

        if (data) {
          state.data = data;
        } else {
          state.error = true;
          state.status = "failed";
        }
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      });
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
