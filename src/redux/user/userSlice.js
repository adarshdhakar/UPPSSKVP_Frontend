// redux/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null, // Default value when no user is logged in
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signoutSuccess: (state) => {
      state.currentUser = null; // Clear user data on sign out
    },
    setUser: (state, action) => {
      state.currentUser = action.payload; // Set the user data after login or registration
    },
  },
});

export const { signoutSuccess, setUser } = userSlice.actions;
export default userSlice.reducer;
