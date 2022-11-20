import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { type IAccount } from "utils/types/account";

// import alpacaApi from "api/alpaca";
import { paperApi } from "api/alpaca";

export const fetchAccount = createAsyncThunk(
  "account/fetchAccount",
  async () => {
    const isAuthenticated = !!window.localStorage.getItem("auth-token");

    if (isAuthenticated) {
      try {
        const response = await paperApi.get("/account");
        // console.log("USER ACCOUNT:", response.data);

        if (response && response.data) {
          return response.data;
        }
      } catch (err) {
        console.log("FAILED:", err);
        return [];
      }
    }

    return [];
  }
);

export const fetchAccountActivities = createAsyncThunk(
  "account/fetchAccountActivities",
  async () => {
    const isAuthenticated = !!window.localStorage.getItem("auth-token");

    if (isAuthenticated) {
      try {
        const response = await paperApi.get("/account/activities");
        // console.log("USER ACCOUNT:", response.data);

        if (response && response.data) {
          return response.data;
        }
      } catch (err) {
        console.log("FAILED:", err);
        return [];
      }
    }

    return [];
  }
);

type SliceState = {
  status: null | "loading" | "completed" | "failed";
  activitiesStatus: null | "loading" | "completed" | "failed";
  data: null | IAccount;
  error: boolean;
  activitiesError: boolean;
  activities: any;
};

const accountSlice = createSlice({
  name: "account",
  initialState: {
    status: null,
    data: null,
    error: false,
    activities: null,
    activitiesStatus: null,
    activitiesError: false,
  } as SliceState,
  reducers: {
    // closeModal(state, action) {},
  },

  extraReducers(builder) {
    builder
      .addCase(fetchAccount.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAccount.fulfilled, (state, action) => {
        state.status = "completed";
        const data = action.payload;

        if (data) {
          state.data = data;
        } else {
          state.error = true;
          state.status = "failed";
        }
      })
      .addCase(fetchAccount.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      })
      .addCase(fetchAccountActivities.pending, (state) => {
        state.activitiesStatus = "loading";
      })
      .addCase(fetchAccountActivities.fulfilled, (state, action) => {
        state.activitiesStatus = "completed";
        const data = action.payload;

        if (data) {
          state.activities = data;
        }
      })
      .addCase(fetchAccountActivities.rejected, (state) => {
        state.activitiesStatus = "failed";
        state.activitiesError = true;
      });
  },
});

export const accountActions = accountSlice.actions;

export default accountSlice.reducer;
