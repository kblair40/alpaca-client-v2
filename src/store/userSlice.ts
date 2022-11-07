import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "api";

export const fetchCalendar = createAsyncThunk("user/fetchUser", async () => {
  const isAuthenticated = !!window.localStorage.getItem("auth-token");
  if (!isAuthenticated) {
    return {};
  }

  try {
    const response = await api.get(`/user`);
    if (response && response.data) {
      return response.data;
    } else {
      return {};
    }
  } catch (err) {
    console.error("FAILED:", err);
    return null;
  }
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
      .addCase(fetchCalendar.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCalendar.fulfilled, (state, action) => {
        state.status = "completed";
        const data = action.payload;

        console.log("DATA DATA:", data);

        if (!data) {
          return;
        }
      })
      .addCase(fetchCalendar.rejected, (state, action) => {
        state.status = "failed";
        state.error = true;
      });
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
