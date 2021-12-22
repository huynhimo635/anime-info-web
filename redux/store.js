import { configureStore } from "@reduxjs/toolkit";

import seasonReducer from "./seasonal/seasonSlice";
import seasonArchiveReducer from "./seasonal/seasonArchiveSlice";

export const store = configureStore({
  reducer: {
    season: seasonReducer,
    seasonArchive: seasonArchiveReducer,
  },
});
