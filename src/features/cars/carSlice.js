import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const LOCAL_STORAGE_KEY = 'persistedCarData';

export const fetchCars = createAsyncThunk('car/fetchCars', async () => {
  const apiURL = 'http://127.0.0.1:3000';

  const response = await axios.get(`${apiURL}/api/v1/cars/`);

  const cars = response.data.details;

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cars));

  return cars;
});

export const addCar = createAsyncThunk('car/addCar', async (formData) => { // Receive formData as a parameter
  const apiURL = 'http://127.0.0.1:3000';

  const response = await axios.post(`${apiURL}/api/v1/cars/`, { car: formData });

  const car = response.data.details;

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(car));

  return car;
});

export const deleteCar = createAsyncThunk('car/deleteCar', async (carId) => {
  const apiURL = 'http://127.0.0.1:3000';

  await axios.delete(`${apiURL}/api/v1/cars/${carId}`);

  const response = await axios.get(`${apiURL}/api/v1/cars/`);
  const cars = response.data.details;

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cars));

  return cars;
});

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
    builder.addCase(fetchCars.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });

    builder.addCase(fetchCars.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    builder.addCase(addCar.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(addCar.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data.push(action.payload);
      window.location.href = '/vehicles';
    });

    builder.addCase(addCar.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    builder.addCase(deleteCar.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(deleteCar.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });

    builder.addCase(deleteCar.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default carSlice.reducer;
