import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    reservations: [],
};

const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        addReservation: (state, action) => {
            state.reservations.push(action.payload);
        },
        removeReservation: (state, action) => {
            const index = state.reservations.findIndex(reservation => reservation.id === action.payload);
            if (index !== -1) {
                state.reservations.splice(index, 1);
            }
        },
    },
});

export const { addReservation, removeReservation } = reservationSlice.actions;
export default reservationSlice.reducer;
