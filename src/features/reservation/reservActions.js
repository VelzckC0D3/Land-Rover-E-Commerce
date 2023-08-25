import axios from 'axios';
import { toast } from 'react-hot-toast';
import { addReservation } from './reservSlice';

export const createReservation = (reservationData) => async (dispatch) => {
    try {
        const response = await axios.post(
            'http://127.0.0.1:3000/api/v1/reservations',
            {
                reservation: reservationData,
            }
        );

        if (response.status === 200) {
            dispatch(addReservation(reservationData));
            localStorage.setItem('reservation', JSON.stringify(reservationData));
            toast.success('Reservation Complete!');
            window.location.href = '/my-reservs';
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        toast.error(`Error: ${error.message}`);
    }
};

export const removeReservation = (reservId) => async (dispatch) => {
    try {
        const response = await axios.delete(
            `http://127.0.0.1:3000/api/v1/reservations/${reservId}`
        );

        if (response.status === 200) {
            dispatch(addReservation(null));
            localStorage.removeItem('reservation');
            toast.success('Reservation Deleted!');
            window.location.href = '/my-reservs';
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        toast.error(`Error: ${error.message}`);
    }
};
