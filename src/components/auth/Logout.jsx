import { useDispatch } from 'react-redux';
import { logoutUser } from '../../features/auth/authActions';

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
