import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authActions';
import image from '../assets/image/1692748907010.png';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="nav">
     <img src={image} alt="Description" className="logo" />
     {user && <h2 className="welcome-message">Welcome! {user.name}</h2>}
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
          <ul className='nav-ul'>
            <li className="nav-link-1">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-link-1">
              <Link to="/reservation" className="nav-link">
                Reservation
              </Link>
            </li>

              <li className="nav-link-1">
              <Link to="/my_reservation" className="nav-link">
                My Reservation
              </Link>
            </li>
            <li className="nav-link-1">
              <Link onClick={handleLogout} className="nav-link">Logout</Link>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
