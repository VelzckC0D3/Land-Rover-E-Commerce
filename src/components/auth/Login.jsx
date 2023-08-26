import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../features/auth/authActions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (formData) => {
    dispatch(loginUser(formData));
    navigate('/')
  };

  return (
    <div className='container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          {...register('email', { required: true })}
        />
        {errors.email && <span>Email is required</span>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          {...register('password', { required: true })}
        />
        {errors.password && <span>Password is required</span>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
