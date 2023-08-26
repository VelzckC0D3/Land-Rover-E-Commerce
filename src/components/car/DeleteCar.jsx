import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars, deleteCar } from '../../features/cars/carSlice'; // Update with the correct import path

function DeleteCarPage() {
    const dispatch = useDispatch();
    const cars = useSelector((state) => state.car.data);

    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch]);

    const handleDelete = (carId) => {
        dispatch(deleteCar(carId)); // Make sure the deleteCar action is correctly defined and imported
    };

    return (
        <div>
            <h2>Delete Cars</h2>
            {cars.length === 0 ? (
                <p>No cars found.</p>
            ) : (
                <ul>
                    {cars.map((car) => (
                        <li key={car.id}>
                            <p>Model: {car.name}</p>
                            <p>Price: {car.price}</p>
                            <p>Description: {car.description}</p>
                            {/* Display other car information */}
                            <button onClick={() => handleDelete(car.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DeleteCarPage;
