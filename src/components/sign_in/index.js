import React, { useState} from "react";


import { validate } from "../ui/misc";
import axios from "axios";
import useForm from "../../hooks/useForm";
import Notify from "../ui/notify/";
import { useAuth } from "../../context/auth";

import SignInForm from './signInForm'

export default function SignIn(props) {
  

  const [isError, setIsError] = useState({});
  const { setAuthTokens, authTokens } = useAuth();
  const { values, handleChange, handleSubmit, errors } = useForm(login, validate);


  function login() {
    // //const url = "http://apid.ict.cu/visitors/api/v1/login";
    //    const url = "http://www.google.com";
    // axios({
    //         method: "get",
    //         url,
    //         auth: {
    //           username: values.email,
    //           password: values.password
    //         }
    // })
    //   .then(result => {
    //         if (result.status === 200) {
    //             setAuthTokens(result.data); 
    //         } else {
    //           setIsError({
    //             variant: "error",
    //             message: "El usuario o la contraseña no son correctas"
    //           });
    //         }
    //   })
    //   .catch(e => {
    //           setIsError({ variant: "error", message: "No se pudo auntenticar" });
             
    //   });
    setAuthTokens({user: values.email, token:'qweqweqw12312313'}); 
  }

  //localStorage.removeItem("tokens")
  console.log(localStorage.getItem("tokens"))

  return (
    <React.Fragment>
      <SignInForm 
          handleChange={handleChange} 
          errors={errors} 
          values={values} 
          handleSubmit={handleSubmit} 
      />
      { isError.variant ?
                    <Notify
                        display={isError.variant ? true : false}
                        onClose={value => (value ? setIsError({}) : null)}
                        variant={isError.variant }
                        message={isError.message }
                    />:null
      }
      {

        authTokens?props.history.push('/'):null
      }
      </React.Fragment>
  );
}
