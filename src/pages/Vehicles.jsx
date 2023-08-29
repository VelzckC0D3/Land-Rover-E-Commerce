import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCars } from "../features/cars/carSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "../assets/style/Vehicles.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Vehicles() {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.car.data);
  const sortedCars = cars.slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <>
      <div className="vehiclesCont">
        <div className="vehiclesHeader">
          <h1 className="vehiclesTitle">LATEST MODELS</h1>
          <p className="vehiclesSub">Please select a Land Rover model.</p>
          <div className="divider" />
        </div>

        <style>
          {`
            @media (min-width: 420px) {
              .carImg::before {
                width: 12rem;
                height: 12rem;
              }
            }

            @media (min-width: 620px) {
              .carImg::before {
                width: 15rem;
                height: 15rem;
              }
            }

            @media (min-width: 768px) {
              .carImg::before {
                width: 10rem;
                height: 10rem;
              }
            }

            @media (min-width: 900px) {
              .vehiclesCont {
                min-width: 85vw;
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
                width: auto;
              }
            }

            @media (min-width: 1024px) {
              .carImg::before {
                width: 8rem;
                height: 8rem;
              }
            }

            @media (min-width: 1300px) {
              .carImg::before {
                width: 10rem;
                height: 10rem;
              }
            }

          `}
        </style>

        <Swiper
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 100,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
          cssMode={true}
          navigation={true}
          direction="horizontal"
          modules={[Navigation]}
          className="swiperCont"
        >
          {sortedCars.map((car) => (
            <SwiperSlide className="vehicleSwiper" key={car.id}>
              <Link to={`/car_details/${car.id}`} className="carLink">
                <div className={`carImg car${car.id}`}>
                  <style>
                    {`
                      .car${car.id}::before {
                        background-color: ${car.color};
                      }
                      .divider${car.id} {
                        background-color: ${car.color};
                        width: 100%;
                        height: 2px;
                      }
                    `}
                  </style>
                  <img src={car.front_image} alt={car.name} />
                </div>
                <h2>{car.name}</h2>
                <div className={`divider${car.id}`} />
                <p>{car.description}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default Vehicles;
