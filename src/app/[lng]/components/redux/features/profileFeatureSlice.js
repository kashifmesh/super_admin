import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    current: 6
};
const boostProviderSlice = createSlice({
    name: "profileBoost",
    initialState,
    reducers: {
        setCurrent: (state, action) => {
            state.current = action.payload;
        },

    },
});
export const {
    setCurrent,
} = boostProviderSlice.actions;
export default boostProviderSlice.reducer;
