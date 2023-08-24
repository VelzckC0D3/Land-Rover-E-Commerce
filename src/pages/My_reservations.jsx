import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Reservation() {
    const [reservations, setReservations] = useState([]);
    const [carDetails, setCarDetails] = useState({});

    const loggedInUserId = useSelector(state => state.auth.user.id); // Update the selector here

    useEffect(() => {
        fetch("http://127.0.0.1:3000/api/v1/reservations")
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Filter reservations based on the logged-in user's ID
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
                                <p>Car Name: {carDetails[reservation.car_id]}</p>
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
