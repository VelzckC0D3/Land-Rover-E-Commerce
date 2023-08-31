import { useEffect, useState } from "react"; // Import useState
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReservations,
  deleteReservation,
} from "../features/reservation/reservSlice";
import { fetchCars } from "../features/cars/carSlice";
import { toast } from "react-hot-toast";
import { SwishSpinner } from "react-spinners-kit";
import "../assets/style/MyReservations.css";


function UserReservation() {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reserv.data);
  const cars = useSelector((state) => state.car.data);
  const authUser = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchReservations())
      .then(() => dispatch(fetchCars()))
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const handleDelete = (reservationId) => {
    dispatch(deleteReservation(reservationId));
    toast.success("Reservation Deleted!");
  };

  const getCarName = (carId) => {
    const car = cars.find((car) => car.id === carId);
    return car ? car.name : "Unknown Car";
  };

  const userReservations = reservations.filter((reservation) => {
    const carExists = cars.some((car) => car.id === reservation.car_id);
    return reservation.user_id === authUser.id && carExists;
  });

  return (
    <>
      <style>
        {`
          @media (min-width: 900px) {
          .navButton {
            display: block
          }
          .navCont {
            transition: transform 0.5s ease-in-out, box-shadow 1s ease-in-out;
          }
        `}
      </style>
      <div className="myReservationsCont">
        {loading ? (
          <SwishSpinner size="50" frontColor="#98be18" loading={true} />
        ) : userReservations.length === 0 ? (
          <>
            <div className="reservationsEmpty">
              <h1>Tests Drive</h1>
              <p>You don&apos;t have any Test Drive reservation yet.</p>
            </div>
          </>
        ) : (
          <ul>
            {userReservations.map((reservation) => (
              <li key={reservation.id}>
                <p>Model: {getCarName(reservation.car_id)}</p>
                <p>City: {reservation.city}</p>
                <p>Date: {reservation.date}</p>
                <button onClick={() => handleDelete(reservation.id)}>
                  Delete
                </button>
                <hr />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default UserReservation;
