import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
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
    const curYear = new Date().getFullYear();
    const curMonth = new Date().getMonth();

    initialShow.year = curYear;
    if (curMonth < 4) {
      initialShow.season = "winter";
    } else if (curMonth < 7) {
      initialShow.season = "spring";
    } else if (curMonth < 10) {
      initialShow.season = "summer";
    } else initialShow.season = "fall";

    localStorage.setItem("curSeason", JSON.stringify(initialShow));
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
  reducers: {
    next: (state) => {
      //declare variables
      let indexItemSeason = -2;
      const curItem = current(state.data).find(
        (item) => item.year === state.curSeason.year
      );
      //find index current season
      if (curItem !== undefined) {
        indexItemSeason = curItem.seasons.findIndex(
          (item) => item.toLowerCase() === state.curSeason.season
        );
      }
      //handle next season if curItem is not the season closest to this year, else check year
      if (
        indexItemSeason !== -1 &&
        indexItemSeason + 1 < curItem.seasons.length
      ) {
        state.curSeason.season =
          curItem.seasons[indexItemSeason + 1].toLowerCase();

        localStorage.setItem("curSeason", JSON.stringify(state.curSeason));
      } else {
        if (curItem.year !== state.data[0].year) {
          state.curSeason = {
            year: curItem.year + 1,
            season: "winter",
          };

          localStorage.setItem("curSeason", JSON.stringify(state.curSeason));
        }
      }
    },
    back: (state) => {
      //declare variables
      let indexItemSeason = -2;
      const curItem = current(state.data).find(
        (item) => item.year === state.curSeason.year
      );
      //find index current season
      if (curItem !== undefined) {
        indexItemSeason = curItem.seasons.findIndex(
          (item) => item.toLowerCase() === state.curSeason.season
        );
      }
      //handle back season if curItem is not the farthest season this year, else check year
      if (indexItemSeason !== -1 && indexItemSeason - 1 >= 0) {
        state.curSeason.season =
          curItem.seasons[indexItemSeason - 1].toLowerCase();

        localStorage.setItem("curSeason", JSON.stringify(state.curSeason));
      } else {
        if (curItem.year !== state.data[state.data.length - 1]) {
          state.curSeason = {
            year: curItem.year - 1,
            season: "fall",
          };

          localStorage.setItem("curSeason", JSON.stringify(state.curSeason));
        }
      }
    },
  },
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
        state.curSeason.year = action.payload[0].year;
        state.curSeason.season =
          action.payload[0].seasons[
            action.payload[0].seasons.length - 1
          ].toLowerCase();

        localStorage.setItem("curSeason", JSON.stringify(state.curSeason));
      }
    },
  },
});

export const { next, back } = seasonArchiveSlice.actions;
const { reducer: seasonArchiveReducer } = seasonArchiveSlice;
export default seasonArchiveReducer;
