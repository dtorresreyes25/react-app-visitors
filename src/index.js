import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./resources/styles.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { AuthProvider } from "./context/auth";

const App = () => {

  return (
     <AuthProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
    </AuthProvider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
