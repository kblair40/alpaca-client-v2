import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dayjs from "dayjs";

import alpacaApi from "api/alpaca";

export const fetchCorporateActions = createAsyncThunk(
  "corporateActions/fetchCorporateActions",
  async (symbol: string = "AAPL") => {
    const isAuthenticated = !!window.localStorage.getItem("auth-token");
    let res = {};
    let ninetyDaysAgo = dayjs().subtract(89, "day").format("YYYY-MM-DD");
    console.log("NINETY DAYS AGO:", ninetyDaysAgo);
    let now = dayjs().format("YYYY-MM-DD");

    if (isAuthenticated) {
      try {
        const response = await alpacaApi.get(
          `/corporate_actions/announcements`,
          {
            params: {
              ca_types: ["Dividend"].join(","),
              since: ninetyDaysAgo,
              until: now,
              symbol: symbol,
            },
          }
        );
        console.log("CORPORATE ACTIONS DATA:", response.data);
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
  data: any;
  status: null | "loading" | "completed" | "failed";
  error: boolean;
};

const corporateActionsSlice = createSlice({
  name: "corporateActions",
  initialState: {
    data: null,
    status: null,
    error: false,
  } as SliceState,
  reducers: {
    setActions(state, action) {
      state.data = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchCorporateActions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCorporateActions.fulfilled, (state, action) => {
        state.status = "completed";
        const data = action.payload;
        // console.log("\n\nUSER DATA DATA:", data);

        if (data) {
          state.data = data;
        } else {
          state.error = true;
          state.status = "failed";
        }
      })
      .addCase(fetchCorporateActions.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      });
  },
});

export const corporateActionsActions = corporateActionsSlice.actions;

export default corporateActionsSlice.reducer;
