import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import episodesApi from "../../service/episodesApi";

export const getData = createAsyncThunk(
  "episodes",
  async ({ id, page = 1 }) => {
    const res = await episodesApi.get(id, page);
    return res;
  }
);

const episodesSlice = createSlice({
  name: "episodes",
  initialState: {
    data: [],
    loading: false,
    error: false,
    pages: 0,
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
      state.data = action.payload.episodes;
      state.pages = action.payload.episodes_last_page;
    },
  },
});

const { reducer: episodesReducer } = episodesSlice;
export default episodesReducer;
