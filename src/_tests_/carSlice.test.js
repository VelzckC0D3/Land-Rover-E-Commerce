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

  it('should handle fetchCars action', async () => {
    const store = configureStore({
      reducer: { car: carReducer },
    });

    await store.dispatch(fetchCars());

    const state = store.getState().car;

    expect(state.data).toHaveLength(0);
    expect(state.status).toBe('succeeded');
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });
});
