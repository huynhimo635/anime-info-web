import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import animeApi from "../../service/animeApi";
import themesApi from "../../service/themesApi";

export const getData = createAsyncThunk("anime", async (id) => {
  const res = await animeApi.getById(id);
  return res;
});

export const getThemes = createAsyncThunk("anime/themes", async (id) => {
  const res = await themesApi.get(id);
  return res[0].themes;
});

const animeSlice = createSlice({
  name: "anime",
  initialState: {
    data: {},
    loading: false,
    error: false,
    themes: [],
  },
  reducers: {},
  extraReducers: {
    [getData.pending]: (state) => {
      state.loading = true;
    },

    [getData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.data = {};
    },

    [getData.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getThemes.pending]: (state) => {
      state.loading = true;
    },

    [getThemes.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.themes = [];
    },

    [getThemes.fulfilled]: (state, action) => {
      state.loading = false;
      state.themes = action.payload;
    },
  },
});

const { reducer: animeReducer } = animeSlice;
export default animeReducer;
