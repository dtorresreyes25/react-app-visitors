import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../context/auth";

function PrivateRoute({ component: Component, ...rest }) {
  const auth = useAuth();
  console.log("privateRoute", auth);

  return (
    <Route
      {...rest}
      render={() =>
        auth.authSession ? <Component {...rest} /> : <Redirect to="/sign_in" />
      }
    />
  );
}

export default PrivateRoute;
