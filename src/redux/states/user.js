import { createSlice } from "@reduxjs/toolkit";

export const userIsEmpty = {};

export const userSlice = createSlice({
  name: "user",
  initialState: userIsEmpty,
  reducers: {
    loginUser: (state, action) => {
      return action.payload;
    },
    logoutUser: () => {
      return userIsEmpty;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
