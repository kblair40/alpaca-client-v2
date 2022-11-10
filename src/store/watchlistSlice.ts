import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { alpaca } from "api";

export const fetchWatchlists = createAsyncThunk(
  "watchlist/fetchWatchlists",
  async () => {
    const isAuthenticated = !!window.localStorage.getItem("auth-token");
    if (isAuthenticated) {
      try {
        const response = await alpaca.get(`/watchlists`);
        // console.log("WATCHLIST DATA:", response.data);
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
  prices: any;
  status: null | "loading" | "completed" | "failed";
  error: boolean;
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    data: [],
    prices: null,
    status: null,
    error: false,
  } as SliceState,
  reducers: {
    addWatchlist(state, action) {
      state.data = [action.payload, ...state.data];
    },
    deleteWatchlist(state, action) {
      const id = action.payload;
      const wlCopy = [...state.data];
      const wlIndex = wlCopy.findIndex((wl) => wl.id === id);

      if (wlIndex !== -1) {
        wlCopy.splice(wlIndex, 1);
        state.data = wlCopy;
      }
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchWatchlists.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWatchlists.fulfilled, (state, action) => {
        state.status = "completed";
        // const data = action.payload;
        // console.log("FULFILLED DATA:", data);
        const { watchlists, prices } = action.payload;

        // console.log("PRICES:", prices);

        if (watchlists) {
          state.data = watchlists;
          state.prices = prices;
        } else {
          state.error = true;
          state.status = "failed";
        }
        // if (data) {
        //   state.data = data;
        // } else {
        //   state.error = true;
        //   state.status = "failed";
        // }
      })
      .addCase(fetchWatchlists.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      });
  },
});

export const watchlistActions = watchlistSlice.actions;

export default watchlistSlice.reducer;
