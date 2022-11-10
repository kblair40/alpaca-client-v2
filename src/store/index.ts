import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import watchlistReducer from "./watchlistSlice";
import chartReducer from "./chartSlice";
import calendarReducer from "./calendarSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    watchlist: watchlistReducer,
    chart: chartReducer,
    calendar: calendarReducer,
  },
});

// infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
