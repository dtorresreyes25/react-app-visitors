import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "../header_footer/UserAvatar";
import { useStyles } from "../ui/misc";
import Grid from "@material-ui/core/Grid";
import Logo from "../../resources/logo-ict.png";
import Link from "@material-ui/core/Link";
import Hidden from "@material-ui/core/Hidden";

const Header = () => {
  const classes = useStyles();
  return (
    <AppBar color="inherit" position="sticky" elevation={0}>
      <Toolbar>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <img src={Logo} alt="logo" className={classes.logo} />
          </Grid>
          <Grid item>
            <Typography color="inherit" variant="h5" component="h1">
              App Visitantes
            </Typography>
          </Grid>
          <Grid item xs />
          <Grid item>
            <Link className={classes.link} href="#" variant="body2">
              Salir
            </Link>
          </Grid>
          <Grid item>
            <UserAvatar />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
