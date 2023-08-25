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

  const isAdmin = user && user.role === 'admin';

  return (
    <div className="nav">
      <img src={image} alt="Description" className="logo" />
      {user && <h2 className="welcome-message">Welcome! {user.name}</h2>}
      <ul>
        {!isAuthenticated && (
          <>
            <li className='nav-link-1'>
              <Link to="/sign_up" className="nav-link">
                Sign Up
              </Link>
            </li>

            <li className='nav-link-1'>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-link-1">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-link-1">
              <Link to="/vehicles" className="nav-link">
                Vehicles
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
              <Link to="/vehicles" className="nav-link">
                Vehicles
              </Link>
            </li>

            <li className="nav-link-1">
              <Link to="/reservation" className="nav-link">
                Reservation
              </Link>
            </li>

            <li className="nav-link-1">
              <Link to="/my-reservs" className="nav-link">
                My Reservations
              </Link>
            </li>

            {isAdmin && (
              <li className="nav-link-1">
                <Link to="/addcars" className="nav-link">
                  New vehicle
                </Link>
              </li>
            )}

            {isAdmin && (
              <li className="nav-link-1">
                <Link to="/deletecars" className="nav-link">
                  Delete vehicle
                </Link>
              </li>
            )}

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
