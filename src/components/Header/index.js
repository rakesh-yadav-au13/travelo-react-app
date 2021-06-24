import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./header.css";
import logo from "../../img/headerLogo.png";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { authAction } from "../../actions";

const Header = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authReducer);
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({
      type: authAction.IS_LOGOUT,
    });
  };

  return (
    <div className="header navbar navbar-expand-md navbar-dark">
      <div className="container">
        <Link to="/">
          <img className="header-logo" src={logo} alt="app_logo" />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse d-md-flex align-items-center justify-content-around flex-wrap"
          id="collapsibleNavbar"
        >
          {!authState.profile.isAdmin ? (
            <div className="header-search ">
              <input
                className="header-searchInput"
                type="text"
                placeholder="Search here..."
              />
              <SearchIcon className="header-searchIcon" />
            </div>
          ) : null}
          {authState.isAuth ? (
            !authState.profile.isAdmin ? (
              <div className="header-nav ">
                <div className="header-option">
                  <Link to="/">Home</Link>
                </div>

                <div className="header-option">
                  <Link to="/userbookings">Bookings</Link>
                </div>
                <div onClick={logoutHandler} className="header-option">
                  <Link to="/">Logout</Link>
                </div>
              </div>
            ) : (
              <div className="header-nav ">
                <div className="header-option">
                  <Link to="/yourhotel">Your Hotel</Link>
                </div>
                <div className="header-option">
                  <Link to="/addhotel">Add Hotel</Link>
                </div>
                <div className="header-option">
                  <Link to="/hotelbookings">Bookings</Link>
                </div>
                <div onClick={logoutHandler} className="header-option">
                  <Link to="/">Logout</Link>
                </div>
              </div>
            )
          ) : (
            <div className="header-nav ">
              <div className="header-option">
                <Link to="/">Home</Link>
              </div>

              <div className="header-option">
                <Link to="/login">Log in</Link>
              </div>
              <div className="header-option">
                <Link to="/register">Sign up</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
