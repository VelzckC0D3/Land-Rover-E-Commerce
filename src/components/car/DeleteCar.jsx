import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars, deleteCar } from '../../features/cars/carSlice';
import { toast } from 'react-hot-toast';

const CarList = () => {
    const dispatch = useDispatch();
    const cars = useSelector((state) => state.car.data);

    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch]);

    const handleDelete = (carId) => {
        dispatch(deleteCar(carId))
            .then(() => {
                toast.success('Car deleted successfully.');
            })
            .catch((error) => {
                toast.error('Error deleting car:', error);
            });
    };

    return (
        <div>
            <h2>Car List</h2>
            {cars.length > 0 ? (
                <ul>
                    {cars.map((car) => (
                        <li key={car.id}>
                            <h2>{car.name}</h2>
                            <button onClick={() => handleDelete(car.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Vehicles not found.</p>
            )}
        </div>
    );
};

export default CarList;
