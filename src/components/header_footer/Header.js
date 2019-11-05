import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "../header_footer/UserAvatar";
import {headerStyles} from '../ui/styles'
import Grid from "@material-ui/core/Grid";
import Logo from "../../resources/logo-ict.png";
import Link from "@material-ui/core/Link";
import Button from '@material-ui/core/Button'

const Header = (props) => {

  const classes = headerStyles();
  
  const logOut=()=>{
    console.log('logout'.props)
    props.setAuthTokens()
  }

  const showHeader = () =>(
      <AppBar color="inherit" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <img src={Logo} alt="logo" className={classes.logo} />
            </Grid>
            <Grid item>
              <Typography color="inherit" variant="h4" component="h1">
                App Visitantes
              </Typography>
            </Grid>
            <Grid item xs />
            <Grid item>

            </Grid>
            <Grid item>
              <UserAvatar />
              {
                 console.log(props.authTokens)
              }
               {
                 
                  props.authTokens?`${props.authTokens.user} | `:null
               }
              <Button onClick={logOut}>
                Salir
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  return <div>{props.authTokens ? showHeader() : null}</div>;
};

export default Header;
