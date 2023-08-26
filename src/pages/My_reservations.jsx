/* import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeReservation } from "../features/reservation/reservActions";

function Reservation() {
    const [reservations, setReservations] = useState([]);
    const [carDetails, setCarDetails] = useState({});

    const dispatch = useDispatch();
    const loggedInUserId = useSelector(state => state.auth.user.id);

    useEffect(() => {
        fetch("http://127.0.0.1:3000/api/v1/reservations")
            .then(response => response.json())
            .then(data => {
                if (data.success) {

                    const userReservations = data.details.filter(reservation => reservation.user_id === loggedInUserId);
                    setReservations(userReservations);

                    fetch("http://127.0.0.1:3000/api/v1/cars")
                        .then(response => response.json())
                        .then(carData => {
                            if (carData.success) {
                                const carDetailsMap = {};
                                carData.details.forEach(car => {
                                    carDetailsMap[car.id] = car.name;
                                });
                                setCarDetails(carDetailsMap);
                            }
                        })
                        .catch(error => {
                            console.error("Error fetching car data:", error);
                        });
                }
            })
            .catch(error => {
                console.error("Error fetching reservation data:", error);
            });
    }, [loggedInUserId]);

    const handleDeleteReservation = (reservationId) => {

        fetch(`http://127.0.0.1:3000/api/v1/reservations/${reservationId}`, {
            method: "DELETE",
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {

                    dispatch(removeReservation(reservationId));

                    setReservations(prevReservations => prevReservations.filter(reservation => reservation.id !== reservationId));
                }
            })
            .catch(error => {
                console.error("Error deleting reservation:", error);
            });
    };

    return (
        <div>
            {reservations.length > 0 ? (
                <div>
                    <h2>Reservation Details</h2>
                    <ul>
                        {reservations.map(reservation => (
                            <li key={reservation.id}>
                                <p>City: {reservation.city}</p>
                                <p>Date: {reservation.date}</p>
                                <p>Car Model: {carDetails[reservation.car_id]}</p>
                                <button onClick={() => handleDeleteReservation(reservation.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No reservation data found.</p>
            )}
        </div>
    );
}

export default Reservation;
 */