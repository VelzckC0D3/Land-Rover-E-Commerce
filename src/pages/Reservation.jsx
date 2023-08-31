import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReservation } from "../features/reservation/reservSlice";
import { fetchCars } from "../features/cars/carSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../assets/style/Reservation.css";

function AddReservationPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.car.data);

  const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  const userId = userFromLocalStorage ? userFromLocalStorage.id : null;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      city: "",
      date: "",
      user_id: userId,
      car_id: "",
    },
  });

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const onSubmit = (formData) => {
    dispatch(addReservation(formData)).then(() => {
      // Reservation added successfully, reset form fields
      setValue("city", "");
      setValue("date", "");
      setValue("car_id", "");
      // Show a success toast message
      toast.success("Reservation added successfully!");
      // Redirect to "My Reservations"
      navigate("/my-reservs");
    });
  };

  return (
    <div className="formCont">
      <style>
        {`
        .formCont{
          background-color: grey;
        }
        `}
      </style>
      <h2 className="formTitle">Test Drive</h2>
      <form className="reservForm" onSubmit={handleSubmit(onSubmit)}>
        <div className="inputCont">
          <input
            type="text"
            name="city"
            placeholder="City"
            {...register("city", { required: true })}
            className="formInput"
          />
          {errors.city && <span>This field is required</span>}

          <input
            type="date"
            name="date"
            placeholder="Date"
            {...register("date", { required: true })}
            min={new Date().toISOString().split("T")[0]}
            className="formInput"
          />
          {errors.date?.type === "required" && (
            <span>This field is required</span>
          )}
          {errors.date?.type === "min" && (
            <span>Date must be in the future</span>
          )}

          <select
            name="car_id"
            {...register("car_id", { required: true })}
            className="formInput"
          >
            <option value="">Select a car</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.name}
              </option>
            ))}
          </select>
          {errors.car_id && <span>This field is required</span>}

          <button type="submit" className="formInput">
            New Test Drive
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddReservationPage;
