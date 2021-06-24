import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Home.css";

const HeroPage = () => {
  // React States
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedHotel, setSelectedHotel] = useState("");

  // fatching redux state
  const cityState = useSelector((state) => state.cityReducer);
  const hotelState = useSelector((state) => state.hotelReducer);

  // useHistory Hooks using for get history
  const history = useHistory();

  const onClickHandler = () => {
    if (selectedHotel) {
      history.push(`/hotel/${selectedHotel}`);
    }
  };

  const renderHotelList = () => {
    let hotels = hotelState.filter((hotel) => {
      return selectedCity === hotel.city;
    });
    return hotels.map((hotel) => {
      return (
        <option key={hotel._id} value={hotel.hotelName}>
          {hotel.hotelName} | {hotel.city}
        </option>
      );
    });
  };

  return (
    <div className="hero_page">
      <div className="hero_content">
        <h1>LUXURY</h1>
        <h1>
          HOTELS <span> & </span> RESORTS
        </h1>
        <p>You know you deserve it.</p>
        <div className="header_select row">
          <div className="header_select_box  col-md-5">
            <select
              name="selectCity"
              onChange={(e) => {
                setSelectedCity(e.target.value);
              }}
            >
              <option selected>Select city here</option>
              {cityState &&
                cityState.map((city) => {
                  return (
                    <option key={city._id} value={city.city}>
                      {city.city}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="header_select_box col-md-5">
            <select
              name="selectHotel"
              onChange={(e) => {
                setSelectedHotel(e.target.value);
              }}
            >
              <option value="Select hotel here" selected>
                Select hotel here
              </option>
              {selectedCity && renderHotelList()}
            </select>
          </div>
          <button
            type="submit"
            onClick={onClickHandler}
            className="Hero_btn col-md-2"
          >
            See hotels
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
