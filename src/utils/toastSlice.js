import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  initialState: { message: "" },
  name: "toast",
  reducers: {
    setMessage: (state, action) => {
      return action.payload;
    },
    clearMessage: (state) => {
      return { message: "" };
    },
  },
});

export const { setMessage, clearMessage } = slice.actions;
export default slice.reducer;
