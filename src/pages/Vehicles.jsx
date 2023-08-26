import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCars } from '../features/cars/carSlice';
import { BsCaretLeft, BsCaretRight } from 'react-icons/bs';

function Vehicles() {
    const dispatch = useDispatch();
    const cars = useSelector((state) => state.car);
    const carContainerRef = useRef(null);

    const handleScroll = (scrollOffset) => {
        if (carContainerRef.current) {
            carContainerRef.current.scrollLeft += scrollOffset;
        }
    };

    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch]);

    return (
        <div className="container">
            <h1>List Of Vehicles</h1>
            <div className='big-div'>
                <button className='scroll-button' onClick={() => handleScroll(-200)}>
                    <BsCaretLeft className="fs-5" />
                </button>
                <div className='car-container' ref={carContainerRef}>
                    {cars.data.length === 0 && <p>No cars found.</p>}
                    {cars.data.map((car) => (
                        <Link to={`/car_details/${car.id}`} key={car.id}>
                            <div className='car-div'>
                                <img src={car.front_image} className='car-img' alt={car.name} />
                                <h4>{car.name}</h4>
                                <p>{car.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <button className='scroll-button' onClick={() => handleScroll(200)}>
                    <BsCaretRight className="fs-5" />
                </button>
            </div>
        </div>
    );
}

export default Vehicles;
