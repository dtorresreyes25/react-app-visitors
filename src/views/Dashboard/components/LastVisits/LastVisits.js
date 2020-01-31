import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import orderBy from "lodash/orderBy";

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

export default function LastVisits({ visits }) {
  const classes = useStyles();

  const lastSixVisits = orderBy(visits, ["fecha"], ["desc"]).slice(0, 6);

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Visitas Recientes
      </Typography>
      {visits.length > 0 ? (
        <React.Fragment>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellidos</TableCell>
                <TableCell>Carnet</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Lugar Visitado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lastSixVisits.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>{row.apellidos}</TableCell>
                  <TableCell>{row.carnet}</TableCell>
                  <TableCell>
                    {format(new Date(row.fecha), "dd MMM yyyy hh: mm a ", {
                      locale: es
                    })}
                  </TableCell>
                  <TableCell>{row.visitado}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className={classes.seeMore}>
            <Link color="primary" href="/visitas">
              ver más visitas
            </Link>
          </div>
        </React.Fragment>
      ) : (
        "no hay visitas registradas aún"
      )}
    </React.Fragment>
  );
}
