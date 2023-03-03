import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginApi, loginFacebookApi } from "../../redux/reducers/userReducer";
import { NavLink } from "react-router-dom";
import styleCustom from '../../assets/css/pages/login.module.scss';
import { useState } from "react";
import { DispatchType } from "../../redux/configStore";
import ReactFacebookLogin from "react-facebook-login";

type Props = {};

const Login = (props: Props) => {
  const dispatch: DispatchType = useDispatch();
  const [isShown, setShown] = useState(false);
  const form = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Email cannot be blank!")
        .email("Email is invalid"),
      password: yup.string().required("Password cannot be blank!"),
    }),
    onSubmit: (values) => {
      const action = loginApi(values);
      dispatch(action);
    },
  });
  const responseFacebook = (res:any) => {
    if (res?.accessToken) {
      let facebookData = {
        facebookToken: res.accessToken,
      };
      const action = loginFacebookApi(facebookData);
      dispatch(action);
    }
  };
  return (
    <>
      <div className="container text-left mt-5">
        <h3>Login</h3>
      </div>
      <hr className="my-5"></hr>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">
                  Sign in
                </h5>
                <form onSubmit={form.handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="emailInput"
                      name="email"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      placeholder="name@example.com"
                    />
                    <label htmlFor="emailInput">Email address</label>
                    {form.errors.email && (
                      <p className="text-danger">{form.errors.email}</p>
                    )}
                  </div>
                  <div
                    className="form-floating mb-3"
                    style={{ position: "relative" }}
                  >
                    <input
                      type={isShown ? "text" : "password"}
                      className="form-control"
                      name="password"
                      id="passwordInput"
                      placeholder="Password"
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                    />
                    <span
                      className={`${
                        !isShown
                          ? styleCustom["p-password__display"]
                          : styleCustom["p-password__display__invisible"]
                      }`}
                      onClick={() => setShown(!isShown)}
                    ></span>
                    <label htmlFor="passwordInput">Password</label>
                    {form.errors.password && (
                      <p className="text-danger">{form.errors.password}</p>
                    )}
                  </div>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="rememberPasswordCheck"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="rememberPasswordCheck"
                    >
                      Remember password
                    </label>
                  </div>
                  <div className="d-grid">
                    <button
                      className={`btn btn-primary text-uppercase fw-bold`}
                      type="submit"
                    >
                      LOGIN
                    </button>
                  </div>

                  <hr className="my-4" />
                  <div className="my-4">
                    <p className="text-center fw-bold mx-3 mb-0 text-muted">
                      OR
                    </p>
                  </div>
                  <div className="d-grid mb-2">
                    <ReactFacebookLogin
                      appId="655081252973502"
                      autoLoad={false}
                      fields="name,email,picture"
                      callback={responseFacebook}
                      cssClass={`${styleCustom["btn-login"]} btn btn-primary text-uppercase fw-bold`}
                      icon="fab fa-facebook-f me-2"
                    />
                  </div>
                  <div className="pt-3">
                    <p>
                      Don't have an account?{" "}
                      <NavLink
                        to="/register"
                        className="link-info text-decoration-none"
                      >
                        Register here
                      </NavLink>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
