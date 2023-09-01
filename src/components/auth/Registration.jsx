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
                required={true}
                type="text"
                name="name"
                placeholder="Full Name"
                className="formInput"
                {...register("name", { required: true })}
              />

              <input
                required={true}
                type="email"
                name="email"
                placeholder="E-mail"
                className="formInput"
                {...register("email", { required: true })}
              />
            </div>
            <div className="divider" />
            <div className="inputCont inputCont2">
              <input
                required={true}
                type="password"
                name="password"
                placeholder="Password"
                className="formInput"
                {...register("password", { required: true })}
              />

              <input
                required={true}
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
            </div>
            <div className="divider divider2" />
          </div>
          <button className="registrationSubmit" type="submit">Register</button>
          <div className="formHelper registrationHelper">
            <p className="helperText">Already have an account?</p>
            <a className="helperLink" href="/login">Login</a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
