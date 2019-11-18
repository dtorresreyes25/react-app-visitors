import React, { useState} from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Logo from "../../resources/logo-ict.png";
import Copyright from '../header_footer/copyright'
import {signInStyles} from '../ui/styles'
import CircularProgress from '@material-ui/core/CircularProgress';

const SignInForm = ({handleChange,errors,values,handleSubmit,isLoading}) => {

  const classes = signInStyles();
  return (
     <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={8} className={classes.image} />
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
            <img src={Logo} alt="logo" className={classes.logo} />         
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
                  disabled={isLoading? true: false}
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
                  disabled={isLoading? true: false}
            />
            {
              isLoading ? 
              <div className={classes.circularProgress}>
                <CircularProgress />
              </div >
               : null
            }
            
            <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={isLoading? true: false}
            >
              {isLoading? "...comprobando": "Entrar"}
            </Button>   
            <Box mt={5}>  
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  )
}

export default SignInForm;