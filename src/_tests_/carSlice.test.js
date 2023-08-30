import { configureStore } from '@reduxjs/toolkit';
import carReducer, { fetchCars } from '../features/cars/carSlice';

describe('carSlice', () => {
  it('should have initial state', () => {
    const expectedInitialState = {
      data: [],
      status: 'idle',
      loading: false,
      error: null,
    };

    const initialState = carReducer(undefined, {});

    expect(initialState).toEqual(expectedInitialState);
  });
});
