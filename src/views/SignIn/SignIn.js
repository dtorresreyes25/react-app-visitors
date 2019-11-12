import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';

import axios from 'axios';
import { useAuth} from "../../context/auth";
import Notify from "../../components/notify";

import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';



const schema = {
  email: {
    presence: { allowEmpty: false, message: 'es obligatorio rellenarlo' },
    email: {
      message: "no parece ser una dirección válida"
    },
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'es obligatorio rellenarlo' },
    length: {
      maximum: 128
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/entrada-ict.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
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
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
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
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
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
    textAlign: 'left'
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

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [isError, setIsError] = useState({});
  const [isIdle, setIsIdle] = useState(auth.isIdle)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  // const handleBack = () => {
  //   history.goBack();
  // };

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

   const login = () => {
  
    setIsLoading(true);

    const url = "https://api.ict.cu/visitors/api/v1/login";
    axios({
      method: "get",
      url,
      auth: {
        username: formState.values.email,
        password: formState.values.password
      }
    })
      .then(result => {

        if (result.status === 200) {
         
          auth.setSessionCookie(result.data);
          
         
          history.push("/");
          
          setIsLoading(false);  
          
        } else {
          setIsError({
            variant: "error",
            message: "El usuario o la contraseña no son correctas"
          });
        }
      })
      .catch(e => {
        setIsError({ variant: "error", message: "El usuario o la contraseña no son correctas" });
        setIsLoading(false);
      });
  }

  const handleSignIn = event => {
    
    event.preventDefault();
    
    login();
    //history.push('/');
    //setIsLoading(true)
    //setTimeout(()=>setIsLoading(false),6000);
  };

  const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
          
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              {/*<IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>*/}
            </div>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={handleSignIn}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Acceso
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
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Contraseña"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                />
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={ isLoading ? true : !formState.isValid ? true : false }
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                {isLoading? "...comprobando": "Entrar"}
                </Button>
                
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
         {isError.variant ? (
            <Notify
              display={isError.variant ? true : false}
              onClose={value => (value ? setIsError({}) : null)}
              variant={isError.variant}
              message={isError.message}
              autoHide={true}
            />
             ) : null}
         {isIdle ? (
            <Notify
              display={isIdle}
              onClose={(e)=>setIsIdle(false)}
              variant={'warning'}
              message={'Se desconectó la sesión por inactividad'}
            />
             ) : null}
    </div>
  );
}


SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
