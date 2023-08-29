import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API URL
const apiURL = 'http://192.168.1.1:3000';

// Thunks
export const fetchCars = createAsyncThunk('car/fetchCars', async () => {
  const response = await axios.get(`${apiURL}/api/v1/cars/`);
  return response.data; // Assuming your API response directly contains the car data
});

export const addCar = createAsyncThunk('car/addCar', async (formData) => {
  const response = await axios.post(`${apiURL}/api/v1/cars/`, { car: formData }); // Assuming your API expects the car data wrapped in "car" object
  return response.data; // Assuming your API response directly contains the added car data
});

export const deleteCar = createAsyncThunk('car/deleteCar', async (carId) => {
  await axios.delete(`${apiURL}/api/v1/cars/${carId}`);
  return carId; // Return the deleted car's ID to update the state
});

// Initial state
const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

// Slice
const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCar.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCar.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.filter((car) => car.id !== action.payload);
      })
      .addMatcher(
        (action) => [fetchCars.rejected, addCar.rejected, deleteCar.rejected].includes(action.type),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export default carSlice.reducer;
