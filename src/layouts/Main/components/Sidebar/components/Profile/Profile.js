import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'fit-content'
    },
    avatar: {
        width: 60,
        height: 60,
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
    name: {
        marginTop: theme.spacing(1)
    }
}));



const Profile = props => {



    const { className, userSession, ...rest } = props;

   
    const { email, name, avatar, token } = props.userSession.authSession

    const classes = useStyles();

    return (
        <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={avatar ? `https://api.ict.cu/visitors/api/v1/user/image?name=${avatar}&token=${token}` :null}
        to="/account"
      >
      {!avatar? name.substr(0,2) :null}
      </Avatar>
           <Typography
        className={classes.name}
        variant="h4"
      >
        {name}
      </Typography>
      <Typography variant="body2">{email}</Typography>
    </div>
    );
};

Profile.propTypes = {
    className: PropTypes.string
};

export default Profile;