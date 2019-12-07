import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';

import { AccountProfile, AccountDetails } from './components';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}));

const Account = ({ userSession }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={12}
          md={6}
          xl={4}
          xs={12}
        >
          <AccountProfile userSession={userSession} />
        </Grid>
        <Grid
          item
          lg={12}
          md={6}
          xl={8}
          xs={12}
        >
          <AccountDetails userSession={userSession} />
        </Grid>
      </Grid>
        <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
    </div>
    );
};

export default Account;