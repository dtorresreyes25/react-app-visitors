import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {useAuth} from '../../../../context/auth'
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  LinearProgress
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));


const AccountProfile = props => {

  const auth = useAuth();

  const [profilePic,setProfilePic] = useState({});
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState({});

  const {email,name,public_id} = auth.authSession.user

  const { className, ...rest } = props;

  const classes = useStyles();

  const user = {
    name: name,
    city: 'Los Angeles',
    country: 'USA',
    timezone: 'GTM-7',
    avatar: '/images/avatars/avatar_11.png'
  };

  useEffect(()=>{

    if(profilePic.name) UploadProfilePic()
     
     console.log('[AccountProfile.js] => effect')
     console.log('[AccountProfile.js] =>',profilePic.name)

  },[profilePic.name])

  const UploadProfilePic=()=>{

    const formData = new FormData();
    formData.append('title', 'prof.jpg');
    formData.append('file', profilePic);

    console.log(formData)
    
    const url = "https://api.ict.cu/visitors/api/v1/user/image";
    
         axios.post(url,
          formData, {
             headers: {"Authorization" : 'Basic','Content-Type': 'multipart/form-data',"x-access-token":`${auth.authSession.token}`} 
          }
        ).then(function () {
          console.log('SUCCESS!!', profilePic);
          setIsLoading(false)

        })
        .catch(function (e) {
          console.log('FAILURE!!', e);

          setIsLoading(false)
          setIsError({variant: 'error', msg: 'no se pudo subir la imagen'})
        });

  }
  
  const onChange=(e)=>{

    setProfilePic(e.target.files[0]);

  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              {user.name}
            </Typography>
            
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {moment().format('hh:mm A')} ({user.timezone})
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">Profile Completeness: 70%</Typography>
          <LinearProgress
            value={70}
            variant="determinate"
          />
        </div>
      </CardContent>
      <Divider />
      <CardActions>


        <input
          color="primary"
          accept="image/*"
          type="file"
          onChange={onChange}
          id="icon-button-file"
          style={{ display: 'none', }}
        />
        <label htmlFor="icon-button-file">
          <Button
            variant="contained"
            component="span"
            className={classes.button}
            size="large"
            color="primary"
          >
            <PhotoCamera className={classes.extendedIcon} />Subir
          </Button>
        </label>
     


        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
        >
          Upload picture
        </Button>
        <Button variant="text">Remove picture</Button>
      </CardActions>
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string
};

export default AccountProfile;
