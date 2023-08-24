import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import carReducer from '../features/cars/carSlice';
import reservReducer from '../features/reservation/reservSlice'

const persistedToken = localStorage.getItem('token');

const initialState = {
  auth: {
    token: persistedToken,
    user: null,
    loading: false,
    error: null,
    isAuthenticated: persistedToken !== null,
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    car: carReducer,
    reserv: reservReducer,
  },
  preloadedState: initialState,
});

export default store;
