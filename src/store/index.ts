import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import watchlistReducer from "./watchlistSlice";
import chartReducer from "./chartSlice";
import calendarReducer from "./calendarSlice";
import corporateActionsReducer from "./corporateActionsSlice";
import orderReducer from "./orderSlice";
import positionReducer from "./positionSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    watchlist: watchlistReducer,
    chart: chartReducer,
    calendar: calendarReducer,
    corporateActions: corporateActionsReducer,
    order: orderReducer,
    position: positionReducer,
  },
});

// infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
