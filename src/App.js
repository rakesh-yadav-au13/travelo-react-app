import "./App.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { authAction, cityAction, hotelAction } from "./actions";

function App() {
  const getcityUrl = "https://travelo-apk.herokuapp.com/api/getcity";
  const getHotelsUrl = "https://travelo-apk.herokuapp.com/api/gethotels";
  const dispatch = useDispatch();

  const renderCity = () => {
    fetch(getcityUrl, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.errors.length === 0) {
          dispatch({
            type: cityAction.ADD_CITY,
            payload: result.data,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const renderHotel = () => {
    fetch(getHotelsUrl, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.errors.length === 0) {
          dispatch({
            type: hotelAction.ADD_HOTELS,
            payload: result.data,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    renderCity();
    renderHotel();
  });

  useEffect(() => {
    const userProfile = localStorage.getItem("user");
    if (userProfile) {
      dispatch({
        type: authAction.IS_LOGIN,
        payload: JSON.parse(userProfile),
      });
    }
  });

  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
