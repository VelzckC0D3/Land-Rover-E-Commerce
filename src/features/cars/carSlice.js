import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCars = createAsyncThunk('fetchCars', async () => {
  const apiURL = 'http://127.0.0.1:3001';

  const response = await axios.get(`${apiURL}/api/v1/cars`);
  console.log(response)

  const cars = response.data.details;

  return cars;
});

const initialState = {
  data: [],
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