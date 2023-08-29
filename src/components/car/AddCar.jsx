import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCar } from "../../features/cars/carSlice"; // Update with the correct import path
import { toast } from "react-hot-toast";

function AddCarForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialFormData = {
    name: "",
    price: "",
    description: "",
    front_image: "",
    back_image: "",
    interior_image: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addCar(formData)).then(() => {
      // Car added successfully, reset form fields
      setFormData(initialFormData);
      // Show a success toast message
      toast.success("Vehicle added successfully!");
      // Redirect to "/vehicles"
      navigate("/vehicles");
    });
  };

  return (
    <div className="container">
      <h2>Add New Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Model"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="front_image"
          placeholder="Front Image URL"
          value={formData.front_image}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="back_image"
          placeholder="Back Image URL"
          value={formData.back_image}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="interior_image"
          placeholder="Interior Image URL"
          value={formData.interior_image}
          onChange={handleInputChange}
        />
        <input
          type="color"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
        />
        <button type="submit">Add Vehicle</button>
      </form>
    </div>
  );
}

export default AddCarForm;
