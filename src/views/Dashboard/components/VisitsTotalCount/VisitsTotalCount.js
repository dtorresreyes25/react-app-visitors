import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { format } from 'date-fns'
import { es } from 'date-fns/locale'


const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function VisitsTotalCount({visits}) {
  const classes = useStyles();
  return (
    <React.Fragment>
       <Typography variant="h4" gutterBottom styles={{ marginBottom: 20 }}>
        Visitas totales
      </Typography>
      <Typography component="p" variant="h1" gutterBottom>
        {visits.length}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        hasta {format(new Date(), 'dd MMM yyyy',{locale: es})}
      </Typography>
      <div>
        <Link color="primary" href="/visitas">
          Ver detalles
        </Link>
      </div>
    </React.Fragment>
  );
}
