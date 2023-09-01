import { useEffect, useState } from "react"; // Import useState
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReservations,
  deleteReservation,
} from "../../features/reservation/reservSlice";
import { fetchCars } from "../../features/cars/carSlice";
import { toast } from "react-hot-toast";
import { SwishSpinner } from "react-spinners-kit";
import "../../assets/style/MyReservations.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

function UserReservation() {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reserv.data);
  const cars = useSelector((state) => state.car.data);
  const authUser = useSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchReservations())
      .then(() => dispatch(fetchCars()))
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  const handleDelete = (reservationId) => {
    dispatch(deleteReservation(reservationId));
    toast.success("Reservation Deleted!");
  };

  const confirmDelete = (reservationId, carName) => {
    const result = window.confirm(`Are you sure you want to cancel the Test Drive for ${carName}?`)
    if (result) {
      handleDelete(reservationId);
    }
  }

  const getCarName = (carId) => {
    const car = cars.find((car) => car.id === carId);
    return car ? car.name : "Unknown Car";
  };

  const getCarColor = (carId) => {
    const car = cars.find((car) => car.id === carId);
    return car ? car.color : "Unknown Car";
  };

  const getCarImage = (carId) => {
    const car = cars.find((car) => car.id === carId);
    return car ? car.semi_front_image : "Unknown Car";
  };

  const userReservations = reservations.filter((reservation) => {
    const carExists = cars.some((car) => car.id === reservation.car_id);
    return reservation.user_id === authUser.id && carExists;
  });

  return (
    <>
      <style>
        {`

          .swiper-pagination-bullet {
            border: 1px solid grey !important;
            transform: scale(1.5) translateX(0.55rem) !important;
            margin: 0.5rem !important;
          }

          .swiper-pagination-bullet-active {
            background-color: grey !important;
          }

          @media (min-width: 900px) {
            .myReservationsCont {
              min-width: 50%;
            }
            .swiperCont {
              width: 100%;
            }
            .navButton{
              display: none;
            }
            .navCont {
              transform: translateX(0px);
              position: relative;
              box-shadow: 10px 0 10px rgba(0, 0, 0, 0.1);
              width: 16rem;
            }
          }
        `}
      </style>
      <div className="myReservationsCont">
        {loading ? (
          <SwishSpinner size="50" frontColor="#98be18" loading={true} />
        ) : userReservations.length === 0 ? (
          <>
            <div className="reservationsEmpty">
              <h1>Tests Drive</h1>
              <p>You don&apos;t have any Test Drive reservation yet.</p>
            </div>
          </>
        ) : (
          <div className="myReservations">
            <div className="header">
              <h1 className="title">Tests Drive</h1>
              <p className="desc">
                Here you can see all your Test Drive reservations.
              </p>
              <div className="divider"></div>
            </div>

            <Swiper
              direction={"vertical"}
              slidesPerView={1}
              spaceBetween={30}
              mousewheel={true}
              pagination={{
                clickable: true,
              }}
              modules={[Mousewheel, Pagination]}
              className="reservationSwiper"
            >
              {userReservations.map((reservation) => (
                <SwiperSlide className="reservationSlide" key={reservation.id}>
                  <div className="reservationInfo">
                    <div className="reservationAttr">
                      <p className="attrName">Model:</p> <p>{getCarName(reservation.car_id)}</p>
                    </div>
                    <div className="reservationAttr">
                      <p className="attrName">City:</p> <p>{reservation.city}</p>
                    </div>
                    <div className="reservationAttr">
                      <p className="attrName">Date:</p> <p>{reservation.date}</p>
                    </div>
                  </div>
                  <div className={`carImg carImg${reservation.car_id}`}></div>
                  <style>
                    {`
                      .carImg${reservation.car_id} {
                        background-image: url(${getCarImage(reservation.car_id, getCarName)});
                        width: 100%;
                        max-width: 20rem;
                        background-size: contain;
                        background-repeat: no-repeat;
                        background-position: center;
                        height: 20rem;
                        margin: -3rem 0;
                      }

                      .carImg${reservation.car_id}::before {
                        background-color: ${getCarColor(reservation.car_id)};
                      }
                    `}
                  </style>
                  <button className="cancelReservationBtn" onClick={() => confirmDelete(reservation.id, getCarName(reservation.car_id))}>
                    Cancel Reservation
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </>
  );
}

export default UserReservation;
