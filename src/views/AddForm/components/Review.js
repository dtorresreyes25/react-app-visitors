import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Divider from '@material-ui/core/Divider';

const formStyles = makeStyles(theme => ({
    appBar: {
        position: "relative"
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3)
        }
    },
    stepper: {
        padding: theme.spacing(3, 0, 5)
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end"
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1)
    },
    logo: {
        paddingRight: 0,
        width: 50,
        height: 40,
        backgroundColor: "#fff"
    },
    listItem: {
        padding: theme.spacing(1, 0)
    },
    total: {
        fontWeight: "700"
    },
    title: {
        marginTop: theme.spacing(2)
    }
}));

export default function Review({
    formState,
    handleChange,
    handleOnClickReview,
    hasError
}) {
    const classes = formStyles();

    const {
        firstName,
        lastName,
        ci,
        organismo,
        visitedPlace,
        visitDate,
        visitReason,
        vehicleType,
        vehicleBrand,
        vehicleColor,
        vehicleLicencePlate
    } = formState.values;



    return (
        <React.Fragment>
        <Typography variant="h4" gutterBottom styles={{marginBottom:'20px'}}>
        Resumen
      </Typography>
      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12} sm={12}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Datos Personales
          </Typography>
          <Divider variant="middle" style={{marginBottom: 20}} />
          <Grid container>            <Grid container direction="row">
              <Grid item sm={3} xs={3}>
                <Typography gutterBottom variant="subtitle2">
                  Nombre:
                </Typography>
              </Grid>
              <Grid item sm={9} xs={9}>
               <Typography gutterBottom variant="h5">
                   { firstName }
               </Typography>    
              </Grid>
              <Grid item sm={3} xs={3}>
                <Typography gutterBottom variant="subtitle2">
                  Apellidos:
                </Typography>
              </Grid>
              <Grid item sm={9} xs={9}>
               <Typography gutterBottom variant="h5">
                  { lastName }
                  </Typography>
              </Grid>
              <Grid item sm={3} xs={3}>
                <Typography gutterBottom variant="subtitle2">
                  CI o pasaporte:
                </Typography>
              </Grid>
              <Grid item sm={9} xs={9}>
               <Typography gutterBottom variant="h5">
                   { ci }
                   </Typography>
              </Grid>
              <Grid item sm={3} xs={3}>
                <Typography gutterBottom variant="subtitle2">
                  Organismo:
                </Typography>
              </Grid>
              <Grid item sm={9} xs={9}>
               <Typography gutterBottom variant="h5">
                  { organismo }
                  </Typography>
              </Grid>
              <Grid item sm={3} xs={3}>
                <Typography gutterBottom variant="subtitle2">
                  Lugar visitado:
                </Typography>
              </Grid>
              <Grid item sm={9} xs={9}>
               <Typography gutterBottom variant="h5">
               { visitedPlace }
               </Typography>
              </Grid>
              <Grid item sm={3} xs={3}>
                <Typography gutterBottom variant="subtitle2">
                  Fecha:
                </Typography>
              </Grid>
                 
              <Grid item sm={9} xs={9}>
               <Typography gutterBottom variant="h5">
                  {format(new Date(visitDate), 'dd MMM yyyy hh: mm a ',{locale: es})}
                  </Typography>
              </Grid>

              <Grid item sm={3} xs={3}>
                <Typography gutterBottom variant="subtitle2">
                  Motivo de la visita:
                </Typography>
              </Grid>
              <Grid item sm={9} xs={9}>
               <Typography gutterBottom variant="h5">
              { visitReason }
              </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={12} sm={12}>
          <Typography variant="h5" gutterBottom className={classes.title}>
            Vehículo
          </Typography>
          <Divider variant="middle" style={{marginBottom: 20}}/>
          <Grid container>
            <Grid container direction="row">
              <Grid item sm={3} xs={3}>
                <Typography gutterBottom variant="subtitle2">
                  Tipo:
                </Typography>
              </Grid>
              <Grid item sm={9} xs={9}>
              <Typography gutterBottom variant="h5">
              { vehicleType }
               </Typography>
              </Grid>
              <Grid item sm={3} xs={3}>
                <Typography gutterBottom variant="subtitle2">
                  Marca:
                </Typography>
              </Grid>
              <Grid item sm={9} xs={9}>
               <Typography gutterBottom variant="h5">
              { vehicleBrand }
              </Typography>
              </Grid>
              <Grid item sm={3} xs={3}>
                <Typography gutterBottom variant="subtitle2">
                  Color:
                </Typography>
              </Grid>
              <Grid item sm={9} xs={9}>
               <Typography gutterBottom variant="h5">
               { vehicleColor }
               </Typography>
              </Grid>
              <Grid item sm={3} xs={3}>
                <Typography gutterBottom variant="subtitle2">
                  Chapa:
                </Typography>
              </Grid>
              <Grid item sm={9} xs={9}>
               <Typography gutterBottom variant="h5">
               { vehicleLicencePlate }
               </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
    );
}