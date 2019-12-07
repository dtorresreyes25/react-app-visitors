import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker
} from "@material-ui/pickers";
import esLocale from "date-fns/locale/es/index";
import DateFnsUtils from "@date-io/date-fns";
import { Face, Fingerprint } from "@material-ui/icons";

export default function PersonalForm({
    formState,
    handleChange,
    hasError,
    setErrorStep
}) {
    React.useEffect(() => {
        if (!formState.values.visitDate)
            handleChange({
                target: {
                    name: "visitDate",
                    value: new Date()
                }
            });
    }, []);

    return (
        <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={hasError("firstName")}
            helperText={
              hasError("firstName") ? formState.errors.firstName[0] : null
            }
            id="firstName"
            name="firstName"
            label="Nombre"
            fullWidth
            value={formState.values.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={hasError("lastName")}
            helperText={
              hasError("lastName") ? formState.errors.lastName[0] : null
            }
            id="lastName"
            name="lastName"
            label="Apellidos"
            fullWidth
            value={formState.values.lastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={hasError("ci")}
            helperText={hasError("ci") ? formState.errors.ci[0] : null}
            id="ci"
            name="ci"
            value={formState.values.ci}
            label="CI o pasaporte"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="organismo"
            name="organismo"
            value={formState.values.organismo}
            label="Organismo"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={hasError("visitedPlace")}
            helperText={
              hasError("visitedPlace") ? formState.errors.visitedPlace[0] : null
            }
            id="lugarVisitado"
            name="visitedPlace"
            label="Lugar visitado"
            fullWidth
            onChange={handleChange}
            value={formState.values.visitedPlace}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DateTimePicker
            invalidLabel={
              hasError("visitedDate") ? formState.errors.visitDate[0] : null
            }
            label="Fecha"
            format="dd MMM yyyy hh: mm a "
            required
            timeIcon={<face />}
            disableFuture
            cancelLabel="Cancelar"
            onChange={e =>
              handleChange({
                target: {
                  name: "visitDate",
                  value: e
                }
              })
            }
            fullWidth
            name="visitDate"
            autoOk
            value={formState.values.visitDate}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            error={hasError("visitReason")}
            helperText={
              hasError("visitReason") ? formState.errors.visitReason[0] : null
            }
            id="motivo"
            name="visitReason"
            label="Motivo de la visita"
            fullWidth
            onChange={handleChange}
            value={formState.values.visitReason}
          />
        </Grid>
      </Grid>
    </React.Fragment>
    );
}