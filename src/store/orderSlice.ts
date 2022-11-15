import { createSlice } from "@reduxjs/toolkit";
import { type IWatchlistAsset } from "utils/types/watchlist";

type SliceState = {
  asset: IWatchlistAsset | null; // standard asset object from alpaca;
  showModal: boolean;
};

const orderSlice = createSlice({
  name: "order",
  initialState: {
    asset: null,
    showModal: false,
  } as SliceState,
  reducers: {
    openModal(state) {
      state.showModal = true;
    },
    closeModal(state) {
      state.showModal = false;
    },
    setAsset(state, action) {
      state.asset = action.payload;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
