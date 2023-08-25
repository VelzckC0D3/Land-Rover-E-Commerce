import { useDispatch, useSelector } from 'react-redux';
import { addCar } from '../../features/cars/carSlice';
import { useForm, Controller } from 'react-hook-form';

const AddCar = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (formData) => {
        dispatch(addCar(formData));
    };

    const isAdmin = user && user.role === 'admin';

    return (
        isAdmin && (
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                        <div>
                            <input
                                type="text"
                                placeholder="Model"
                                {...field}
                            />
                            {errors.name && <span>This field is required</span>}
                        </div>
                    )}
                />

                <Controller
                    name="price"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                        <div>
                            <input
                                type="number"
                                placeholder="Price"
                                {...field}
                            />
                            {errors.price && <span>This field is required</span>}
                        </div>
                    )}
                />

                <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                        <div>
                            <input
                                type="text"
                                placeholder="Description"
                                {...field}
                            />
                            {errors.description && <span>This field is required</span>}
                        </div>
                    )}
                />

                <Controller
                    name="front_image"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                        <div>
                            <input
                                type="text"
                                placeholder="Front image"
                                {...field}
                            />
                            {errors.front_image && <span>This field is required</span>}
                        </div>
                    )}
                />

                <Controller
                    name="back_image"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                        <div>
                            <input
                                type="text"
                                placeholder="Back image"
                                {...field}
                            />
                            {errors.back_image && <span>This field is required</span>}
                        </div>
                    )}
                />

                <Controller
                    name="interior_image"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => (
                        <div>
                            <input
                                type="text"
                                placeholder="Interior image"
                                {...field}
                            />
                            {errors.interior_image && <span>This field is required</span>}
                        </div>
                    )}
                />

                <button type="submit">Add Car</button>
            </form>
        )
    );
};

export default AddCar;
