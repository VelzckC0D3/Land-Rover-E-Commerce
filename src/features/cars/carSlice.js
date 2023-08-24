import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const LOCAL_STORAGE_KEY = 'persistedCarData'; // Key for storing data in localStorage

export const fetchCars = createAsyncThunk('fetchCars', async () => {
  const apiURL = 'http://127.0.0.1:3000';

  const response = await axios.get(`${apiURL}/api/v1/cars`);

  const cars = response.data.details;

  // Store fetched data in localStorage
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cars));

  return cars;
});

// Load persisted data from localStorage when initializing state
const persistedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

const initialState = {
  data: persistedData,
  status: 'idle',
  error: null,
};

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCars.pending, (state) => ({
      ...state,
      status: 'loading'
    }));

    builder.addCase(fetchCars.fulfilled, (state, action) => ({
      ...state,
      data: action.payload,
      status: 'succeeded'
    }));

    builder.addCase(fetchCars.rejected, (state, action) => ({
      ...state,
      error: action.error.message,
      status: 'failed'
    }));
  },
});

export default carSlice.reducer;
