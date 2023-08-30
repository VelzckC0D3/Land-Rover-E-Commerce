import { useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars } from '../../features/cars/carSlice';
import { Link } from "react-router-dom";

function CarDetails() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const cars = useSelector((state) => state.car);
  const isAuthenticated = useSelector((state) => state.auth.user);

  const car = cars.data.find((car) => car.id === parseInt(carId));

  if (cars.loading) {
    return <div>Loading...</div>;
  }

  if (!car) {
    return <div>Car not found</div>;
  }

  const reservationButton = isAuthenticated ? (
    <Link to={`/reservation/${car.id}`} className="nav-link">
      <button>Make Reservation</button>
    </Link>
  ) : (
    <button onClick={() => navigate('/login')}>Make Reservation</button>
  );

  return (
    <div className="container container-2">
      <img src={car.main_image} className='main-img' alt={car.name} />
      <div>
        <p>Model: {car.name}</p>
        <p>Price: ${car.price}</p>
        <img src={car.front_image} className='car-img' alt={car.name} />
        {reservationButton}
      </div>
    </div>
  );
}

export default CarDetails;
