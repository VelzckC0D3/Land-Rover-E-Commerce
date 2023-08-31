import { useEffect } from 'react'; // Import React
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, deleteCar } from '../../features/cars/carSlice';
import { toast } from 'react-hot-toast';
import '../../assets/style/DeleteVehicles.css';

function DeleteCarPage() {
    const dispatch = useDispatch();
    const cars = useSelector((state) => state.car); // Make sure the state slice name matches

    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch]);

    const handleDelete = (carId) => {
        dispatch(deleteCar(carId));
        toast.success('Vehicle Deleted!'); // Removed template string for a simple string
    };

    if (cars.loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='DeleteDiv'>
            <h2 className='DeleteTitle'>Delete Vehicles</h2>
            {cars.data.length === 0 ? (
                <p>No vehicles found.</p>
            ) : (
                <ul>
                    {cars.data.map((car) => (
                        <li key={car.id}>
                            <h3>{car.name}</h3>
                            <img src={car.semi_front_image} alt={car.name} width='80px' />
                            <p>${car.price}</p>
                            <button onClick={() => handleDelete(car.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DeleteCarPage;
