import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../../features/auth/authActions";
import "../../assets/style/Registration.css";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const [backgroundColor, setBackgroundColor] = useState("rgb(255, 180, 0)");

  useEffect(() => {
    const interval = setInterval(changeBackgroundColor, 3000);
    return () => clearInterval(interval);
  }, []);

  const changeBackgroundColor = () => {
    // Generate a random color for the background
    const randomColor =
      "rgb(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      ")";
    setBackgroundColor(randomColor);
  };

  const onSubmit = (formData) => {
    dispatch(registerUser(formData));
    navigate('/');
  };

  return (
    <div className="formCont">
      <h2 className="formTitle">Registration</h2>
      <form className="RegisterForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputCont">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="formInput"
            {...register('name', { required: true })}
          />
          {errors.name && <span>Full Name is required</span>}
        </div>

        <div className="inputCont">
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            className="formInput"
            {...register('email', { required: true })}
          />
          {errors.email && <span>Email is required</span>}
        </div>

        <div className="inputCont">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="formInput"
            {...register('password', { required: true })}
          />
          {errors.password && <span>Password is required</span>}
        </div>

        <div className="inputCont">
          <input
            type="password"
            name="password_confirmation"
            placeholder="Password Confirmation"
            className="formInput"
            {...register('password_confirmation', {
              required: true,
              validate: (value) =>
                value === getValues('password') || 'Passwords do not match',
            })}
          />
          {errors.password_confirmation && (
            <span>{errors.password_confirmation.message}</span>
          )}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
