import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import MenuItem from '@material-ui/core/MenuItem';


export default function VehicleForm({ formState, handleChange }) {

    const vehicles = [{
            value: 'Auto',
            label: 'Auto',
        },
        {
            value: 'Moto',
            label: 'Moto',
        },
        {
            value: 'Otro',
            label: 'Otro',
        },
    ];

    return (
        <React.Fragment>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            id="cardName"
            name="vehicleType"
            label="Tipo"
            fullWidth
            helperText="Moto o Auto"
            value={formState.values.vehicleType}
            onChange={handleChange}
            select
            helperText="Selecion un vehículo"
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
          id="cardNumber"
          name="vehicleBrand" 
          label="Marca" 
          value={formState.values.vehicleBrand}
          onChange={handleChange}
          fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField 
          id="expDate" 
          label="Color" 
          name="vehicleColor" 
          fullWidth
          value={formState.values.vehicleColor}
          onChange={handleChange}
           />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField 
          id="cvv" 
          label="Chapa"
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