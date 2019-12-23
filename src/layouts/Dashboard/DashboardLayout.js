import React, { useState } from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";

import NotificationsIcon from "@material-ui/icons/Notifications";

//import { mainListItems, secondaryListItems } from "./listItems";

import { Sidebar, Topbar, Footer } from "./components";
import { makeStyles, useTheme } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";

import Idle from "react-idle-enhanced";
import { toast } from "react-toastify";
import { LockScreen } from "../../components";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },

  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  shiftContent: {
    paddingLeft: 240
  },
  appBarSpacer: theme.mixins.toolbar
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const theme = useTheme();

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true
  });

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const shouldOpenSidebar = isDesktop ? true : open;

  const { children, userSession } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Topbar
        open={open}
        onSidebarOpen={handleDrawerOpen}
        userSession={userSession}
      />
      <Sidebar
        onClose={handleDrawerClose}
        open={open}
        variant={isDesktop ? "persistent" : "temporary"}
        userSession={userSession}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <Idle
            timeout={600000}
            render={idle => (
              <LockScreen userSession={userSession} open={idle.idle} />
            )}
          />
          {children}

          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}
