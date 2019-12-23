import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  AppBar,
  Toolbar,
  Badge,
  Hidden,
  IconButton,
  Typography,
  Box
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import { Avatar } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: "none"
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    width: 36,
    height: 36,
    margin: 10,
    color: "#fff",
    backgroundColor: deepPurple[500]
  },
  logo: {
    paddingRight: 0,
    marginRight: 5,
    width: 50,
    height: 40
  },
  logoText: {
    paddingRight: 0,
    display: "inline-block",
    color: "#fff",
    paddingTop: 7,
    verticalAlign: "top",
    marginLeft: 5
  },
  avatarText: {
    display: "flex",
    paddingRight: 0,
    display: "inline-block",
    color: "#fff",
    verticalAlign: "top"
  },
  title: {
    flexGrow: 1
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  appBar: {
    boxShadow: "none",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  }
}));

const Topbar = props => {
  const { open, className, onSidebarOpen, userSession, ...rest } = props;

  const { avatar, token, name } = userSession.authSession;

  const classes = useStyles();

  const [notifications] = useState([]);

  return (
    <AppBar
      position="absolute"
      className={clsx(classes.appBar, open && classes.appBarShift)}
    >
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={onSidebarOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <img
          className={classes.logo}
          alt="Logo"
          src="/images/logos/logo-ict.png"
        />
        <Typography
          component="h1"
          variant="h4"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Registro visitantes
        </Typography>

        <div className={classes.flexGrow} />
        <Hidden smDown>
          <Typography
            variant="body2"
            color="inherit"
            className="avatarText"
            noWrap
          >
            {name}
          </Typography>
        </Hidden>
        <Avatar
          alt="Person"
          className={classes.avatar}
          component={RouterLink}
          src={
            avatar
              ? `https://api.ict.cu/visitors/api/v1/user/image?name=${avatar}&token=${token}`
              : null
          }
          to="/cuenta"
        >
          {!avatar ? name.substr(0, 2) : null}
        </Avatar>
        <IconButton
          className={classes.signOutButton}
          color="inherit"
          onClick={() => userSession.signOut()}
        >
          <InputIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
