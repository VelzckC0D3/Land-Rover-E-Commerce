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
      navigate("/myreservations");
    });
  };

  return (
    <div className="formCont reservationCont">
      <style>
        {`

        .divider {
          margin-top: 0.5rem;
          width: 100%;
          background-color: white;
        }

        .navButton{
          filter: brightness(0) invert(1);
        }
        .btnActive {
          transform: rotate(360deg);
          -webkit-transform: rotate(360deg);
          filter: brightness(1) invert(0);
        }

          input:-webkit-autofill,
          input:-webkit-autofill:hover, 
          input:-webkit-autofill:focus, 
          input:-webkit-autofill:active  {
            -webkit-text-fill-color: white !important;
          }

          .formCont{
            background-color: grey;
          }

        .formCont{
          background-color: grey;
        }
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
      <form className="reservationForm" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="formTitle">Test Drive</h2>
        <p className="formDesc">
          Book your test drive today for a chance to experience the excitement
          of driving a supercar! We&rsquo;ll get in touch with you to confirm
          your reservation and make it happen.
        </p>
        <div className="inputCont">
          <input
            required={true}
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
            className="formInput formSelect"
          >
            <option className="carSelector">Select a car</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id} className="carSelector">
                {car.name}
              </option>
            ))}
          </select>
          {errors.car_id && <span>This field is required</span>}
        </div>
        <button type="submit" className="submit">
          Book Reservation
        </button>
      </form>
    </div>
  );
}

export default AddReservationPage;
