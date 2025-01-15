import axios from 'axios';
import { UPDATE_USER_PROFILE } from './types';

// Action to update user profile
export const updateUserProfile = (userData) => async (dispatch) => {
  try {
    const response = await axios.put('/api/user/profile', userData);
    dispatch({
      type: UPDATE_USER_PROFILE,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};
