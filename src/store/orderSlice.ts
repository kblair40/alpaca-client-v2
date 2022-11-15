import { createSlice } from "@reduxjs/toolkit";
import { type IWatchlistAsset } from "utils/types/watchlist";

type SliceState = {
  asset: IWatchlistAsset | null; // standard asset object from alpaca;
};

const orderSlice = createSlice({
  name: "order",
  initialState: {
    asset: null,
  } as SliceState,
  reducers: {
    setAsset(state, action) {
      state.asset = action.payload;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
