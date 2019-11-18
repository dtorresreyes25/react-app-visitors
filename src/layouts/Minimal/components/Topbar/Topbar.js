import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  },
   logo: {
      paddingRight: 0,
      width: 50,
      height: 40
    },
    logoText: {
      paddingRight: 0,
      display: 'inline-block',
      color: '#fff',
      paddingTop: 7,
      verticalAlign: 'top',
      marginLeft: 5,
    },
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        <RouterLink to="/">
          <img
            className={classes.logo}
            alt="Logo"
            src="/images/logos/logo-ict.png"
          />
           <Typography
                  align="center"
                  className={classes.logoText}
                  color="textSecondary"
                  variant="h4"
                >
                  App registro visitantes
           </Typography>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
