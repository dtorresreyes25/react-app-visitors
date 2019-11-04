import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { validate } from "../ui/misc";
import Logo from "../../resources/logo-ict.png";
import axios from "axios";
import useForm from "../../hooks/useForm";
import Notify from "../ui/notify/";
import { useAuth } from "../../context/auth";
import Copyright from '../header_footer/copyright'
import {signInStyles} from '../ui/styles'

export default function SignIn(props) {
  const { values, handleChange, handleSubmit, errors } = useForm(login, validate);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState({});
  const { setAuthTokens } = useAuth();
  const classes = signInStyles();



  function login() {
    //const url = "http://apid.ict.cu/visitors/api/v1/login";
       const url = "http://www.google.com";
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
          setAuthTokens(result.data);
          setLoggedIn(true);
        } else {
          setIsError({
            variant: "error",
            message: "El usuario o la contraseña no son correctas"
          });
        }
      })
      .catch(e => {
        setIsError({ variant: "error", message: "No se pudo auntenticar" });
      });
  }
  
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image} />
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className="avatar"  >
            <img src={Logo} alt="logo" className={classes.logo} />
          </Avatar>
          
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              error={errors.email && true}
              fullWidth
              id="email"
              label="email"
              name="email"
              value={values.email || ""}
              autoComplete="email"
              autoFocus
              helperText={errors.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              error={errors.password && true}
              helperText={errors.password}
              name="password"
              label="Contraseña"
              type="password"
              value={values.password || ""}
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Entrar
            </Button>
            { isError.variant?
              <Notify
                  display={isError.variant ? true : false}
                  onClose={value => (value ? setIsError({}) : null)}
                  variant={isError.variant }
                  message={isError.message }
          />:null
            }
                  
            <Box mt={5}>
              {
                isLoggedIn? props.history.push("/")
                :null
              }
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
