import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    toggle: false,
    
  },
  reducers: {
    toggleTheme: (state) => {
      state.toggle = !state.toggle;
    },
    
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
