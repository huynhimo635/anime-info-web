import { configureStore } from "@reduxjs/toolkit";

import seasonReducer from "./seasonal/seasonSlice";

export const store = configureStore({
  reducer: {
    season: seasonReducer,
  },
});
