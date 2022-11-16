import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type IWatchlistAsset } from "utils/types/watchlist";

import { alpaca } from "api";

export const fetchOrders = createAsyncThunk("order/fetchOrders", async () => {
  const isAuthenticated = !!window.localStorage.getItem("auth-token");

  if (isAuthenticated) {
    try {
      const response = await alpaca.get("/order");
      console.log("USER ORDERS:", response.data);

      if (response && response.data) {
        return response.data;
      }
    } catch (err) {
      console.log("FAILED:", err);
      return [];
    }
  }

  return [];
});

type SliceState = {
  asset: IWatchlistAsset | null; // standard asset object from alpaca;
  showModal: boolean;
  tickerSymbol: string;
  priceData: any;
  orders: any[];
  status: null | "loading" | "completed" | "failed";
  error: boolean;
};

const orderSlice = createSlice({
  name: "order",
  initialState: {
    asset: null,
    showModal: false,
    tickerSymbol: "",
    priceData: null,
    status: null,
    error: false,
    orders: [],
  } as SliceState,
  reducers: {
    openModal(state, action) {
      const { tickerSymbol, priceData, asset } = action.payload;
      // console.log("Symbol/Data/Asset:", { tickerSymbol, priceData, asset });
      if (tickerSymbol && priceData && asset) {
        state.tickerSymbol = tickerSymbol;
        state.priceData = priceData;
        state.asset = asset;
        state.showModal = true;
      }
    },
    closeModal(state) {
      state.asset = null;
      state.tickerSymbol = "";
      state.priceData = null;
      state.showModal = false;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "completed";
        const data = action.payload;
        console.log("\n\nUSER ORDERS DATA:", data);

        if (data) {
          state.orders = data;
        } else {
          state.error = true;
          state.status = "failed";
        }
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      });
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
