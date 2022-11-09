import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { alpaca } from "api";

export const fetchTickerData = createAsyncThunk(
  "chart/fetchTickerData",
  async () => {
    // const isAuthenticated = !!window.localStorage.getItem("auth-token");
    // if (isAuthenticated) {
    //   try {
    //     const response = await alpaca.get(`/watchlists`);
    //     if (response && response.data) {
    //       return response.data;
    //     }
    //   } catch (err) {
    //     console.log("FAILED:", err);
    //     return null;
    //   }
    // }
    return {};
  }
);

type SliceState = {
  data: any;
  symbol: string;
  status: null | "loading" | "completed" | "failed";
  error: boolean;
};

const chartSlice = createSlice({
  name: "chart",
  initialState: {
    data: [],
    symbol: "",
    status: null,
    error: false,
  } as SliceState,
  reducers: {
    clear(state, action) {
      state.data = [];
      state.symbol = "";
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
          state.data = data;
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
