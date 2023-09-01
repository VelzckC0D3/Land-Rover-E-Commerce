import { useEffect } from "react"; // Import React
import { useDispatch, useSelector } from "react-redux";
import { fetchCars, deleteCar } from "../../features/cars/carSlice";
import { toast } from "react-hot-toast";
import "../../assets/style/DeleteVehicles.css";
import { SwishSpinner } from "react-spinners-kit";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { RiDeleteBin5Line } from "react-icons/ri";

function DeleteCarPage() {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.car);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleDelete = (carId) => {
    dispatch(deleteCar(carId));
    toast.success("Vehicle Deleted!");
  };

  const confirmDelete = (carId, carName) => {
    const result = window.confirm(`Are you sure you want to delete the model ${carName}?`);
    if (result) {
      handleDelete(carId);
    }
  };

  if (cars.loading) {
    return (
      <div>
        <SwishSpinner size="50" frontColor="#98be18" loading={true} />
      </div>
    );
  }

  return (
    <>
      <style>
        {`

          @media (min-width: 900px) {

           .deleteCont {
            width: 100%;
            min-width: 50%;
            max-width: 100%;
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
      <div className="deleteCont">
        <div className="deleteHeader">
          <h1 className="deleteTitle">Delete Vehicles</h1>
          <p className="deleteDescription">
            Please select a Land Rover model to delete.
          </p>
          <div className="divider" />
        </div>
        <Swiper
          className="deleteSwiper"
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 100,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation]}
        >
          {cars.data.map((car) => (
            <SwiperSlide
              key={car.id}
              className={`deleteSwiperCar swiperCar${car.id}`}
            >
              <img
                className={`imgCar imgCar${car.id}`}
                src={car.semi_front_image}
                alt={car.name}
              />
              <style>
                {`
                .swiperCar${car.id}::before{
                  background-color: ${car.color};
                }
                `}
              </style>
              <div className="deleteInfo">
                <h3>{car.name}</h3>
                <div className={`divider divider${car.id}`} />
                <style>
                  {`
                  .divider${car.id} {
                    background-color: ${car.color};
                  }
                  `}
                </style>
                <button onClick={() => confirmDelete(car.id, car.name)}>
                  Delete {<RiDeleteBin5Line className="delIcon" />}
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default DeleteCarPage;
