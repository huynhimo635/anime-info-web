import { configureStore } from "@reduxjs/toolkit";

import seasonReducer from "./seasonal/seasonSlice";
import seasonArchiveReducer from "./seasonal/seasonArchiveSlice";

import searchReducer from "./search/searchSlice";
import loadingSlice from "./loadingCustom/loadingSlice";

import animeReducer from "./anime/animeSlice";
import episodesReducer from "./episodes/episodesSlice";
import themesReducer from "./themes/themeSlice";

export const store = configureStore({
  reducer: {
    season: seasonReducer,
    seasonArchive: seasonArchiveReducer,

    anime: animeReducer,
    episodes: episodesReducer,
    themes: themesReducer,

    search: searchReducer,
    loading: loadingSlice,
  },
});
