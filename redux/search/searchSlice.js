import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import searchApi from "../../service/searchApi";

export const getData = createAsyncThunk("search", async ({ query, page }) => {
  const res = await searchApi.get(query, page);
  return res.results;
});

const searchSlice = createSlice({
  name: "search",
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

const { reducer: searchReducer } = searchSlice;
export default searchReducer;
