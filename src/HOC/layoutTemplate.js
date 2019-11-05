import React from "react";
import Header from "../components/header_footer/Header";
import Footer from "../components/header_footer/Footer";
import { useAuth } from "../context/auth";

const LayoutTemplate = props => {
  const { authTokens, setAuthTokens} = useAuth()
  return (
    <div>
      <Header authTokens={authTokens} setAuthTokens={setAuthTokens} />
      	{props.children}
      <Footer user={authTokens} />
    </div>
  );
};

export default LayoutTemplate;
