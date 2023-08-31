import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars, deleteCar } from "../../features/cars/carSlice";
import { toast } from "react-hot-toast";

function DeleteCarPage() {
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.car);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleDelete = (carId) => {
    dispatch(deleteCar(carId));
    toast.success(`Vehicle Deleted!`);
  };

  if (cars.loading) {
    return <div>Loading...</div>;
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
     `}
      </style>
      <div className="container">
        <h2>Delete Vehicles</h2>
        {cars.data.length === 0 ? (
          <p>No vehicles found.</p>
        ) : (
          <ul>
            {cars.data.map((car) => (
              <li key={car.id}>
                <p>Model: {car.name}</p>
                <p>Price: {car.price}</p>
                <button onClick={() => handleDelete(car.id)}>Delete</button>
                <hr />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default DeleteCarPage;
