import { configureStore } from "@reduxjs/toolkit";

import seasonReducer from "./seasonal/seasonSlice";
import seasonArchiveReducer from "./seasonal/seasonArchiveSlice";

import searchReducer from "./search/searchSlice";
import loadingSlice from "./loadingCustom/loadingSlice";

export const store = configureStore({
  reducer: {
    season: seasonReducer,
    seasonArchive: seasonArchiveReducer,

    search: searchReducer,
    loading: loadingSlice,
  },
});
