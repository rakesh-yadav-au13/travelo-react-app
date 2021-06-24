import React from "react";
import "./booking.css";
import moment from "moment";
import PageNotFound from "../PageNotFound";

const Bookings = ({ bookings }) => {
  return (
    <div className="booking_page">
      {bookings !== null ? (
        <div className="booking_page_details">
          <div className="booking_page_heading my-5">
            <h2>Your Bookings</h2>
            <div className="bottom_line"></div>
          </div>
          <div className="booking_page_content">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">order Id</th>
                  <th scope="col">Hotel</th>
                  <th scope="col">City</th>
                  <th scope="col">Price</th>
                  <th scope="col">CheckIn</th>
                  <th scope="col">CheckOut</th>
                  <th scope="col">Order Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => {
                  return (
                    <tr key={booking._id}>
                      <th scope="row">{booking._id}</th>
                      <td>{booking.hotelId.hotelName}</td>
                      <td>{booking.hotelId.city}</td>
                      <td>₹ {booking.hotelId.price}</td>
                      <td>{moment(booking.checkIn).format("DD-MM-YYYY")}</td>
                      <td>{moment(booking.checkOut).format("DD-MM-YYYY")}</td>
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
  );
};

export default Bookings;
