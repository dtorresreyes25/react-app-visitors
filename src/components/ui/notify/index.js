import React, { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import {notifyStyles} from '../styles'
import MySnackbarContentWrapper from './notifyContent'


export default function Notify(props) {
  const classes = notifyStyles();
  const { message, variant, display, onClose, ...other } = props;
 

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    onClose(true);
     };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        autoHideDuration={6000}
        open={display}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          variant={variant}
          className={classes.margin}
          message={message}
          onClose={handleClose}
        />
      </Snackbar>
    </div>
  );
}
