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
    },
});

export const { addReservation } = reservationSlice.actions;
export default reservationSlice.reducer;
