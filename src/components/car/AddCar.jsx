import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCar } from "../../features/cars/carSlice";
import { toast } from "react-hot-toast";
import "../../assets/style/AddCar.css";

function AddCarForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    dispatch(addCar(data)).then(() => {
      // Car added successfully, reset form fields
      reset();
      // Show a success toast message
      toast.success("Vehicle added successfully!");
      // Redirect to "/vehicles"
      navigate("/vehicles");
    });
  };

  return (
    <>
      <style>
        {`

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
            transition: background-color 5000s;
            -webkit-text-fill-color: white !important;
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
      <div className="carFormCont addCar">
        <form className="carForm" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="formTitle carFormTitle">Add New Vehicle</h2>
          <div className="mainInputs">
            <input
              required={true}
              className="carFormInput"
              type="text"
              name="name"
              placeholder="Model"
              {...register("name", { required: true })}
            />

            <input
              required={true}
              className="carFormInput"
              type="number"
              name="price"
              placeholder="Price"
              {...register("price", { required: true })}
            />
          </div>

          <textarea
            required={true}
            className="carFormArea"
            name="description"
            placeholder="Description"
            {...register("description", { required: true })}
          />

          <div className="imageInputs">
            <input
              required={true}
              className="carFormInput"
              type="text"
              name="front_image"
              placeholder="Front Image URL"
              {...register("front_image", { required: true })}
            />

            <input
              required={true}
              className="carFormInput"
              type="text"
              name="semi_front_image"
              placeholder="Semi Front Image URL"
              {...register("semi_front_image", { required: true })}
            />

            <input
              required={true}
              className="carFormInput"
              type="text"
              name="side_image"
              placeholder="Side Image URL"
              {...register("side_image", { required: true })}
            />

            <input
              required={true}
              className="carFormInput"
              type="text"
              name="semi_back_image"
              placeholder="Semi Back Image URL"
              {...register("semi_back_image", { required: true })}
            />

            <input
              required={true}
              className="carFormInput"
              type="text"
              name="back_image"
              placeholder="Back Image URL"
              {...register("back_image", { required: true })}
            />
          </div>

          <label htmlFor="color" className="carColor">
            Pick Theme Color
            <input
              required={true}
              type="color"
              name="color"
              {...register("color")}
            />
          </label>
          <button type="submit">Add Vehicle</button>
        </form>
      </div>
    </>
  );
}

export default AddCarForm;
