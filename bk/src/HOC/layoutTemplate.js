import React from "react";
import Header from "../components/header_footer/Header";
import Footer from "../components/header_footer/Footer";
import { useAuth } from "../context/auth";

const LayoutTemplate = props => {
  const auth = useAuth();
  return (
    <div>
      <Header auth={auth} />
      	 {props.children}
      <Footer auth={auth} />
    </div>
  );
};

export default LayoutTemplate;
