import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  specificComponentInModal: true,
};

export const modalUiSlice = createSlice({
  name: "modalUi",
  initialState,
  reducers: {
    removeSpecificModal: (state,action) => {
      state.specificComponentInModal = action.payload;
    },
    addSpecificModal: (state,action) => {
      state.specificComponentInModal =action.payload;
    },
  }, 
});

export const { removeSpecificModal, addSpecificModal } = modalUiSlice.actions;

export default modalUiSlice.reducer;