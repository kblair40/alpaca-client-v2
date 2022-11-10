import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { type Clock } from "utils/types/clock";
// import { alpaca } from "api";
import alpacaApi from "api/alpaca";

const getStartAndEnd = () => {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const oneYearInFuture = new Date();
  oneYearInFuture.setFullYear(oneYearInFuture.getFullYear() + 1);

  // let start = oneYearAgo.getTime();
  // let end = oneYearInFuture.getTime();
  let start = oneYearAgo.toISOString();
  let end = oneYearInFuture.toISOString();

  return { params: { start, end } };
};

export const fetchCalendarData = createAsyncThunk(
  "chart/fetchCalendarData",
  async () => {
    const isAuthenticated = !!window.localStorage.getItem("auth-token");
    if (isAuthenticated) {
      const promises = [];

      try {
        const calParams = getStartAndEnd();
        promises.push(alpacaApi.get("/calendar", calParams));
        promises.push(alpacaApi.get("/clock"));
        const [calendarResponse, clockResponse] = await Promise.all(promises);

        console.log("CALENDAR RESPONSES:", {
          // calendar: calendarResponse.data,
          calendar: {},
          clock: clockResponse.data,
        });

        return {
          // This works, but unsure if it will be needed.
          calendar: calendarResponse.data,
          // calendar: {},
          clock: clockResponse.data,
        };
      } catch (err) {
        console.log("FAILED TO FETCH CALENDAR:", err);
        return null;
      }
    }
  }
);

type SliceState = {
  data: null | { clock: Clock; calendar: any };
  status: null | "loading" | "completed" | "failed";
  error: boolean;
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    data: null,
    status: null,
    error: false,
  } as SliceState,
  reducers: {
    // setTicker(state, action) {
    //   state.ticker = action.payload;
    // },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchCalendarData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCalendarData.fulfilled, (state, action) => {
        state.status = "completed";
        const data = action.payload;
        console.log("FULFILLED DATA:", data);

        if (data) {
          state.data = data;
          if (state.error) state.error = false;
        } else {
          state.error = true;
          state.status = "failed";
        }
      })
      .addCase(fetchCalendarData.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      });
  },
});

export const calendarActions = calendarSlice.actions;

export default calendarSlice.reducer;
