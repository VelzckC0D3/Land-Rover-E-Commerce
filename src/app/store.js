import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import carReducer from '../features/cars/carSlice';
import reservReducer from '../features/reservation/reservSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    car: carReducer,
    reserv: reservReducer,
  }
});

export default store;
