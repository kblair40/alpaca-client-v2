import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { alpaca } from "api";

export const fetchWatchlists = createAsyncThunk(
  "watchlist/fetchWatchlists",
  async () => {
    const isAuthenticated = !!window.localStorage.getItem("auth-token");
    if (isAuthenticated) {
      try {
        const response = await alpaca.get(`/watchlists`);
        // console.log("USER DATA:", response.data);
        if (response && response.data) {
          return response.data;
        }
      } catch (err) {
        console.log("FAILED:", err);
        return null;
      }
    }
  }
);

type SliceState = {
  data: any[];
  status: null | "loading" | "completed" | "failed";
  error: boolean;
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    data: [],
    status: null,
    error: false,
  } as SliceState,
  reducers: {
    addWatchlist(state, action) {
      state.data = [...state.data, action.payload];
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchWatchlists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWatchlists.fulfilled, (state, action) => {
        state.status = "completed";
        const data = action.payload;
        console.log("FULFILLED DATA:", data);

        if (data) {
          state.data = data;
        } else {
          state.error = true;
          state.status = "failed";
        }
      })
      .addCase(fetchWatchlists.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      });
  },
});

export const watchlistActions = watchlistSlice.actions;

export default watchlistSlice.reducer;
