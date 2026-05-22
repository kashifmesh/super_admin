import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signup1Current: 0,
  signup2Current: 0,
  signup3Current: 0,
  signup4Current: 0,
};
const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setSignup1Current: (state, action) => {
      state.signup1Current = action.payload;
    },
    setSignup2Current: (state, action) => {
      state.signup2Current = action.payload;
    },
    setSignup3Current: (state, action) => {
      state.signup3Current = action.payload;
    },
    setSignup4Current: (state, action) => {
      state.signup4Current = action.payload;
    },
  },
});
export const {
  setSignup1Current,
  setSignup2Current,
  setSignup3Current,
  setSignup4Current,
} = signupSlice.actions;
export default signupSlice.reducer;
