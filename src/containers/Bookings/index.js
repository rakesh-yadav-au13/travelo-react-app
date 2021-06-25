import React, { useState, useEffect } from "react";
import Bookings from "../../components/Bookings";

const Booking = (props) => {
  const userBookingUrl = "https://travelo-apk.herokuapp.com/api/bookings";
  const [bookingData, setBookingData] = useState("");

  const getBookingData = () => {
    fetch(userBookingUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setBookingData(result.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getBookingData();
  }, []);

  const renderBooking = () => {
    if (bookingData.length > 0) {
      return <Bookings bookings={bookingData} />;
    } else {
      return <Bookings bookings={null} />;
    }
  };

  return (
    <div className="container">
      <div className="booking_container">{bookingData && renderBooking()}</div>
    </div>
  );
};

export default Booking;
