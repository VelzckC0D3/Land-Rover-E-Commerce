import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiURL from "../auth/urls";

export const fetchReservations = createAsyncThunk(
  "reservation/fetchReservations",
  async () => {
    const response = await axios.get(`${apiURL}/api/v1/reservations`);
    return response.data; // Assuming your API response directly contains the reservation data
  }
);

export const addReservation = createAsyncThunk(
  "reservation/addReservation",
  async (formData) => {
    const response = await axios.post(`${apiURL}/api/v1/reservations`, {
      reservation: formData,
    }); // Assuming your API expects the reservation data wrapped in "reservation" object
    return response.data; // Assuming your API response directly contains the added reservation data
  }
);

export const deleteReservation = createAsyncThunk(
  "reservation/deleteReservation",
  async (reservId) => {
    await axios.delete(`${apiURL}/api/v1/reservations/${reservId}`);
    return reservId; // Return the deleted reservation's ID to update the state
  }
);

// Initial state
const initialState = {
  data: [],
  status: "idle",
  error: null,
};

// Slice
const reservSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addReservation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteReservation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(addReservation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data.push(action.payload);
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (reserv) => reserv.id !== action.payload
        );
      })
      .addMatcher(
        (action) =>
          [
            fetchReservations.rejected,
            addReservation.rejected,
            deleteReservation.rejected,
          ].includes(action.type),
        (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        }
      );
  },
});

export default reservSlice.reducer;
