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
    navigate("/");
  };

  return (
    <div className="container" style={{ backgroundColor }}>
      <div className="signup-modal">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              {...register("name", { required: "Full Name is required" })}
            />
            {errors.name && (
              <span className="error">{errors.name.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </div>

          <div className="form-group">
            <label>Password Confirmation</label>
            <input
              type="password"
              name="password_confirmation"
              placeholder="Confirm your password"
              {...register("password_confirmation", {
                required: "Password Confirmation is required",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              })}
            />
            {errors.password_confirmation && (
              <span className="error">
                {errors.password_confirmation.message}
              </span>
            )}
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
