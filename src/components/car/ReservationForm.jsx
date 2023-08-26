import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReservation } from '../../features/reservation/reservSlice';
import { fetchCars } from '../../features/cars/carSlice'
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AddReservationPage() {
    const navigate = useNavigate();
    const { carId } = useParams();
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.auth.user.id);
    const initialFormData = {
        city: '',
        date: '',
        user_id: userId,
        car_id: carId
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
            // redirect to "/My-Reservations"
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
                <button type="submit">Add Reservation</button>
            </form>
        </div>
    );
}

export default AddReservationPage;
