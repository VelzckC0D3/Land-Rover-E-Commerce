import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { createReservation } from '../features/reservation/reservActions';

function ReservationForm() {
    const { carId } = useParams();
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (formData) => {
        formData.user_id = user.id;
        formData.car_id = carId; // Agregar el carId al formData

        dispatch(createReservation(formData));
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="city"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                    <input
                        type="text"
                        placeholder="City"
                        {...field}
                    />
                )}
            />
            {errors.city && <span>This field is required</span>}

            <Controller
                name="date"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                    <input
                        type="date"
                        min={today}
                        placeholder="Date"
                        {...field}
                    />
                )}
            />
            {errors.date && <span>This field is required</span>}

            <button type="submit">Register</button>
        </form>
    );
}

export default ReservationForm;
