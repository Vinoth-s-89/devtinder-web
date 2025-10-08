import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    setFeed: (state, action) => action.payload,
    clearFeed: () => null,
  },
});

export const { setFeed, clearFeed } = slice.actions;
export default slice.reducer;
