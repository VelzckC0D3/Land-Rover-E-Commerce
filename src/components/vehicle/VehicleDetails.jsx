import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars } from "../../features/cars/carSlice";
import { Link } from "react-router-dom";
import "../../assets/style/VehicleDetails.css";
import { SwishSpinner } from "react-spinners-kit";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
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

  const duration = 48;
  const financeFee = car.price * 0.05 * 5;
  const minimumDeposit = car.price * 0.01 * duration;
  const totalAmount = car.price + financeFee * 2;

  const makeReservation = isAuthenticated ? (
    <Link to={`/car-reservation/${car.id}`}>
      <button className="scheduleBtn">
        Make Reservation
        <FaAngleRight />
      </button>
    </Link>
  ) : (
    <button className="scheduleBtn" onClick={() => navigate("/login")}>
      Make Reservation
      <FaAngleRight />
    </button>
  );

  return (
    <div className="detailsCont">
      <div className="detailsHeader">
        <h1 className="detailsName">{car.name}</h1>
        <p className="detailsSub">Model Details & Reservation</p>
      </div>
      <style>
        {`
            @media (min-width: 900px) {
              .detailsCont {
                min-width: 0;
              }
              
              .navButton{
                display: none;
              }
              .navCont {
                transform: translateX(0px);
                position: relative;
                box-shadow: 10px 0 10px rgba(0, 0, 0, 0.1);
                width: 16rem;
                box-shadow: none;
              }
            }

          `}
      </style>

      <div className="detailsSwiperCont">
        <Swiper
          loop={true}
          navigation={true}
          effect="fade"
          speed={0}
          spaceBetween={10}
          modules={[EffectFade, Navigation]}
          className="detailsSwiper"
        >
          <SwiperSlide>
            <div className="detailsImgBg">
              <div
                className={`detailsImg semiFront2${car.id}`}
                alt={car.name}
              />
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
      </div>
      <div className="detailsInfoCont">
        { window.innerWidth > 900 ? 
         <div className="detailsHeader2">
         <h1 className="detailsName2">{car.name}</h1>
         <p className="detailsSub2">Model Details & Reservation</p>
       </div> : null }

        <div className="divider" />
        <div className="detailsInfo">
          <div className="detailsPrice">
            <p>Minimum deposit</p>
            <p>${minimumDeposit.toLocaleString()}</p>
          </div>
          <div className="detailsPrice">
            <p>Finance fee</p>
            <p>${financeFee.toLocaleString()}</p>
          </div>
          <div className="detailsPrice">
            <p>Total amount</p>
            <p>${totalAmount.toLocaleString()}</p>
          </div>
          <div className="detailsPrice">
            <p>Duration</p>
            <p>{duration} Months</p>
          </div>

        </div>

        <div className="divider" />
        <div className="detailsSchedule">
          <p className="scheduleText">Did you want a Test Drive?</p>
          {makeReservation}
        </div>
      </div>
    </div>
  );
}

export default CarDetails;
