import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    formData: {
        city: '',
        date: '',
        car_id: '',
    },
};

const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
        updateField: (state, action) => {
            const { field, value } = action.payload;
            state.formData[field] = value;
        },
        resetForm: (state) => {
            state.formData = initialState.formData;
        },
    },
});

export const { updateField, resetForm } = reservationSlice.actions;

export default reservationSlice.reducer;
