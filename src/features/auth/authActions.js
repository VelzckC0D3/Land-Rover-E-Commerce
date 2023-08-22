import axios from 'axios';
import { authRequest, authSuccess, authFailure, logout } from './authSlice';

export const registerUser = (formData) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const response = await axios.post(
            'http://127.0.0.1:3000/signup',
            {
                user: formData,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.status === 200) {
            const token = response.headers.authorization;
            const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
            const user = response.data.data;
            dispatch(authSuccess({ token, user }));
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExpiration', expirationTime);
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        dispatch(authFailure(error.message));
    }
};

export const loginUser = (formData) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const response = await axios.post(
            'http://localhost:3000/login',
            {
                user: formData,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.status === 200) {
            const token = response.headers.authorization;
            const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
            const user = response.data.data;
            dispatch(authSuccess({ token, user }));
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExpiration', expirationTime);
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            const errorResponse = response.data || 'An error occurred.';
            throw new Error(errorResponse);
        }
    } catch (error) {
        dispatch(authFailure(error.message));
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch(logout());
};
