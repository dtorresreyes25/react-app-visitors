import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { ToastContainerHelper } from '../../helpers/'



import { Sidebar, Topbar, Footer } from "./components";
import { makeStyles, useTheme } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";

import Idle from "react-idle-enhanced";
import { LockScreen } from "../../components";



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
          <ToastContainerHelper/>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}
