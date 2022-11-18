import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// import { alpaca } from "api";
import alpacaApi from "api/alpaca";

export const fetchAccount = createAsyncThunk(
  "account/fetchAccount",
  async () => {
    const isAuthenticated = !!window.localStorage.getItem("auth-token");

    if (isAuthenticated) {
      try {
        const response = await alpacaApi.get("/account");
        console.log("USER ACCOUNT:", response.data);

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
  data: any;
  error: boolean;
};

const accountSlice = createSlice({
  name: "account",
  initialState: {
    status: null,
    data: null,
    error: false,
  } as SliceState,
  reducers: {
    // closeModal(state) {},
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
      });
  },
});

export const accountActions = accountSlice.actions;

export default accountSlice.reducer;
