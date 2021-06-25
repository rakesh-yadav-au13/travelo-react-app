import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Login.css";
import { Link } from "react-router-dom";
import { authAction } from "../../actions";

const Login = (props) => {
  const loginUrl = "https://travelo-apk.herokuapp.com/api/login";

  const [validationErr, setValidationErr] = useState("");

  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const loginFormHandler = (e) => {
    fetch(loginUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginState),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.errors.length > 0) {
          setValidationErr(...result.errors);
        } else {
          dispatch({
            type: authAction.IS_LOGIN,
            payload: result.data.user,
          });
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("user", JSON.stringify(result.data.user));
          if (props.history.location.state?.from === "signup") {
            props.history.push("/");
          } else {
            props.history.goBack();
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="pageHight">
      <div className="my-login-page py-5">
        <section className="h-100">
          <div className="container h-100">
            <div className="row justify-content-md-center h-100">
              <div className="card-wrapper">
                <div className="card fat">
                  <div className="card-body">
                    <h4 className="card-title">Log in</h4>
                    <div className="w-100 text-danger text-center">
                      <p>
                        {validationErr && validationErr.param === "invalid"
                          ? validationErr.msg
                          : ""}
                      </p>
                    </div>
                    <div>
                      <div className="form-group">
                        <label htmlFor="email">E-Mail Address</label>
                        <input
                          id="email"
                          type="email"
                          className="form-control"
                          name="email"
                          onChange={(e) =>
                            setLoginState({
                              ...loginState,
                              email: e.target.value,
                            })
                          }
                        />
                        <div className="w-100 text-danger">
                          <small>
                            {validationErr && validationErr.param === "email"
                              ? validationErr.msg
                              : ""}
                          </small>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          id="password"
                          type="password"
                          className="form-control"
                          name="password"
                          onChange={(e) =>
                            setLoginState({
                              ...loginState,
                              password: e.target.value,
                            })
                          }
                          data-eye
                        />
                        <div className="w-100 text-danger">
                          <small>
                            {validationErr && validationErr.param === "password"
                              ? validationErr.msg
                              : ""}
                          </small>
                        </div>
                      </div>
                      <div className="form-group m-0">
                        <button
                          type="button"
                          onClick={loginFormHandler}
                          className="btn_login  btn-block"
                        >
                          Log in
                        </button>
                      </div>
                      <div className="mt-4 text-center">
                        Don't have an account?{" "}
                        <Link to="/register">Create One</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
