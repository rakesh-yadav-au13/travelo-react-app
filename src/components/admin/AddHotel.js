import React, { useState } from "react";
import "./AddHotel.css";

const AddHotel = (props) => {
  const addHotelUrl = "https://travelo-apk.herokuapp.com/api/addhotel";
  const [validationError, setValidationError] = useState("");
  const [previewSource, setPreviewSource] = useState([]);
  const [form, setForm] = useState({
    hotelName: null,
    price: null,
    city: null,
    address: null,
    totalRooms: null,
    rating: null,
    facility: [],
    hotelImg: [],
  });
  const submitHeandler = () => {
    fetch(addHotelUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.errors.length === 0) {
          props.history.push("/");
        } else {
          setValidationError(...result.errors);
        }
      })
      .catch((err) => console.log(err));
  };

  const previewFile = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instagram-clone");
    data.append("cloud_name", "rakesh350");
    fetch("https://api.cloudinary.com/v1_1/rakesh350/image/upload", {
      method: "Post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setForm({ ...form, hotelImg: [...form.hotelImg, data.url] });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const imgHeandler = (e) => {
    const value = e.target.files[0];
    setPreviewSource([...previewSource, value]);
    previewFile(value);
    // if (previewSource.length !== 0) {
    //   previewSource.filter((image) => {
    //     if (image.name === value.name) {
    //       return setError("Image must be different");
    // setPreviewSource([...previewSource, value]);
    // previewFile(value);
    //     } else {

    //       setError("");
    //     }
    //   });
    // } else {
    //   setPreviewSource([value]);
    //   previewFile(value);
    // }
  };

  const facilityHandler = (e) => {
    const val = e.target.checked;
    if (val === true) {
      setForm({ ...form, facility: [...form.facility, e.target.value] });
    }
  };

  return (
    <div className="add_hotel container my-5">
      <div className="top_cities_heading">
        <h1>Add Your Hotel</h1>
        <div className="bottom_line"></div>
      </div>
      <div className="w-100 text-center text-danger mb-3">
        {validationError && validationError.msg}
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label for="hotelName">Hotel Name</label>
            <input
              type="text"
              className="form-control"
              id="hotelName"
              placeholder="Enter hotel name"
              onChange={(e) => setForm({ ...form, hotelName: e.target.value })}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label for="address">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Address"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label for="city">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              placeholder="City"
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label for="price">Price</label>
            <input
              type="text"
              className="form-control"
              id="price"
              placeholder="Price"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label for="totelRooms">Totel Rooms </label>
            <input
              type="text"
              className="form-control"
              id="totelRooms"
              placeholder="Totel rooms"
              onChange={(e) => setForm({ ...form, totalRooms: e.target.value })}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group">
            <label for="rating">Rating </label>
            <input
              type="text"
              className="form-control"
              id="rating"
              placeholder="Rating"
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
            />
          </div>
        </div>
        <div className="col-12 my-5">
          <div className="row px-4">
            <div class="form-check col-4  col-md-2">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  value="Parking"
                  onChange={(e) => facilityHandler(e)}
                />
                Parking
              </label>
            </div>
            <div class="form-check col-4  col-md-2">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  value="Fully AC Rooms"
                  onChange={(e) => facilityHandler(e)}
                />
                Fully AC Rooms
              </label>
            </div>
            <div class="form-check col-4  col-md-2">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  value="Swimming Pool"
                  onChange={(e) => facilityHandler(e)}
                />
                Swimming Pool
              </label>
            </div>
            <div class="form-check col-4  col-md-2">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  value="Free Wifi"
                  onChange={(e) => facilityHandler(e)}
                />
                Free Wifi
              </label>
            </div>
            <div class="form-check col-4  col-md-2">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  value=" Party Hall"
                  onChange={(e) => facilityHandler(e)}
                />
                Party Hall
              </label>
            </div>
            <div class="form-check col-4  col-md-2 ">
              <label class="form-check-label">
                <input
                  type="checkbox"
                  class="form-check-input"
                  value="Bar & Rasto"
                  onChange={(e) => facilityHandler(e)}
                />
                Bar & Rasto
              </label>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-3">
          <div className="form-group">
            <label for="exampleFormControlFile1">Hotel Image</label>
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile1"
              onChange={(e) => imgHeandler(e)}
            />
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="form-group">
            <label for="exampleFormControlFile2">Rooms view</label>
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile2"
              onChange={(e) => imgHeandler(e)}
            />
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="form-group">
            <label for="exampleFormControlFile3">Rooms view</label>
            <input
              type="file"
              className="form-control-file"
              id="exampleFormControlFile3"
              onChange={(e) => imgHeandler(e)}
            />
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="form-group">
            <div className="form-group">
              <label for="exampleFormControlFile4">Rooms view</label>
              <input
                type="file"
                className="form-control-file"
                id="exampleFormControlFile4"
                onChange={(e) => imgHeandler(e)}
              />
            </div>
          </div>
        </div>
        <div className="add_hotel_btn">
          <button type="submit" onClick={submitHeandler}>
            Submit
          </button>
        </div>
      </div>

      <div className="row">
        {form.hotelImg &&
          form.hotelImg.map((img, i) => {
            return (
              <div key={i} className="col-sm-6 col-md-3 my-3 ">
                <div className="prev_img">
                  <img src={img} alt="" />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AddHotel;
