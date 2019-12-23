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
import InputLabel from "@material-ui/core/InputLabel";

import InputAdornment from "@material-ui/core/InputAdornment";
import DateRangeIcon from "@material-ui/icons/DateRange";
import FormatSizeIcon from "@material-ui/icons/FormatSize";
import ChromeReaderModeIcon from "@material-ui/icons/ChromeReaderMode";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import DomainIcon from "@material-ui/icons/Domain";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

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
     <Typography variant="h4" gutterBottom styles={{marginBottom:20}}>
        Datos personales
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Face />
                </InputAdornment>
              )
            }}
            variant="outlined"
            error={hasError("firstName")}
            fullWidth
            helperText={
              hasError("password") ? formState.errors.firstName[0] : null
            }
            placeholder="Nombre"
            name="firstName"
            onChange={handleChange}
            value={formState.values.firstName || ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FormatSizeIcon />
                </InputAdornment>
              )
            }}
            required
            error={hasError("lastName")}
            helperText={
              hasError("lastName") ? formState.errors.lastName[0] : null
            }
            id="lastName"
            name="lastName"
            placeholder="Apellidos"
            fullWidth
            value={formState.values.lastName || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ChromeReaderModeIcon />
                </InputAdornment>
              )
            }}
            required
            error={hasError("ci")}
            helperText={hasError("ci") ? formState.errors.ci[0] : null}
            id="ci"
            name="ci"
            value={formState.values.ci || ""}
            placeholder="CI o pasaporte"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBalanceIcon />
                </InputAdornment>
              )
            }}
            id="organismo"
            name="organismo"
            value={formState.values.organismo || ""}
            placeholder="Organismo"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DomainIcon />
                </InputAdornment>
              )
            }}
            required
            error={hasError("visitedPlace")}
            helperText={
              hasError("visitedPlace") ? formState.errors.visitedPlace[0] : null
            }
            id="lugarVisitado"
            name="visitedPlace"
            placeholder="Lugar visitado"
            fullWidth
            onChange={handleChange}
            value={formState.values.visitedPlace || ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DateTimePicker
            inputVariant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DateRangeIcon />
                </InputAdornment>
              )
            }}
            invalidplaceholder={
              hasError("visitedDate") ? formState.errors.visitDate[0] : null
            }
            placeholder="Fecha"
            variant="outlined"
            format="dd MMM yyyy hh: mm a "
            required
            timeIcon={<face />}
            disableFuture
            cancelplaceholder="Cancelar"
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
            value={formState.values.visitDate || ""}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ChatBubbleIcon />
                </InputAdornment>
              )
            }}
            required
            error={hasError("visitReason")}
            helperText={
              hasError("visitReason") ? formState.errors.visitReason[0] : null
            }
            id="motivo"
            name="visitReason"
            placeholder="Motivo de la visita"
            fullWidth
            onChange={handleChange}
            value={formState.values.visitReason || ""}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
