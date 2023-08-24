import axios from 'axios';
import { authRequest, authSuccess, authFailure, logout } from './authSlice';
import { toast } from 'react-hot-toast';

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
            localStorage.setItem('user', JSON.stringify(user));
            toast.success('Registration successful!');
            window.location.href = '/';
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        dispatch(authFailure(error.message));
        toast.error("Registration failed. Please check your information and try again.");
    }
};

export const loginUser = (formData) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const response = await axios.post(
            'http://127.0.0.1:3000/login',
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
            toast.success(`Welcome, ${user.name}`)
            window.location.href = '/';
        } else {
            const errorResponse = response.data || 'An error occurred.';
            throw new Error(errorResponse);
        }
    } catch (error) {
        dispatch(authFailure(error.message));
        toast.error(`Login failed. ${error.message}`)
    }
};

export const logoutUser = () => async (dispatch) => {
    dispatch(authRequest());

    try {

        const response = await axios.delete(
            'http://127.0.0.1:3000/logout',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: localStorage.getItem('token'),
                },
            }
        );

        if (response.status === 200) {
            dispatch(logout());
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiration');
            localStorage.removeItem('user');
            toast.success('Logout successful!');
            window.location.href = '/login';
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        dispatch(authFailure(error.message));
        toast.error('Logout failed. Please try again.');
    }
};
