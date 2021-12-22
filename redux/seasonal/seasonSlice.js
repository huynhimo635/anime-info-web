import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import seasonalApi from "../../service/seasonalApi";

export const getData = createAsyncThunk(
  "season",
  async ({ year, seasonal }) => {
    const res = await seasonalApi.get(year, seasonal);
    return res.anime;
  }
);

const seasonSlice = createSlice({
  name: "season",
  initialState: {
    allData: [],
    tvData: [],
    movieData: [],
    otherData: [],
    loading: false,
    error: false,
  },
  reducers: {
    DESC: (state) => {
      state.allData = [...current(state.allData)].sort((a, b) => {
        if (a.title > b.title) return -1;
        if (a.title < b.title) return 1;
        return 0;
      });

      state.tvData = [...current(state.tvData)].sort((a, b) => {
        if (a.title > b.title) return -1;
        if (a.title < b.title) return 1;
        return 0;
      });

      state.movieData = [...current(state.movieData)].sort((a, b) => {
        if (a.title > b.title) return -1;
        if (a.title < b.title) return 1;
        return 0;
      });

      state.otherData = [...current(state.otherData)].sort((a, b) => {
        if (a.title > b.title) return -1;
        if (a.title < b.title) return 1;
        return 0;
      });
    },
    ASC: (state) => {
      state.allData = [...current(state.allData)].sort((a, b) => {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
      });

      state.tvData = [...current(state.tvData)].sort((a, b) => {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
      });

      state.movieData = [...current(state.movieData)].sort((a, b) => {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
      });

      state.otherData = [...current(state.otherData)].sort((a, b) => {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
      });
    },
  },
  extraReducers: {
    [getData.pending]: (state) => {
      state.loading = true;
    },

    [getData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.allData = [];
      state.tvData = [];
      state.movieData = [];
      state.otherData = [];
    },

    [getData.fulfilled]: (state, action) => {
      state.loading = false;
      state.allData = action.payload;

      state.tvData = state.allData.filter(
        (item) => item.type.toLowerCase() === "tv"
      );
      state.movieData = state.allData.filter(
        (item) => item.type.toLowerCase() === "movie"
      );
      state.otherData = state.allData.filter(
        (item) =>
          item.type.toLowerCase() !== "tv" &&
          item.type.toLowerCase() !== "movie"
      );
    },
  },
});

export const { ASC, DESC } = seasonSlice.actions;
const { reducer: seasonReducer } = seasonSlice;
export default seasonReducer;
