import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "LoginSlice",
  initialState: {
    loginToken: "",
    user: {},
  },
  reducers: {
    loginStore: (state, action) => {
      state.loginToken = action.payload.token;
      state.user = action.payload.user;
    },
  },
} );

//exporting action  through this: rtk style. now we can use this loginStore action in our components
export const { loginStore } = loginSlice.actions;

//exporting reducer function through this: rtk style
export default loginSlice.reducer;
