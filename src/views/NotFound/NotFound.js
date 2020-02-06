import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    paddingTop: 150,
    textAlign: "center"
  },
  image: {
    marginTop: 50,
    display: "inline-block",
    maxWidth: "100%",
    width: 450
  },
  homeButton: {
    marginLeft: 10,
  }
}));

const NotFound = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={6} xs={12}>
          <div className={classes.content}>
            <Typography variant="h1">
              404: No está aquí la página que estás buscando.
            </Typography>
            <Typography variant="subtitle2">
              Intentaste alguna ruta incompleta o viniste aquí por error. Ve a 
              <Button
                variant="contained"
                className={classes.homeButton}
                size="small"
                color="primary"
                onClick={() => history.push("/")}
              >
                Inicio
              </Button>
            </Typography>

            <img
              alt="Under development"
              className={classes.image}
              src="/images/logos/logo-ict.png"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
