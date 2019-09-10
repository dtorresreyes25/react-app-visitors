import React from "react";
import Header from "./components/header_footer/Header";
import Grid from "@material-ui/core/Grid";
import Footer from "./components/header_footer/Footer";
import SignInSide from "./components/SignInSide/SignInSide";
import HomeForm from "./components/Form";
import "./resources/styles.css";

function App() {
  return (
    <div>
      {/* <SignInSide /> */}
      <HomeForm />
    </div>
  );
}

export default App;
