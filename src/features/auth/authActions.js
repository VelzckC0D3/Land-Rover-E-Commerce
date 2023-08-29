import axios from 'axios';
import { authRequest, authSuccess, authFailure, logout } from './authSlice';
import { toast } from 'react-hot-toast';

const API_BASE_URL = 'http://192.168.1.1:3000';

export const registerUser = (formData) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const response = await axios.post(`${API_BASE_URL}/signup`, { user: formData }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            const token = response.headers.authorization;
            const user = response.data.data;
            dispatch(authSuccess({ token, user }));
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            toast.success('Registration successful!');
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        dispatch(authFailure(error.message));
        toast.error('Registration failed. Please check your information and try again.');
    }
};

export const loginUser = (formData) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const response = await axios.post(`${API_BASE_URL}/login`, { user: formData }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            const token = response.headers.authorization;
            const user = response.data.data;
            dispatch(authSuccess({ token, user }));
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            toast.success(`Welcome, ${user.name}`);
        } else {
            const errorResponse = response.data || 'An error occurred.';
            throw new Error(errorResponse);
        }
    } catch (error) {
        dispatch(authFailure(error.message));
        toast.error(`Login failed. ${error.message}`);
    }
};

export const logoutUser = () => async (dispatch, getState) => {
    try {
        const { token } = getState().auth;
        const response = await axios.delete(`${API_BASE_URL}/logout`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        });

        if (response.status === 200) {
            dispatch(logout());
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/'
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        dispatch(authFailure(error.message));
        toast.error('Logout failed. Please try again.');
    }
};
