import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { type Position } from "utils/types/position";
import { alpaca } from "api";
// import alpacaApi from "api/alpaca";

export const fetchPositions = createAsyncThunk(
  "position/fetchPositions",
  async () => {
    const isAuthenticated = !!window.localStorage.getItem("auth-token");
    let res = {};
    if (isAuthenticated) {
      try {
        const response = await alpaca.get(`/position`);
        // console.log("POSITIONS RESPONSE:", response.data);
        if (response && response.data) {
          res = response.data;
        }
      } catch (err) {
        console.log("FAILED:", err);
        return null;
      }
    }
    return res;
  }
);

export const fetchQuote = createAsyncThunk(
  "position/fetchQuote",
  async (symbol: string) => {
    console.log("SYMBOL TO FETCH:", symbol);
    const isAuthenticated = !!window.localStorage.getItem("auth-token");
    console.log("IS AUTH:", isAuthenticated);
    let res = {};
    if (isAuthenticated) {
      try {
        console.log("sending");
        // const response = await alpaca.get(`/price/${symbol}/latest`);
        const response = await alpaca.get(`/snapshot/${symbol}`);
        // console.log("POSITION SNAPSHOT RESPONSE:", response.data);
        if (response && response.data) {
          res = response.data;
        }
      } catch (err) {
        console.log("FAILED:", err);
        return null;
      }
    }
    return res;
  }
);

type SliceState = {
  data: null | Position[];
  status: null | "loading" | "completed" | "failed";
  quoteStatus: null | "loading" | "completed" | "failed";
  error: boolean;
  selectedTickerPosition: any;
  selectedTickerSnapshot: any;
};

const positionSlice = createSlice({
  name: "position",
  initialState: {
    data: null,
    status: null,
    error: false,
    selectedTickerPosition: null,
    selectedTickerSnapshot: null,
  } as SliceState,
  reducers: {
    setSelectedPosition(state, action) {
      state.selectedTickerPosition = action.payload;
    },
    removeSelectedPosition(state) {
      state.selectedTickerPosition = null;
      state.selectedTickerSnapshot = null;
    },
    removePosition(state, action) {
      const symbol = action.payload;
      if (state.data === null) return;

      const positions = [...state.data];

      const positionIdxToDelete = positions.findIndex((pos) => {
        return pos.symbol.toUpperCase() === symbol.toUpperCase();
      });

      if (positionIdxToDelete !== -1) {
        positions.splice(positionIdxToDelete, 1);
      }

      state.data = positions;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchPositions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPositions.fulfilled, (state, action) => {
        state.status = "completed";
        const data = action.payload;
        // console.log("\n\nUSER DATA DATA:", data);

        if (data) {
          state.data = data as Position[];
        } else {
          state.error = true;
          state.status = "failed";
        }
      })
      .addCase(fetchPositions.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      })
      .addCase(fetchQuote.pending, (state) => {
        state.quoteStatus = "loading";
      })
      .addCase(fetchQuote.fulfilled, (state, action) => {
        state.quoteStatus = "completed";
        const data = action.payload;
        console.log("\n\nSELECTED TICKER DATA:", data);

        if (data) {
          state.selectedTickerSnapshot = data;
        }
      })
      .addCase(fetchQuote.rejected, (state) => {
        state.quoteStatus = "failed";
        state.error = true;
      });
  },
});

export const positionActions = positionSlice.actions;

export default positionSlice.reducer;
