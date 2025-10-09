import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    setFeed: (state, action) => action.payload,
    removeFeed: (state, action) => {
      return state?.filter((feed) => feed._id !== action.payload);
    },
  },
});

export const { setFeed, removeFeed } = slice.actions;
export default slice.reducer;
