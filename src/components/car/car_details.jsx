import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../assets/style/Vehicles.css';

function CarDetails() {
  const { carId } = useParams();
  const navigate = useNavigate();

  const cars = useSelector((state) => state.car.data);
  const isAuthenticated = useSelector((state) => state.auth.user);

  const car = cars.find((car) => car.id === parseInt(carId));

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
