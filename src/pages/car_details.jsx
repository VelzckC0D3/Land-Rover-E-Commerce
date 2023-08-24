import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../assets/style/Home.css';

function CarDetails() {
  const { carId } = useParams();

  const cars = useSelector((state) => state.car.data);
  console.log(cars)

  const car = cars.find((car) => car.id === parseInt(carId));
  console.log(car)

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div className="container container-2">
      <img src={car.main_image} className='main-img' alt={car.name} />
      <div>
        <p>Model: {car.name}</p>
        <p>Price: ${car.price}</p>
        <p>Year: {car.year}</p>
        <img src={car.side_image} className='car-img' alt={car.name} />
        <button>
          <Link to="/reservation" activeClassName="active" className="nav-link">
            Reservation
          </Link>
        </button>
      </div>
    </div>
  );
}

export default CarDetails;
