import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { type Position } from "utils/types/position";
import { alpaca } from "api";

export const fetchPositions = createAsyncThunk(
  "position/fetchPositions",
  async () => {
    const isAuthenticated = !!window.localStorage.getItem("auth-token");
    let res = {};
    if (isAuthenticated) {
      try {
        const response = await alpaca.get(`/position`);
        console.log("POSITIONS RESPONSE:", response.data);
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

export const fetchQuote = createAsyncThunk("position/fetchQuote", async () => {
  const isAuthenticated = !!window.localStorage.getItem("auth-token");
  let res = {};
  if (isAuthenticated) {
    try {
      const response = await alpaca.get(`/position`);
      console.log("POSITIONS RESPONSE:", response.data);
      if (response && response.data) {
        res = response.data;
      }
    } catch (err) {
      console.log("FAILED:", err);
      return null;
    }
  }
  return res;
});

type SliceState = {
  data: null | Position[];
  status: null | "loading" | "completed" | "failed";
  error: boolean;
  selectedTickerPosition: any;
};

const positionSlice = createSlice({
  name: "position",
  initialState: {
    data: null,
    status: null,
    error: false,
    selectedTickerPosition: null,
  } as SliceState,
  reducers: {
    setSelectedPosition(state, action) {
      state.selectedTickerPosition = action.payload;
    },
    removeSelectedPosition(state) {
      state.selectedTickerPosition = null;
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
        state.status = "loading";
      })
      .addCase(fetchQuote.fulfilled, (state, action) => {
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
      .addCase(fetchQuote.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      });
  },
});

export const positionActions = positionSlice.actions;

export default positionSlice.reducer;
