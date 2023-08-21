import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/login',
        {
          user: formData,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        const currentUser = response.data.data;
        console.log(currentUser);
        console.log(
          `User ID: ${currentUser}, User Email: ${currentUser.email}`,
        );
        localStorage.setItem('token', response.headers.authorization);
        toast.success(`User created: ${currentUser.name}`);
      } else {
        const errorResponse = response.data || 'An error occurred.';
        throw new Error(errorResponse);
      }
    } catch (error) {
      toast.error(`Error: ${error}!`);
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
