import { createSlice } from "@reduxjs/toolkit";
import { type IWatchlistAsset } from "utils/types/watchlist";

type SliceState = {
  asset: IWatchlistAsset | null; // standard asset object from alpaca;
  showModal: boolean;
  tickerSymbol: string;
  priceData: any;
};

const orderSlice = createSlice({
  name: "order",
  initialState: {
    asset: null,
    showModal: false,
    tickerSymbol: "",
    priceData: null,
  } as SliceState,
  reducers: {
    openModal(state, action) {
      const { tickerSymbol, priceData, asset } = action.payload;
      console.log("Symbol/Data/Asset:", { tickerSymbol, priceData, asset });
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
    setAsset(state, action) {
      state.asset = action.payload;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
