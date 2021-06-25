import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = (props) => {
  const [validationErr, setValidationErr] = useState("");
  const [registerState, setRegisterState] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    isAdmin: "",
  });

  const signupFormHandler = () => {
    const signupUrl = "https://travelo-apk.herokuapp.com/api/signup";

    fetch(signupUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerState),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.errors.length > 0) {
          setValidationErr(...result.errors);
        } else {
          props.history.push("/login", { from: "signup" });
        }
      })
      .catch((err) => console.log(err));
  };
  console.log(registerState.isAdmin);
  return (
    <div className="my-login-page py-5">
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-md-center h-100">
            <div className="card-wrapper">
              <div className="card fat">
                <div className="card-body">
                  <h4 className="card-title">Register</h4>
                  <div className="w-100 text-danger text-center">
                    <p>
                      {validationErr && validationErr.param === "invalid"
                        ? validationErr.msg
                        : ""}
                    </p>
                  </div>
                  <div className="my-login-validation">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        id="name"
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={(e) =>
                          setRegisterState({
                            ...registerState,
                            name: e.target.value,
                          })
                        }
                      />
                      <div className="w-100 text-danger">
                        <small>
                          {validationErr && validationErr.param === "name"
                            ? validationErr.msg
                            : ""}
                        </small>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">E-Mail Address</label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={(e) =>
                          setRegisterState({
                            ...registerState,
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
                      <label htmlFor="phone">Mobile No.</label>
                      <input
                        id="mobile"
                        type="text"
                        className="form-control"
                        name="phone"
                        onChange={(e) =>
                          setRegisterState({
                            ...registerState,
                            phone: e.target.value,
                          })
                        }
                      />
                      <div className="w-100 text-danger">
                        <small>
                          {validationErr && validationErr.param === "phone"
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
                          setRegisterState({
                            ...registerState,
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
                    <div className="d-flex align-items-center justify-content-between my-3">
                      <div>Register :</div>
                      <div className="form-check-inline ">
                        <label className="form-check-label">
                          <input
                            type="radio"
                            className="form-check-input"
                            name="optradio"
                            onClick={() =>
                              setRegisterState({
                                ...registerState,
                                isAdmin: false,
                              })
                            }
                          />
                          As User
                        </label>
                      </div>
                      <div className="form-check-inline">
                        <label className="form-check-label">
                          <input
                            type="radio"
                            className="form-check-input"
                            name="optradio"
                            onClick={() =>
                              setRegisterState({
                                ...registerState,
                                isAdmin: true,
                              })
                            }
                          />
                          As Hotel Owner
                        </label>
                      </div>
                    </div>

                    <div className="form-group m-0">
                      <button
                        type="button"
                        onClick={signupFormHandler}
                        className="btn_login btn-block"
                      >
                        Register
                      </button>
                    </div>
                    <div className="mt-4 text-center">
                      Already have an account? <Link to="/login">Login</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
