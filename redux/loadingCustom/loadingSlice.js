import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "loading",
  initialState: {
    loadingCustom: false,
  },
  reducers: {
    set: (state) => {
      state.loadingCustom = true;
    },
    remove: (state) => {
      state.loadingCustom = false;
    },
  },
});

export const { set, remove } = searchSlice.actions;
export default searchSlice.reducer;
