import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { useStyles } from "../ui/misc";
import Userlogo from "../../resources/user.jpg";

const UserAvatar = () => {
  const classes = useStyles();
  return (
    <IconButton color="inherit" className={classes.iconButtonAvatar}>
      <Avatar alt="Remy Sharp" src={Userlogo} className={classes.avatar} />
    </IconButton>
  );
};

export default UserAvatar;
