// src/redux/theme/themeSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: localStorage.getItem('theme') || 'light', // Default to light theme
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme); // Save theme to localStorage
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
