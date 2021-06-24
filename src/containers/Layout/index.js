import React from "react";
import Footer from "../../components/Footer.js";
import Header from "../../components/Header";

const Layout = (props) => {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
