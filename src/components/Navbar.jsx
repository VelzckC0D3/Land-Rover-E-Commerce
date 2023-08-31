import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authActions";
import image from "../assets/image/navLogo.webp";
import "../assets/style/Navbar.css";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import {
  AiFillLinkedin,
  AiFillTwitterCircle,
  AiFillInstagram,
  AiOutlineGithub,
} from "react-icons/ai";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  /* Handle nav logic */

  const handleNav = () => {
    const navCont = document.querySelector(".navCont");
    const navButton = document.querySelector(".navButton");
    navButton.classList.toggle("btnActive");
    navCont.classList.toggle("active");
  };

  /* Handle nav logic */

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const isAdmin = user && user.role === "admin";

  return (
    <>
      <HiOutlineMenuAlt4 className="navButton" onClick={handleNav} />
      <div className="navCont">
        <img
          src={image}
          alt="Description"
          className="nav-logo"
          onClick={() => {
            handleNav();
            navigate("/");
          }}
        />

        <div className="divider" />

        <ul className="linksCont">
          {!isAuthenticated && (
            <>
              <li className="navLink">
                <Link to="/vehicles" className="navAnchor" onClick={handleNav}>
                  Vehicles
                </Link>
              </li>

              <li className="navLink">
                <Link to="/sign_up" className="navAnchor" onClick={handleNav}>
                  Sign Up
                </Link>
              </li>

              <li className="navLink">
                <Link to="/login" className="navAnchor" onClick={handleNav}>
                  Login
                </Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            <ul className="nav-ul">
              <li className="navLink">
                <Link to="/vehicles" className="navAnchor" onClick={handleNav}>
                  Vehicles
                </Link>
              </li>

              <li className="navLink">
                <Link
                  to="/reservation"
                  className="navAnchor"
                  onClick={handleNav}
                >
                  Make a Reservation
                </Link>
              </li>

              <li className="navLink">
                <Link
                  to="/myreservations"
                  className="navAnchor"
                  onClick={handleNav}
                >
                  My Reservations
                </Link>
              </li>

              {isAdmin && (
                <li className="navLink">
                  <Link to="/addcars" className="navAnchor" onClick={handleNav}>
                    New vehicle
                  </Link>
                </li>
              )}

              {isAdmin && (
                <li className="navLink">
                  <Link
                    to="/deletecars"
                    className="navAnchor"
                    onClick={handleNav}
                  >
                    Delete vehicle
                  </Link>
                </li>
              )}

              <li className="navLink">
                <Link
                  to={`/`}
                  className="navAnchor"
                  onClick={() => {
                    handleLogout();
                    handleNav("/");
                  }}
                >
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </ul>

        <div className="divider" />

        <div className="navFooter">
          <div className="navIcons">
            <AiFillLinkedin className="navIcon" />
            <AiFillTwitterCircle className="navIcon" />
            <AiFillInstagram className="navIcon" />
            <AiOutlineGithub className="navIcon" />
          </div>
          <p className="navCopryright">© 2023 Microverse Students</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
