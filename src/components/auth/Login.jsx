import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { loginUser } from "../../features/auth/authActions";
import { useNavigate } from "react-router-dom";
import "../../assets/style/Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    dispatch(loginUser(formData));
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
