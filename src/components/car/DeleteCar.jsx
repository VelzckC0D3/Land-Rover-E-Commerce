import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, deleteCar } from '../../features/cars/carSlice';
import { toast } from 'react-hot-toast';

function DeleteCarPage() {
    const dispatch = useDispatch();
    const cars = useSelector((state) => state.car.data);

    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch]);

    const handleDelete = (carId) => {
        dispatch(deleteCar(carId));
        toast.success(`Vehicle Deleted!`)
    };

    return (
        <div className='container'>
            <h2>Delete Vehicles</h2>
            {cars.length === 0 ? (
                <p>No vehicles found.</p>
            ) : (
                <ul>
                    {cars.map((car) => (
                        <li key={car.id}>
                            <p>Model: {car.name}</p>
                            <p>Price: {car.price}</p>
                            <button onClick={() => handleDelete(car.id)}>Delete</button>
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DeleteCarPage;
