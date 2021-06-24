import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../containers/Layout";
import AddHotel from "../components/admin/AddHotel";
import Home from "../containers/Home";
import HotelList from "../containers/HotelList";
import Login from "../containers/Login";
import Register from "../containers/Register";
import HotelView from "../containers/HotelView";
import Booking from "../containers/Bookings";
import HotelBooking from "../components/admin/HotelBooking";
import YourHotel from "../components/admin/YourHotel";

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/addhotel" component={AddHotel} />
        <Route exact path="/city/:cityname" component={HotelList} />
        <Route exact path="/hotel/:hotelname" component={HotelView} />
        <Route exact path="/userbookings" component={Booking} />
        <Route exact path="/hotelbookings" component={HotelBooking} />
        <Route exact path="/yourhotel" component={YourHotel} />
      </Switch>
    </Layout>
  );
};

export default Routes;
