import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../features/auth/authActions';

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

  const onSubmit = (formData) => {
    dispatch(registerUser(formData));
    navigate('/')
  };


  return (
    <div className='container'>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          {...register('name', { required: true })}
        />
        {errors.name && <span>Full Name is required</span>}

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

        <input
          type="password"
          name="password_confirmation"
          placeholder="Password Confirmation"
          {...register('password_confirmation', {
            required: true,
            validate: (value) =>
              value === getValues('password') || 'Passwords do not match',
          })}
        />
        {errors.password_confirmation && <span>{errors.password_confirmation.message}</span>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
