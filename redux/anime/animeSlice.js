import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import animeApi from "../../service/animeApi";

export const getData = createAsyncThunk("anime", async (id) => {
  const res = await animeApi.getById(id);
  return res;
});

const animeSlice = createSlice({
  name: "anime",
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
      state.data = action.payload;
    },
  },
});

const { reducer: animeReducer } = animeSlice;
export default animeReducer;
