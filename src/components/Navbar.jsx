import { Link } from 'react-router-dom';

const Navbar = () => (
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
        <Link to="/logout">
          Logout
        </Link>
      </li>
    </ul>
  </div>
);

export default Navbar;
