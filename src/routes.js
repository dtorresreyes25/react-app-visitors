import React from "react";
import { Switch } from "react-router-dom";
import LayoutTemplate from "../src/HOC/layoutTemplate";
import HomeForm from "./components/form";
import SignIn from "./components/sign_in";
import PrivateRoute from "./components/authRoutes/private";
import PublicRoute from "./components/authRoutes/public";
import { AuthProvider } from "./context/auth";

const Routes = () => {
  return (
    <Switch>
    <AuthProvider>
      <LayoutTemplate>
        <PublicRoute restricted ={true} exact path="/sign_in" component={SignIn} />
        <PrivateRoute exact path="/" component={HomeForm} />
      </LayoutTemplate>
    </AuthProvider>
    </Switch>
  );
};

export default Routes;
