import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const TopCitis = () => {
  const cities = useSelector((state) => state.cityReducer);
  return (
    <div className="top_Cities">
      <div className="container">
        <div className="top_cities_heading">
          <h1>Top Cities</h1>
          <div className="bottom_line"></div>
        </div>
        <div className="top_cities_details">
          <div className="row">
            {cities &&
              cities.map((city) => {
                return (
                  <div
                    key={city._id}
                    className="top_cities_card col-sm-6 col-md-3 mb-5"
                  >
                    <Link to={`city/${city.city}`}>
                      <div className="city_img_container">
                        <img src={city.cityImg} alt={city.city} />
                        <h4>{city.city}</h4>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCitis;
