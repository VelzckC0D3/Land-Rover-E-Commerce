import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

const persistedToken = localStorage.getItem('token');

const initialState = {
  auth: {
    token: persistedToken,
    user: null,
    loading: false,
    error: null,
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: initialState,
});

export default store;
