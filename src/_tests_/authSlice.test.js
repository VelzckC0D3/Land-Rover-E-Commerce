import authReducer from '../features/auth/authSlice';

describe('reservSlice', () => {
  it('should have initial state', () => {
    const expectedInitialState =  {
      token: null,
      user: null,
      loading: false,
      error: null,
  };

    const initialState = authReducer(undefined, {});

    expect(initialState).toEqual(expectedInitialState);
  });
});
