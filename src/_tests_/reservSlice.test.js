import reservReducer from '../features/reservation/reservSlice';

describe('reservSlice', () => {
  it('should have initial state', () => {
    const expectedInitialState =  {
      data: [],
      status: 'idle',
      error: null,
  };

    const initialState = reservReducer(undefined, {});

    expect(initialState).toEqual(expectedInitialState);
  });
});
