import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import seasonalApi from "../../service/seasonalApi";

export const getData = createAsyncThunk(
  "season/archive",
  async ({ year, seasonal }) => {
    const res = await seasonalApi.get(year, seasonal);
    return res.archive;
  }
);

const seasonArchiveSlice = createSlice({
  name: "seasonArchive",
  initialState: {
    data: [],
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

const { reducer: seasonArchiveReducer } = seasonArchiveSlice;
export default seasonArchiveReducer;
