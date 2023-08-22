import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authActions';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <ul>
        {!isAuthenticated && (
          <>
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
          </>
        )}
        {isAuthenticated && (
          <li>
            <Link onClick={handleLogout}>Logout</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
