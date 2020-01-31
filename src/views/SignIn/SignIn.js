import React, { useState} from "react";
import {  withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { useAuth } from "../../context/auth";

import useForm from "../../helpers/useForm";

import { toast } from "react-toastify";

import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Button,
  TextField,
  Typography
} from "@material-ui/core";
import { Fingerprint } from "@material-ui/icons";
import MailOutlineTwoToneIcon from "@material-ui/icons/MailOutlineTwoTone";
import InputAdornment from "@material-ui/core/InputAdornment";
import { green } from "@material-ui/core/colors";

const schema = {
  email: {
    presence: {
      allowEmpty: false,
      message: "^El email es obligatorio rellenarlo."
    },
    email: {
      message: "^El email no parece ser una dirección válida."
    },
    length: {
      maximum: 64
    }
  },
  password: {
    presence: {
      allowEmpty: false,
      message: "^La contraseña es obligatorio rellenarla."
    },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%"
  },
  grid: {
    height: "100%"
  },
  progress: {
    color: green[500]
  },
  quoteContainer: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(/images/entrada-ict.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px"
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center"
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2),
    textAlign: "left"
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignIn = props => {
  const auth = useAuth();

  const { history } = props;

  const classes = useStyles();

  const { hasError, handleChange, handleSubmit, formState } = useForm(
    login,
    schema,
    null
  );

  const [isLoading, setIsLoading] = useState(false);

  function login() {
    setIsLoading(true);

    const email = formState.values.email;
    const pwd = formState.values.password;

    const isAuthenticated = auth.signIn(email, pwd);

    isAuthenticated.then(r => {
      if (r) {
        setIsLoading(false);
        history.push("/");
      } else {
        setIsLoading(false);
        toast.error("⚠ El usuario o la contraseña no son correctas!");
      }
    });
  }

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.quote}></div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              {/*<IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>*/}
            </div>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSubmit}>
                <Typography className={classes.title} variant="h2">
                  Iniciar sesión
                </Typography>

                <Typography
                  align="center"
                  className={classes.sugestion}
                  color="textSecondary"
                  variant="body1"
                >
                  Entre sus credenciales debajo
                </Typography>

                <TextField
                  className={classes.textField}
                  error={hasError("email")}
                  fullWidth
                  helperText={
                    hasError("email") ? formState.errors.email[0] : null
                  }
                  placeholder="Email"
                  id="outlined-basic"
                  name="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineTwoToneIcon />
                      </InputAdornment>
                    )
                  }}
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ""}
                  variant="outlined"
                />

                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Fingerprint />
                      </InputAdornment>
                    )
                  }}
                  className={classes.textField}
                  error={hasError("password")}
                  fullWidth
                  helperText={
                    hasError("password") ? formState.errors.password[0] : null
                  }
                  placeholder="Contraseña"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ""}
                  variant="outlined"
                />

                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={
                    !formState.values.email ||
                    !formState.values.password ||
                    isLoading
                      ? true
                      : false
                  }
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {isLoading ? (
                    <p style={{ color: "#fff" }}>...Cargando</p>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
     
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
