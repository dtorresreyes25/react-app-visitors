import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
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

import useForm from '../../../../helpers/useForm.js'
import AccountPassword from './components'


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
    nombre: {
        presence: { allowEmpty: false, message: 'es obligatorio rellenarlo' },
        length: {
            maximum: 128
        }
    }
};


const AccountDetails = props => {

    const { className } = props;

    const { email, name} = props.userSession.authSession;

    const default_values = {
        nombre: name,
        email: email
    }

    const { hasError, handleChange, handleSubmit, formState } = useForm(submitPersonal, schema, default_values)


    function submitPersonal() {

        const resp = props.userSession.editUserInfo({ name: formState.values.nombre, email: formState.values.email })

        resp.then((r) => {

            if (r.status === 201) {

                toast.success("Datos actualizados correctamente!")

            } else {

                toast.error("Hubo un error y no se pudo actualizar los datos")

            }
        })

    }

    return ( <
        >
        <Card
      //{...rest}
      className={clsx( className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="Edite su información personal"
          title="Perfil"
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
                required
                label="Nombre"
                margin="dense"
                name="nombre"
                error={hasError('nombre')}
                onChange = {handleChange}
                value={formState.values.nombre}
                variant="outlined"
                 helperText={
                    hasError('nombre') ? formState.errors.nombre[0] : null
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
                label="Email"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                error={hasError('email')}
                value={formState.values.email}
                variant="outlined"
                helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
              />
            </Grid>  
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            disabled = { ((formState.values.nombre && formState.values.email))? false : true }
          >
            Actualizar
          </Button>
        </CardActions>

        
      </form>

    </Card> <
        AccountPassword userSession = { props.userSession }
        /> < / >
    );
};

AccountDetails.propTypes = {
    className: PropTypes.string
};

export default AccountDetails;