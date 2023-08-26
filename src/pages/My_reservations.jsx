import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations, deleteReservation } from '../features/reservation/reservSlice';
import { fetchCars } from '../features/cars/carSlice';
import { toast } from 'react-hot-toast';

function UserReservation() {
    const dispatch = useDispatch();
    const reservations = useSelector((state) => state.reserv.data);
    const cars = useSelector((state) => state.car.data);
    const authUser = useSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(fetchReservations());
        dispatch(fetchCars());
    }, [dispatch]);

    const handleDelete = (reservationId) => {
        dispatch(deleteReservation(reservationId));
        toast.success("Reservation Deleted!")
    };

    const getCarName = (carId) => {
        const car = cars.find((car) => car.id === carId);
        return car ? car.name : 'Unknown Car';
    };

    const userReservations = reservations.filter((reservation) => {
        const carExists = cars.some((car) => car.id === reservation.car_id);
        return reservation.user_id === authUser.id && carExists;
    });

    return (
        <div className='container'>
            <h2>Reservations</h2>
            {userReservations.length === 0 ? (
                <p>No reservations found.</p>
            ) : (
                <ul>
                    {userReservations.map((reservation) => (
                        <li key={reservation.id}>
                            <p>Model: {getCarName(reservation.car_id)}</p>
                            <p>City: {reservation.city}</p>
                            <p>Date: {reservation.date}</p>
                            <button onClick={() => handleDelete(reservation.id)}>Delete</button>
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UserReservation;
