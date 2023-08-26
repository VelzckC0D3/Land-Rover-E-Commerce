import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReservation } from '../features/reservation/reservSlice';
import { fetchCars } from '../features/cars/carSlice'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AddReservationPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cars = useSelector((state) => state.car.data);
    const userId = useSelector((state) => state.auth.user.id);
    const initialFormData = {
        city: '',
        date: '',
        user_id: userId,
        car_id: ''
    };

    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch]);

    const [formData, setFormData] = useState(initialFormData);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addReservation(formData)).then(() => {
            // Reservation added successfully, reset form fields
            setFormData(initialFormData);
            // Show a success toast message
            toast.success('Reservation added successfully!');
            // Redirect to "My Reservations"
            navigate('/my-reservs')
        });
    };

    return (
        <div className="container">
            <h2>Add Reservation</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    City:
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
                </label>
                <label>
                    Date:
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]} // Set the min attribute to today's date
                    />

                </label>
                <label>
                    Car ID:
                    <select name="car_id" value={formData.car_id} onChange={handleInputChange}>
                        <option value="">Select a car</option>
                        {cars.map((car) => (
                            <option key={car.id} value={car.id}>
                                {car.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Add Reservation</button>
            </form>
        </div>
    );
}

export default AddReservationPage;
