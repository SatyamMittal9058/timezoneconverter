import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slice/theme/themeSlice';
import sliderSlice from './slice/slider/sliderSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    slider:sliderSlice,
  },
});