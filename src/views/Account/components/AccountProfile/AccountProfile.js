import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardActions,
    CardContent,
    Avatar,
    Typography,
    Divider,
    Button,
    LinearProgress,
    Chip
} from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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


    const [file, setFile] = useState('');

    const [uploadPercentage, setUploadPercentage] = useState(0);

    const { email, name, public_id, avatar, token } = props.userSession.authSession;

    //const { email, name, public_id, avatar } = { email: 'dtorres@ictsa.cu', name: 'dayron', public_id: '12345', avatar: 'http://localhost' }



    const { className, ...rest } = props;

    const classes = useStyles();

    const user = {
        name: name,
        city: 'Los Angeles',
        country: 'USA',
        timezone: 'GTM-7',
        avatar: '/images/avatars/avatar_11.png'
    };


    const onChange = e => {
        setFile(e.target.files[0])
    };

    const onSubmit = e => {

        e.preventDefault();

        const upload = props.userSession.uploadUserAvatar(file, setUploadPercentage)

        upload.then((r) => {

            if (r.status === 201) {

                toast.success("Imagen guardada satisfactoriamente")

                setFile('')

            } else {

                toast.error("Hubo un error y no se pudo guardar la imagen")

            }
        })

    };

    const handleDelete = () => {
        setFile('')
    };


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
              {name}
            </Typography>
            
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              ID: {public_id}
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={`https://api.ict.cu/visitors/api/v1/user/image?name=${avatar}&token=${token}`}
          />
        </div>

          { file.name ? (
            
             <div className={classes.progress} >
             <Chip
                avatar={<Avatar alt="Natacha" src={URL.createObjectURL(file)} />}
                label={file.name.substr(0, 60)}
                onDelete={handleDelete}
                variant="outlined"
                style={{marginBottom: 10 }}
             />
                <LinearProgress
                  value={uploadPercentage}
                  variant="determinate"
                />
                    </div>
            ): null
         } 
    
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
            variant="text"
            component="span"
            className={classes.button}
            color="primary"
          >
            <PhotoCamera className={classes.extendedIcon} /> Selecciona
      </Button>
        </label>
     


        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
          disabled={ !file ? true : false }
          onClick={onSubmit}
        >
          Guardar
        </Button>
      </CardActions>
      <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
    </Card>
    );
};

AccountProfile.propTypes = {
    className: PropTypes.string
};

export default AccountProfile;