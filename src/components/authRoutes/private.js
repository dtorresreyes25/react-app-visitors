import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../context/auth";

function PrivateRoute({ component: Component, ...rest }) {
 
  const isAuthenticated = useAuth();
  console.log(isAuthenticated)
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated.tokens ? <Component {...props} /> : <Redirect to="/sign_in" />
      }
    />
  );
}

export default PrivateRoute;
