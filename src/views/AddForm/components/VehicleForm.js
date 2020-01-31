import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";


import MenuItem from "@material-ui/core/MenuItem";

import CommuteIcon from "@material-ui/icons/Commute";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import AspectRatioIcon from "@material-ui/icons/AspectRatio";

export default function VehicleForm({ formState, handleChange }) {
  const vehicles = [
    {
      value: "Auto",
      label: "Auto"
    },
    {
      value: "Moto",
      label: "Moto"
    },
    {
      value: "Otro",
      label: "Otro"
    }
  ];

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom styles={{ marginBottom: 20 }}>
        Vehículo
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CommuteIcon />
                </InputAdornment>
              )
            }}
            variant="outlined"
            id="cardName"
            name="vehicleType"
            placeholder="Tipo"
            fullWidth
            value={formState.values.vehicleType}
            onChange={handleChange}
            select
            helperText="Selecione un vehículo de la lista"
          >
            {vehicles.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmojiFlagsIcon />
                </InputAdornment>
              )
            }}
            variant="outlined"
            id="cardNumber"
            name="vehicleBrand"
            placeholder="Marca"
            value={formState.values.vehicleBrand}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ColorLensIcon />
                </InputAdornment>
              )
            }}
            variant="outlined"
            id="expDate"
            placeholder="Color"
            name="vehicleColor"
            fullWidth
            value={formState.values.vehicleColor}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AspectRatioIcon />
                </InputAdornment>
              )
            }}
            variant="outlined"
            id="cvv"
            placeholder="Chapa"
            name="vehicleLicencePlate"
            fullWidth
            value={formState.values.vehicleLicencePlate}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
