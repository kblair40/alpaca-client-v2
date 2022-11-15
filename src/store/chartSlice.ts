import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type IWatchlistAsset } from "utils/types/watchlist";

import { alpaca } from "api";
import alpacaApi from "api/alpaca";

export const fetchTickerData = createAsyncThunk(
  "chart/fetchTickerData",
  async (data: { symbol: string; timeframe: string }) => {
    if (!data.symbol) return;
    const isAuthenticated = !!window.localStorage.getItem("auth-token");
    if (isAuthenticated) {
      try {
        const pricePromise = alpaca.get(`/price/${data.symbol}`, {
          params: { timeframe: data.timeframe },
        });

        const assetPromise = alpacaApi.get(`/assets/${data.symbol}`, {
          params: {
            status: "active",
            asset_class: "us_equity",
          },
        });

        const [prices, asset] = await Promise.all([pricePromise, assetPromise]);

        // console.log("\n\nPRICE RESPONSE:", response.data);
        if (prices && prices.data && asset && asset.data) {
          // return prices.data;
          return { prices: prices.data, asset: asset.data };
        }
        // if (response && response.data) {
        //   return response.data;
        // }
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
  asset: any;
  status: null | "loading" | "completed" | "failed";
  error: boolean;
  timeframe: string;
};

const chartSlice = createSlice({
  name: "chart",
  initialState: {
    data: null,
    ticker: null,
    asset: null,
    status: null,
    error: false,
    timeframe: "1D",
  } as SliceState,
  reducers: {
    setTicker(state, action) {
      state.ticker = action.payload;
    },
    changeTimeframe(state, action) {
      state.timeframe = action.payload;
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
        // console.log("FULFILLED DATA:", data);

        if (data) {
          state.data = data.prices;
          state.asset = data.asset;
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
