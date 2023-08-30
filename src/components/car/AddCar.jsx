import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCar } from "../../features/cars/carSlice";
import { toast } from "react-hot-toast";

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
    <div className="container">
      <h2>Add New Vehicle</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          name="name"
          placeholder="Model"
          {...register("name", { required: true })}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          {...register("price", { required: true })}
        />
        <textarea
          name="description"
          placeholder="Description"
          {...register("description", { required: true })}
        />
        <input
          type="text"
          name="front_image"
          placeholder="Front Image URL"
          {...register("front_image", { required: true })}
        />
        <input
          type="text"
          name="back_image"
          placeholder="Back Image URL"
          {...register("back_image", { required: true })}
        />
        <input
          type="text"
          name="interior_image"
          placeholder="Interior Image URL"
          {...register("interior_image")}
        />
        <label htmlFor="color">Color</label>
        <input
          type="color"
          name="color"
          {...register("color")}
        />
        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  );
}

export default AddCarForm;
