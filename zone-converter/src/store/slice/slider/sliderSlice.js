// sliderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sliderValue: 0,
};

const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    setSliderValue(state, action) {
      state.sliderValue = action.payload;
    },
  },
});

export const { setSliderValue } = sliderSlice.actions;

export default sliderSlice.reducer;
