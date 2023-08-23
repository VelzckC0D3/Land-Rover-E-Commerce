import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCars } from '../features/cars/carSlice';
import { BsCaretLeft, BsCaretRight } from 'react-icons/bs';
import '../assets/style/Home.css';

function Home() {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.car);
  const carContainerRef = useRef(null);

  const scrollLeft = () => {
    if (carContainerRef.current) {
      carContainerRef.current.scrollLeft -= 200;
    }
  };

  const scrollRight = () => {
    if (carContainerRef.current) {
      carContainerRef.current.scrollLeft += 200;
    }
  };

  useEffect(() => {
    if (cars.status === 'idle') {
      dispatch(fetchCars());
    }
  }, [cars.status, dispatch]);

  return (
    <div className="container">
      <h1>List Of Cars</h1>
      {cars.status === 'loading' && <div>Loading...</div>}
      {cars.status === 'failed' && <div>{cars.error}</div>}
      {cars.status === 'succeeded' && (
        <div className='big-div'>
          <button className='scroll-button' onClick={scrollLeft}>
            <BsCaretLeft className="fs-5" />
          </button>
          <div className='car-container' ref={carContainerRef}>
            {cars.data.map((car) => (
              <Link to={`/car_details/${car.id}`} key={car.id}>
                <div className='car-div'>
                  <img src={car.main_image} className='car-img' alt={car.name} />
                  <h2>{car.name}</h2>
                  <h4>Model: {car.model}</h4>
                </div>
              </Link>
            ))}
          </div>
          <button className='scroll-button' onClick={scrollRight}>
            <BsCaretRight className="fs-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
