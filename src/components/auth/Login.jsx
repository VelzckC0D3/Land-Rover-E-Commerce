import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { loginUser } from "../../features/auth/authActions";
import { useNavigate } from "react-router-dom";
import "../../assets/style/Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    dispatch(loginUser(formData));
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

            .loginFormCont {
              background-position: 28rem 40%;
              background-size: contain;
            }
            
            .loginForm {
              max-width: 50rem;
              transform: scale(0.7)
            }

            .formTitle {
              max-width: none;
            }

            .loginForm .inputCont {
              flex-direction: row;
            }

            .loginForm .formInput {
              font-size: 1.3rem;
            }
          }

          @media (min-width: 900px) {
            .navButton {
              display: block
            }
      
            .navCont {
              transition: transform 0.5s ease-in-out, box-shadow 1s ease-in-out;
            }
          }

          @media (min-width: 1024px) {

            .loginFormCont {
              background-position: 40rem 40%;
            }
          }

          @media (min-width: 1330px) {

            .loginFormCont {
              background-position: center;
            }
          }
        `}
      </style>
      <section className="formCont loginFormCont">
        <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="formTitle">Login</h1>
          <div className="inputCont">
            <input
              className="formInput"
              type="email"
              name="email"
              placeholder="Email Address"
              required={true}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}

            <input
              className="formInput"
              type="password"
              name="password"
              placeholder="Password"
              required={true}
              {...register("password", { required: "Password is required" })}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </section>
    </>
  );
};

export default Login;
