import "./hotelList.css";
import React from "react";
import Rating from "../Rating";
import { Link } from "react-router-dom";
import PageNotFound from "../PageNotFound";

const HotellistComp = ({ data }) => {
  window.scrollTo(0, 0);

  return (
    <>
      {data != null ? (
        <div className="container">
          <div className="hotel_list">
            <div className="row">
              <div className="col-md-4 p-0">
                <div className="hotel_list_img">
                  <img src={data.hotelImg && data.hotelImg[0]} alt="hotelImg" />
                </div>
              </div>
              <div className="col-md-8 hotel_list_details">
                <div className="hotel_list_details_heading">
                  <h2>
                    <Link to={`/hotel/${data.hotelName}`}>
                      {data.hotelName}
                    </Link>
                  </h2>
                </div>
                <div className="hotel_list_details_address">
                  <p>{data.address}</p>
                </div>
                <div className="hotel_list_details_bottom">
                  <p>
                    ₹ {data.price} <span>/ day </span>
                  </p>
                  <Rating rating={data.rating} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PageNotFound />
      )}
    </>
  );
};

export default HotellistComp;
