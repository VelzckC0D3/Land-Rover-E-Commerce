import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addReservation } from '../../features/reservation/reservSlice';
import { fetchCars } from '../../features/cars/carSlice';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import '../../assets/style/Reservation.css'

function AddReservationPage() {
    const navigate = useNavigate();
    const { carId } = useParams();
    const dispatch = useDispatch();

    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    const userId = userFromLocalStorage ? userFromLocalStorage.id : null;

    const { register, handleSubmit } = useForm();

    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch]);

    const onSubmit = (data) => {
        const formDataWithIds = {
            ...data,
            user_id: userId,
            car_id: carId,
        };

        dispatch(addReservation(formDataWithIds)).then(() => {
            // Show a success toast message
            toast.success('Reservation added successfully!');
            // Redirect to "My Reservations"
            navigate('/my-reservs');
        });
    };

    return (
        <div className="formCont">
            <h2 className="formTitle" >Test Drive</h2>
            <form className="reservForm" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    name="city"
                    placeholder='City'
                    {...register('city', { required: true })}
                    className="formInput"
                />

                <input
                    type="date"
                    name="date"
                    {...register('date', { required: true })}
                    min={new Date().toISOString().split('T')[0]}
                    className="formInput"
                />

                <button className="formInput" type="submit">New Test Drive</button>
            </form>
        </div>
    );
}

export default AddReservationPage;
