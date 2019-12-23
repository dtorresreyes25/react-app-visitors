import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField
} from '@material-ui/core';
import { toast } from 'react-toastify';

import useForm from '../../../../../helpers/useForm'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4)
    }
}));

const schema = {

    contraseña: {
        presence: { allowEmpty: false, message: ' es obligatorio rellenarla' },
        length: {
            maximum: 128
        }
    },
    confirmación: {
        presence: { allowEmpty: false, message: 'es obligatorio rellenarlo' },
        length: {
            maximum: 128
        },
        equality: {
            attribute: "contraseña",
            message: ["^Las contraseñas no coinciden"],
        }

    }
};

const AccountPassword = props => {

    const { className, ...rest } = props;

    const { password, token } = props.userSession.authSession;

    const classes = useStyles();

    const default_values = {
        contraseña: "",
        confirmación: ""
    }

    const pssw = useRef(null)
    const confPssw = useRef(null)


    function submitPassword() {

        const resp = props.userSession.editUserInfo({ password: formState.values.contraseña })

        resp.then((r) => {

            if (r.status === 201) {

                toast.success("Contraseña actualizada y guardada correctamente!")
                pssw.current.value = null
                confPssw.current.value = null


            } else {

                toast.error("Hubo un error y no se pudo guardar la nueva contraseña")

            }
        })

    }


    const { hasError, handleChange, handleSubmit, formState } = useForm(
        submitPassword,
        schema,
        default_values)

    return ( <
        >
        <
        Card 
        //{ ...rest } 
        className = { clsx(classes.root, className) } 
        >
        <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="Actualice la contraseña"
          title="Contraseña"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
             <TextField
                fullWidth
                label="Contraseña"
                inputRef={pssw}
                name="contraseña"
                error={hasError('contraseña')}
                onChange={handleChange}
                type="password"
                value={formState.values.contraseña || ''}
                required
                variant="outlined"
                helperText={
                    hasError('contraseña') ? formState.errors.contraseña[0] : "Cree aquí una contraseña nueva"
                  }
             />
            </Grid>     
            <Grid
              item
              md={6}
              xs={12}
            >
             <TextField
                  fullWidth
                  label="Confirmar contraseña"
                  inputRef={confPssw}
                  name="confirmación"
                  required
                  error={hasError('confirmación')}
                  onChange={handleChange}
                  type="password"
                  value={formState.values.confirmación || ''}
                  variant="outlined"
                  helperText={
                    hasError('confirmación') ? formState.errors.confirmación[0] : "Confirme la contraseña que definió en el campo anterior"
                  }
               />
            </Grid>
          
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="outlined"
            onClick={handleSubmit}
            disabled = { ((formState.values.contraseña && formState.values.confirmación))? false : true }
          >
            Guardar
          </Button>
        </CardActions>
      </form> < /Card> < / >
    )
}

export default AccountPassword