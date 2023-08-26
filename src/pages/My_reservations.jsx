import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReservations, deleteReservation } from '../features/reservation/reservSlice';
import { fetchCars } from '../features/cars/carSlice';

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
    };

    const getCarName = (carId) => {
        const car = cars.find((car) => car.id === carId);
        return car ? car.name : 'Unknown Car';
    };

    const userReservations = reservations.filter((reservation) => reservation.user_id === authUser.id);

    return (
        <div>
            <h2>Reservations</h2>
            {userReservations.length === 0 ? (
                <p>No reservations found.</p>
            ) : (
                <ul>
                    {userReservations.map((reservation) => (
                        <li key={reservation.id}>
                            <p>{getCarName(reservation.car_id)}</p>
                            <p>{reservation.city}</p>
                            <p>{reservation.date}</p>
                            <button onClick={() => handleDelete(reservation.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UserReservation;
