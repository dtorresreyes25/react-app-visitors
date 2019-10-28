import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import esLocale from "date-fns/locale/es/index";
import DateFnsUtils from "@date-io/date-fns";

export default function PersonalForm() {
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );

  function handleDateChange(date) {
    setSelectedDate(date);
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Datos personales
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Nombre"
            fullWidth
            autoComplete="fname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Apellidos"
            fullWidth
            autoComplete="lname"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="ci"
            name="ci"
            label="CI o pasaporte"
            fullWidth
            autoComplete="billing address-level2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="organismo"
            name="organismo"
            label="Organismo"
            fullWidth
            autoComplete="billing postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lugarVisitado"
            name="lugarVisitado"
            label="Lugar visitado"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} style={{ marginTop: 16 }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
            <DateTimePicker
              cancelLabel="Cancelar"
              onChange={handleDateChange}
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="motivo"
            name="motivo"
            label="Motivo de la visita"
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox color="secondary" name="saveAddress" value="yes" />
            }
            label="Utiliza algún vehículo"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
