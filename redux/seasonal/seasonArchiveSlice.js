import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import seasonalApi from "../../service/seasonalApi";

export const getData = createAsyncThunk("season/archive", async () => {
  const res = await seasonalApi.getSeasonArchive();
  return res.archive;
});

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
      state.data = action.payload;
    },
  },
});

const { reducer: seasonArchiveReducer } = seasonArchiveSlice;
export default seasonArchiveReducer;
