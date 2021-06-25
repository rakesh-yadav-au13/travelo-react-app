import React, { useState, useEffect } from "react";
import moment from "moment";
import PageNotFound from "../PageNotFound";

const HotelBooking = () => {
  const hotelBookingUrl = "https://travelo-apk.herokuapp.com/api/hotelbookings";

  const [bookingData, setBookingData] = useState("");

  const getBookingData = () => {
    fetch(hotelBookingUrl, {
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
  console.log(bookingData);
  return (
    <div className="container">
      <div className="booking_page">
        {bookingData.length > 0 ? (
          <div className="booking_page_details">
            <div className="booking_page_heading my-5">
              <h2>{bookingData[0]?.hotelId.hotelName}</h2>
              <div className="bottom_line"></div>
            </div>
            <div className="booking_page_content">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">order Id</th>
                    <th scope="col">UserName</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Person</th>
                    <th scope="col">CheckIn</th>
                    <th scope="col">CheckOut</th>
                    <th scope="col">Order Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingData &&
                    bookingData.map((booking) => {
                      return (
                        <tr key={booking._id}>
                          <th scope="row">{booking._id}</th>
                          <td>{booking.name}</td>
                          <td>{booking.phone}</td>
                          <td>{booking.totalPerson}</td>

                          <td>
                            {moment(booking.checkIn).format("DD-MM-YYYY")}
                          </td>
                          <td>
                            {moment(booking.checkOut).format("DD-MM-YYYY")}
                          </td>
                          <td>
                            {moment(booking.createdAt).format(
                              "DD-MM-YYYY / hh:mm A"
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <PageNotFound />
        )}
      </div>
    </div>
  );
};

export default HotelBooking;
