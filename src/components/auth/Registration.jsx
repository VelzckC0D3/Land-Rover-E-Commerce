import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../../features/auth/authActions";
import "../../assets/style/Registration.css";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = (formData) => {
    dispatch(registerUser(formData));
    navigate("/");
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
          input:-webkit-autofill::first-line, 
          input:-internal-autofill-previewed,
          input:-webkit-autofill:active  {
            transition: background-color 5000s;
            -webkit-text-fill-color: #fff !important;
            font-size: 1.3rem;
          }
          
          @media (min-width: 900px) {

            .navButton {
              display: block
            }
      
            .navCont {
              transition: transform 0.5s ease-in-out, box-shadow 1s ease-in-out;
            }

            .registrationFormCont {
              background-position: 28rem 40%;
              background-size: contain;
            }
            
            .registrationForm {
              max-width: 50rem;
              transform: scale(0.7)
            }

            .formTitle {
              max-width: none;
            }

            .registrationForm .inputCont {
              flex-direction: row;
            }

            .registrationForm .formInput {
              font-size: 1.3rem;
            }
          }

          @media (min-width: 1024px) {

            .registrationFormCont {
              background-position: 40rem 40%;
            }
          }

          @media (min-width: 1330px) {

            .registrationFormCont {
              background-position: center;
            }
          }
        `}
      </style>
      <div className="formCont registrationFormCont">
        <form className="registrationForm" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="formTitle">Registration</h2>

          <div className="inputsCont">
            <div className="inputCont">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="formInput"
                {...register("name", { required: true })}
              />
              {errors.name && <span>Full Name is required</span>}

              <input
                type="email"
                name="email"
                placeholder="E-mail"
                className="formInput"
                {...register("email", { required: true })}
              />
              {errors.email && <span>Email is required</span>}
            </div>
            <div className="divider" />
            <div className="inputCont">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="formInput"
                {...register("password", { required: true })}
              />
              {errors.password && <span>Password is required</span>}

              <input
                type="password"
                name="password_confirmation"
                placeholder="Password Confirmation"
                className="formInput"
                {...register("password_confirmation", {
                  required: true,
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
              />
              {errors.password_confirmation && (
                <span>{errors.password_confirmation.message}</span>
              )}
            </div>
          <div className="divider" />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default Registration;
