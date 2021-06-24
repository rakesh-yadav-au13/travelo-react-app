import "./HotelView.css";
import React from "react";
import { useSelector } from "react-redux";
import HotelViewComp from "../../components/HotelViewComp";

const HotelView = (props) => {
  const SearchHotel = props.match.params.hotelname;
  const hotelState = useSelector((state) => state.hotelReducer);
  const renderHotel = () => {
    if (hotelState) {
      let hotelDate = hotelState.filter((hotel) => {
        return hotel.hotelName === SearchHotel;
      });
      if (hotelDate) {
        return <HotelViewComp hoteldata={hotelDate} />;
      }
    }
  };

  return <div className="hotel_view_container">{renderHotel()}</div>;
};

export default HotelView;
