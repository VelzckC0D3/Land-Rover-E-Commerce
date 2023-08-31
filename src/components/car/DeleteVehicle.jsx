import { useEffect } from "react"; // Import React
import { useDispatch, useSelector } from "react-redux";
import { fetchCars, deleteCar } from "../../features/cars/carSlice";
import { toast } from "react-hot-toast";
import "../../assets/style/DeleteVehicles.css";
import { SwishSpinner } from "react-spinners-kit";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function DeleteCarPage() {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.car); // Make sure the state slice name matches

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleDelete = (carId) => {
    dispatch(deleteCar(carId));
    toast.success("Vehicle Deleted!"); // Removed template string for a simple string
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
           .navButton {
             display: block
           }
         
           .navCont {
             transition: transform 0.5s ease-in-out, box-shadow 1s ease-in-out;
           }
          }
         `}
      </style>
      <div className="deleteCont">
        <h1 className="deleteTitle">Delete Cars</h1>
        <p className="deleteDescription">
          Please select a Land Rover model to delete.
        </p>
        <Swiper
          className="deleteSwiper"
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            650: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            980: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
          }}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation, Pagination]}
        >
          {cars.data.map((car) => (
            <SwiperSlide key={car.id} className={`deleteSwiperCar swiperCar${car.id}`}>
              <h3>{car.name}</h3>
              <img className={`imgCar imgCar${car.id}`} src={car.semi_front_image} alt={car.name} />
              <style>
                {`
                .swiperCar${car.id}::before{
                  background-color: ${car.color};
                }
                `}
              </style>
              <button onClick={() => handleDelete(car.id)}>Delete</button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default DeleteCarPage;
