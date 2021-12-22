import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import seasonalApi from "../../service/seasonalApi";

export const getData = createAsyncThunk("season/archive", async () => {
  const res = await seasonalApi.getSeasonArchive();
  return res.archive;
});

const initialShow = {};
if (typeof window !== "undefined") {
  if (localStorage.getItem("curSeason"))
    initialShow = JSON.parse(localStorage.getItem("curSeason"));
  else {
    initialShow = {};
  }
}

const seasonArchiveSlice = createSlice({
  name: "seasonArchive",
  initialState: {
    data: [],
    curSeason: initialShow,
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [getData.pending]: (state) => {
      state.loading = true;
    },

    [getData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.data = [];
    },

    [getData.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;

      if (
        state.curSeason.season === undefined ||
        state.curSeason.year === undefined
      ) {
        state.curSeason.year = action.payload[0].year.toString();
        state.curSeason.season =
          action.payload[0].seasons[
            action.payload[0].seasons.length - 1
          ].toLowerCase();

        localStorage.setItem("curSeason", JSON.stringify(state.curSeason));
      }
    },
  },
});

const { reducer: seasonArchiveReducer } = seasonArchiveSlice;
export default seasonArchiveReducer;
