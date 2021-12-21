import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import seasonalApi from "../../service/seasonalApi";

export const getData = createAsyncThunk(
  "season",
  async ({ year, seasonal }) => {
    console.log(year, seasonal);
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
  reducers: {},
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

const { reducer: seasonReducer } = seasonSlice;
export default seasonReducer;
