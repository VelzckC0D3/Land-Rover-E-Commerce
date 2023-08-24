import axios from 'axios';
import { toast } from 'react-hot-toast';
import { updateField, resetForm } from './reservationSlice';

export const createReservation = (formData) => async (dispatch) => {
    dispatch(updateField());
    try {
        const response = await axios.post('http://127.0.0.1:3000/api/v1/reservations', {
            reservation: formData,
        });

        if (response.status === 200) {
            localStorage.setItem('reservation', JSON.stringify(formData));
            toast.success('Reservation Complete!');
            window.location.href = '/my-reservs';
        } else {
            throw new Error(response.statusText);
        }
    } catch (error) {
        dispatch(resetForm());
        toast.error(`Reservation failed. Error: ${error.message}`);
    }
};
