import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars } from "../../features/cars/carSlice";
import { Link } from "react-router-dom";
import "../../assets/style/VehicleDetails.css";
import { SwishSpinner } from "react-spinners-kit";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { FaAngleLeft } from "react-icons/fa";
import { LuRotate3D } from "react-icons/lu";

function CarDetails() {
  const { carId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const cars = useSelector((state) => state.car);
  const isAuthenticated = useSelector((state) => state.auth.user);

  const car = cars.data.find((car) => car.id === parseInt(carId));

  if (cars.loading) {
    return <SwishSpinner size="50" frontColor="#98be18" loading={true} />;
  }

  if (!car) {
    return <div>Car not found</div>;
  }

  const reservationButton = isAuthenticated ? (
    <Link to={`/reservation/${car.id}`} className="nav-link">
      <button>Make Reservation</button>
    </Link>
  ) : (
    <button onClick={() => navigate("/login")}>Make Reservation</button>
  );

  return (
    <div className="detailsCont">
      <div className="detailsHeader">
        <h1 className="detailsName">{car.name}</h1>
        <p className="detailsSub">Model Details & Reservation</p>
      </div>
      <Swiper
        loop={true}
        effect="fade"
        spaceBetween={10}
        modules={[EffectFade]}
        className="detailsSwiper"
      >
        <SwiperSlide>
          <div className="detailsImgBg">
            <div className={`detailsImg front${car.id}`} alt={car.name} />
          </div>
          <style>
            {` 
            .front${car.id}{
              background-image: url(${car.front_image});
            }
            `}
          </style>
        </SwiperSlide>

        <SwiperSlide>
          <div className="detailsImgBg">
            <div className={`detailsImg semiFront${car.id}`} alt={car.name} />
          </div>
          <style>
            {` 
            .semiFront${car.id}{
              background-image: url(${car.semi_front_image});
            }
            `}
          </style>
        </SwiperSlide>

        <SwiperSlide>
          <div className="detailsImgBg">
            <div className={`detailsImg side${car.id}`} alt={car.name} />
          </div>
          <style>
            {` 
            .side${car.id}{
              background-image: url(${car.side_image});
            }
            `}
          </style>
        </SwiperSlide>

        <SwiperSlide>
          <div className="detailsImgBg">
            <div className={`detailsImg semiBack${car.id}`} alt={car.name} />
          </div>
          <style>
            {` 
            .semiBack${car.id}{
              transform: scaleX(-1);
              background-image: url(${car.semi_back_image});
            }
            `}
          </style>
        </SwiperSlide>

        <SwiperSlide>
          <div className="detailsImgBg">
            <div className={`detailsImg back${car.id}`} alt={car.name} />
          </div>
          <style>
            {` 
            .back${car.id}{
              background-image: url(${car.back_image});
            }
            `}
          </style>
        </SwiperSlide>

        <SwiperSlide>
          <div className="detailsImgBg">
            <div className={`detailsImg semiBack2${car.id}`} alt={car.name} />
          </div>
          <style>
            {` 
            .semiBack2${car.id}{
              background-image: url(${car.semi_back_image});
            }
            `}
          </style>
        </SwiperSlide>

        <SwiperSlide>
          <div className="detailsImgBg">
            <div className={`detailsImg side2${car.id}`} alt={car.name} />
          </div>
          <style>
            {` 
            .side2${car.id}{
              transform: scaleX(-1);
              background-image: url(${car.side_image});
            }
            `}
          </style>
        </SwiperSlide>

        <SwiperSlide>
          <div className="detailsImgBg">
            <div className={`detailsImg semiFront2${car.id}`} alt={car.name} />
          </div>
          <style>
            {` 
            .semiFront2${car.id}{
              transform: scaleX(-1);
              background-image: url(${car.semi_front_image});
            }
            `}
          </style>
        </SwiperSlide>
      </Swiper>

      <div className="detailsActions">
        <Link to="/vehicles" className="detailsBack">
          <FaAngleLeft />
        </Link>
        <div className="detailsRotate">
          <LuRotate3D className="rotateButton" />
          <p className="rotateText">Drag To Rotate</p>
        </div>
      </div>

      <div className="detailsInfo">
        <p className="detailsDeposit">
          $350 deposit upon any Land Rover purchase.
        </p>
        <p>Price: ${car.price}</p>
      </div>
      {reservationButton}
    </div>
  );
}

export default CarDetails;
