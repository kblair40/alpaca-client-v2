import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type IWatchlistAsset } from "utils/types/watchlist";

import { alpaca } from "api";

export const fetchTickerData = createAsyncThunk(
  "chart/fetchTickerData",
  async (symbol: string) => {
    if (!symbol) return;
    const isAuthenticated = !!window.localStorage.getItem("auth-token");
    if (isAuthenticated) {
      try {
        // const response = await alpaca.get(`/price/${symbol}/latest`);
        const response = await alpaca.get(`/price/${symbol}`);
        console.log("\n\nPRICE RESPONSE:", response.data);
        if (response && response.data) {
          return response.data;
        }
      } catch (err) {
        console.log("FAILED TO FETCH PRICE:", err);
        return null;
      }
    }
    return {};
  }
);

type SliceState = {
  data: any;
  ticker: IWatchlistAsset | null;
  status: null | "loading" | "completed" | "failed";
  error: boolean;
};

const chartSlice = createSlice({
  name: "chart",
  initialState: {
    data: null,
    ticker: null,
    status: null,
    error: false,
  } as SliceState,
  reducers: {
    setTicker(state, action) {
      state.ticker = action.payload;
    },
    clearChart(state) {
      state.data = [];
      state.ticker = null;
      state.status = null;
      state.error = false;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchTickerData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTickerData.fulfilled, (state, action) => {
        state.status = "completed";
        const data = action.payload;
        console.log("FULFILLED DATA:", data);

        if (data) {
          state.data = data;
          if (state.error) state.error = false;
        } else {
          state.error = true;
          state.status = "failed";
        }
      })
      .addCase(fetchTickerData.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      });
  },
});

export const chartActions = chartSlice.actions;

export default chartSlice.reducer;
