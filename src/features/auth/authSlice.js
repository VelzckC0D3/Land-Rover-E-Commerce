import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        authSuccess: (state, action) => {  // Use authSuccess here
            state.loading = false;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.error = null;
        },
        authFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
        },
    },
});
export const { authRequest, authSuccess, authFailure, logout } = authSlice.actions;

export default authSlice.reducer;
