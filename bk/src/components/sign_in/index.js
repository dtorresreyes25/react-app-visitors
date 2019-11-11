import React, { useState } from "react";

import { validate } from "../ui/misc";
import axios from "axios";
import useForm from "../../hooks/useForm";
import Notify from "../ui/notify/";
import { useAuth } from "../../context/auth";
import SignInForm from "./signInForm";

export default function SignIn({ history }) {
  const [isError, setIsError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const { values, handleChange, handleSubmit, errors } = useForm(
    login,
    validate
  );

  function login() {
   
    setIsLoading(true);

    const url = "https://api.ict.cu/visitors/api/v1/login";
    axios({
      method: "get",
      url,
      auth: {
        username: values.email,
        password: values.password
      }
    })
      .then(result => {
        if (result.status === 200) {
          //setAuthData(result.data);
          auth.setSessionCookie(result.data);
          console.log('login', auth)
          history.push("/");
          setIsLoading(false);
        } else {
          setIsError({
            variant: "error",
            message: "El usuario o la contraseña no son correctas"
          });
        }
      })
      .catch(e => {
        setIsError({ variant: "error", message: "El usuario o la contraseña no son correctas" });
        setIsLoading(false);
      });
  }

  return (
    <React.Fragment>
      <SignInForm
        handleChange={handleChange}
        errors={errors}
        values={values}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
      {isError.variant ? (
        <Notify
          display={isError.variant ? true : false}
          onClose={value => (value ? setIsError({}) : null)}
          variant={isError.variant}
          message={isError.message}
        />
      ) : null}
    </React.Fragment>
  );
}
