import React, { useState } from "react";
import "./hotelList.css";
import { useSelector } from "react-redux";
import HotellistComp from "../../components/HotellistComp";

const HotelList = (props) => {
  const [priceFilter, setPriceFilter] = useState(null);
  const searchCity = props.match.params.cityname;
  const hotelState = useSelector((state) => state.hotelReducer);

  const filterHeandler = (e) => {
    const value = e.target.value;
    if (value !== "All Hotels") {
      setPriceFilter(value);
    }
  };

  const renderHotels = (hotelState) => {
    if (priceFilter != null) {
      const hotelList = hotelState.filter((hotel) => {
        return hotel.city === searchCity && priceFilter < hotel.price;
      });
      if (hotelList.length > 0) {
        return hotelList.map((hotel) => {
          return <HotellistComp key={hotel._id} data={hotel} />;
        });
      } else {
        return <HotellistComp data={null} />;
      }
    } else {
      const cityHotelList = hotelState.filter((hotel) => {
        return hotel.city === searchCity;
      });
      if (cityHotelList.length > 0) {
        return cityHotelList.map((hotel) => {
          return <HotellistComp key={hotel._id} data={hotel} />;
        });
      } else {
        return <HotellistComp data={null} />;
      }
    }
  };

  return (
    <div className="hotel_list_container">
      <div className="row">
        <div className="filter_container col-3">
          <div className="filter_container_box">
            <p>Price Filter</p>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="priceFilter"
                  value="1000"
                  onChange={filterHeandler}
                />
                All Hotels
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="priceFilter"
                  value="1000"
                  onChange={filterHeandler}
                />
                Above 1000
              </label>
            </div>
            <div class="form-check">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="priceFilter"
                  value="2000"
                  onChange={filterHeandler}
                />
                Above 2000
              </label>
            </div>
            <div class="form-check disabled">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="priceFilter"
                  value="3000"
                  onChange={filterHeandler}
                />
                Above 3000
              </label>
            </div>
            <div class="form-check disabled">
              <label class="form-check-label">
                <input
                  type="radio"
                  class="form-check-input"
                  name="priceFilter"
                  value="4000"
                  onChange={filterHeandler}
                />
                Above 4000
              </label>
            </div>
          </div>
        </div>
        <div className="col-9 hotelList_container">
          {hotelState && renderHotels(hotelState)}
        </div>
      </div>
    </div>
  );
};

export default HotelList;
