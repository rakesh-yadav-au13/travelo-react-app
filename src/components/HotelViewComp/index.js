import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HotelViewComp.css";

const PostOrderUrl = "https://travelo-apk.herokuapp.com/api/order";

// When the user clicks on <span> (x), close the modal
const cencelHendler = () => {
  document.getElementById("myModal").style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
  let modal = document.getElementById("myModal");
  if (event.target === modal) {
    document.getElementById("myModal").style.display = "none";
  }
};

const HotelViewComp = ({ hoteldata }) => {
  const { _id, totalRooms, hotelName, address, hotelImg, facility } =
    hoteldata[0];
  const authState = useSelector((state) => state.authReducer);
  const history = useHistory();

  const [validationError, setValidationError] = useState("");

  const [bookingForm, setBookingForm] = useState({
    checkIn: "",
    checkOut: "",
    hotelId: _id,
    totalRooms: totalRooms,
    userId: authState.profile._id || "",
    name: authState.profile.name || "",
    phone: authState.profile.phone || "",
    totalPerson: 1,
  });

  function getFormattedDate(nextDay) {
    let date = new Date();
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");
    if (nextDay) {
      if (bookingForm.checkIn) {
        let newDate = new Date(bookingForm.checkIn);
        day = (1 + newDate.getDate()).toString().padStart(2, "0");
        month = (1 + newDate.getMonth()).toString().padStart(2, "0");
      } else {
        day = (1 + date.getDate()).toString().padStart(2, "0");
      }
    }
    let fullDate = `${year}-${month}-${day}`;
    return fullDate;
  }

  const displayPopup = () => {
    if (authState.isAuth) {
      document.getElementById("myModal").style.display = "block";
    } else {
      history.push("/login");
    }
  };

  const placeBookingHandler = () => {
    document.getElementById("myModal").style.display = "none";
    fetch(PostOrderUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(bookingForm),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.errors.length >= 1) {
          setValidationError(...result.errors);
        } else {
          history.push("/userbookings");
          setValidationError("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="hotel_view">
      <div className="hotel_view_carousel">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="d-block w-100"
                src={hotelImg[0]}
                alt="Hotel img"
              />
            </div>
            <div className="carousel-item">
              <img
                className="d-block w-100"
                src={hotelImg[1]}
                alt="Hotel img"
              />
            </div>
            <div className="carousel-item ">
              <img
                className="d-block w-100"
                src={hotelImg[2]}
                alt="Hotel img"
              />
            </div>
            <div className="carousel-item ">
              <img
                className="d-block w-100"
                src={hotelImg[3]}
                alt="Hotel img"
              />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div className="hotel_view_content p-3">
        <div className="row">
          <div className="col-md-3  hotel_view_content_left">
            <p>Facilities</p>
            <div>
              <ul>
                {facility.map((item, i) => {
                  return <li key={i}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
          <div className="col-md-9 hotel_view_content_right">
            <div className="hotel_view_content_right_heading">
              <h1>{hotelName}</h1>
              <p>{address}</p>
            </div>
            <div className="w-100 text-danger text-center">
              <p>{validationError && validationError.msg}</p>
            </div>
            <div className="hotel_view_content_right_checkIn">
              <div className="form-group">
                <label forhtml="exampleInputEmail1">Check In</label>
                <input
                  type="date"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Check In date"
                  min={getFormattedDate()}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, checkIn: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label forhtml="exampleInputEmail1">Check Out</label>

                <input
                  type="date"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Check Out date"
                  min={getFormattedDate(1)}
                  onChange={(e) =>
                    setBookingForm({ ...bookingForm, checkOut: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="hotel_view_content_right_btn">
              <button onClick={displayPopup}>Book now</button>
            </div>
            <div id="myModal" className="modal">
              <div className="modal-content">
                <div className="close_menu">
                  <span className="close" onClick={cencelHendler}>
                    &times;
                  </span>
                </div>
                <div className="form-group">
                  <label forhtml="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="name"
                    value={bookingForm.name}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label forhtml="phone">Mobile No.</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Mobile..."
                    value={bookingForm.phone}
                    onChange={(e) =>
                      setBookingForm({ ...bookingForm, phone: e.target.value })
                    }
                  />
                </div>

                <div className="row my-3">
                  <div className="col-6">
                    <div>Person :</div>
                  </div>
                  <div className="col-6">
                    <div className="selector_content">
                      <button
                        onClick={() => {
                          if (bookingForm.totalPerson > 1) {
                            setBookingForm({
                              ...bookingForm,
                              totalPerson: bookingForm.totalPerson - 1,
                            });
                          }
                        }}
                        className="min_selector"
                      >
                        -
                      </button>
                      <span>{bookingForm.totalPerson}</span>
                      <button
                        onClick={() => {
                          if (bookingForm.totalPerson < 3) {
                            setBookingForm({
                              ...bookingForm,
                              totalPerson: bookingForm.totalPerson + 1,
                            });
                          }
                        }}
                        className="max_selector"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="hotel_view_content_right_btn m-auto w-100">
                  <button onClick={placeBookingHandler}>Place Booking</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelViewComp;
