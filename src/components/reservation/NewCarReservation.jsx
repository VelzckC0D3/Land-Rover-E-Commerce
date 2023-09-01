import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addReservation } from "../../features/reservation/reservSlice";
import { fetchCars } from "../../features/cars/carSlice";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../../assets/style/NewReservation.css";
import { BsCalendar2Week } from "react-icons/bs";

function AddReservationPage() {
  const navigate = useNavigate();
  const { carId } = useParams();
  const dispatch = useDispatch();

  const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
  const userId = userFromLocalStorage ? userFromLocalStorage.id : null;

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const onSubmit = (data) => {
    const formDataWithIds = {
      ...data,
      user_id: userId,
      car_id: carId,
    };

    dispatch(addReservation(formDataWithIds)).then(() => {
      // Show a success toast message
      toast.success("Reservation added successfully!");
      // Redirect to "My Reservations"
      navigate("/my-reservations");
    });
  };

  return (
    <>
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
      <div className="formCont reservationCont">
        <form className="reservationForm" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="formTitle">Test Drive</h2>
          <p className="formDesc">
            Book your test drive today for a chance to experience the excitement
            of driving a supercar! We&rsquo;ll get in touch with you to confirm
            your reservation and make it happen.
          </p>

          <div className="inputCont">
            <input
              type="text"
              name="city"
              placeholder="City"
              {...register("city", { required: true })}
              className="formInput"
            />
            <div className="inputDate">
              <input
                type="date"
                name="date"
                placeholder="Date"
                value={new Date().toISOString().split("T")[0]}
                {...register("date", { required: true })}
                min={new Date().toISOString().split("T")[0]}
                className="formInput dateInput"
              />
              <BsCalendar2Week className="calendarIcon" />
            </div>
          </div>

          <div className="divider" />

          <button className="reservationSubmit" type="submit">
            Book Reservation
          </button>
        </form>
      </div>
    </>
  );
}

export default AddReservationPage;
