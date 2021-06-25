import React, { useState, useEffect } from "react";
import HotellistComp from "../HotellistComp";

const YourHotel = () => {
  const yourHotelurl = "https://travelo-apk.herokuapp.com/api/yourhotel";
  const [yourHotel, setYourHotel] = useState("");
  const GetYourHotel = () => {
    fetch(yourHotelurl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setYourHotel(result.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    GetYourHotel();
  }, []);

  return (
    <div className="yourHotel">
      <HotellistComp data={yourHotel} />
    </div>
  );
};

export default YourHotel;
