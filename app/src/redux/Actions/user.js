import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authStart: (state) => {
      state.currentUser = null;
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    authFailure: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { authStart, authSuccess, authFailure } = userSlice.actions;

export default userSlice.reducer;
