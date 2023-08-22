import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authActions';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <ul>
        <li>
          <Link to="/sign_up">
            Sign Up
          </Link>
        </li>
        <li>
          <Link to="/login">
            Login
          </Link>
        </li>
        <li>
          <Link onClick={handleLogout}>Logout</Link>
        </li>
      </ul>
    </div>
  )
};

export default Navbar;
