import React from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import {headerStyles} from '../ui/styles'
import Userlogo from "../../resources/user.jpg";

const UserAvatar = () => {
  const classes = headerStyles();
  return (
    <IconButton color="inherit" className={classes.iconButtonAvatar}>
      <Avatar alt="Remy Sharp" src={Userlogo} className={classes.avatar} />
    </IconButton>
  );
};

export default UserAvatar;
