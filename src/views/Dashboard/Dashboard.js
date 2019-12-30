import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import clsx from "clsx";


import CircularProgress from "@material-ui/core/CircularProgress";

import { Chart, LastVisits, VisitsTotalCount } from "./components";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4) //default 4
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  container: {
    width: "auto",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 1000,
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
}));



const Dashboard = props => {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { userSession, visits, isPending, onRequestVisits } = props;

  React.useEffect(() => {
    onRequestVisits(userSession.authSession.token);
  }, []);

  return isPending ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </div>
  ) : (
    <React.Fragment>
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            {<Chart visits={visits} />}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}>
            {<VisitsTotalCount visits={visits} />}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {<LastVisits visits={visits} />}
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Dashboard;
