import { useSelector, useDispatch } from 'react-redux';
import { createReservation } from '../features/reservation/reservActions'; // Ajusta la ruta según tu estructura
import { useForm, Controller } from 'react-hook-form';

const Reservation = () => {
    const user = useSelector((state) => state.auth.user);
    const cars = useSelector((state) => state.car.data);
    const dispatch = useDispatch();
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (formData) => {
        formData.user_id = user.id; // Añadir user_id al formData
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

            <Controller
                name="car_id"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                    <select {...field}>
                        <option value="">Select a car</option>
                        {cars.map((car) => (
                            <option key={car.id} value={car.id}>
                                {car.name}
                            </option>
                        ))}
                    </select>
                )}
            />
            {errors.car_id && <span>This field is required</span>}

            <button type="submit">Register</button>
        </form>
    );
};

export default Reservation;
