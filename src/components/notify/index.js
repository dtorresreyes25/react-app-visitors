import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MySnackbarContentWrapper from './notifyContent'


export default function Notify(props) {
  const { message, variant, display, onClose, autoHide, ...other } = props;
 

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
          vertical: "bottom",
          horizontal: "right"
        }}
        autoHideDuration={ !autoHide ? null: 6000}
        open={display}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          variant={variant}
          message={message}
          onClose={handleClose}
        />
      </Snackbar>
    </div>
  );
}
