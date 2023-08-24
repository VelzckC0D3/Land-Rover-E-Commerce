import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';

const Reservation = () => {
    const user = useSelector((state) => state.auth.user);
    const cars = useSelector((state) => state.car.data);
    const [formData, setFormData] = useState({
        city: '',
        date: '',
        user_id: user.id,
        car_id: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://127.0.0.1:3000/api/v1/reservations',
                {
                    reservation: formData,
                }
            );

            if (response.status === 200) {
                localStorage.setItem('reservation', JSON.stringify(formData));
                toast.success('Reservation Complete!');
                window.location.href = '/my-reservs';
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            toast.error(`Registration failed. Error: ${error.message}`);
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="city"
                placeholder="city"
                value={formData.city}
                onChange={handleChange}
                required
            />

            <input
                type="date"
                min={today}
                name="date"
                placeholder="date"
                value={formData.date}
                onChange={handleChange}
                required
            />

            <select name="car_id" value={formData.car_id} onChange={handleChange} required>
                <option value="">Select a car</option>
                {cars.map((car) => (
                    <option key={car.id} value={car.id}>
                        {car.name}
                    </option>
                ))}
            </select>

            <button type="submit">Register</button>
        </form>
    );
};

export default Reservation;
