import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

import {  VisitorsTable } from "./components";


const useStyles = makeStyles(theme => ({
    root: {
        // padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
}));

const VisitorList = ({ userSession }) => {
    const classes = useStyles();

    const [visitors, setVisitors] = useState({
        columns: [
            { title: 'Nombre', field: 'nombre' },
            { title: 'Apellidos', field: 'apellidos' },
            { title: 'C.I/Pasaporte', field: 'carnet' },
            { title: 'Fecha', field: 'fecha', type:'datetime' , render: rowData => format(new Date(rowData.fecha), 'dd MMM yyyy hh: mm a ',{locale: es}) },
            { title: 'Lugar visitado', field: 'visitado' },
            { title: 'Motivo', field: 'motivo' },
            { title: 'Organismo', field: 'organismo' },
            { title: 'Chapa', field: 'vehiculo_chapa' },
            { title: 'Color', field: 'vehiculo_color' },
            { title: 'Marca', field: 'vehiculo_marca' },
            { title: 'Tipo', field: 'vehiculo_tipo' },
            
        ],
        data: [],
    });

    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("https://api.ict.cu/visitors/api/v1/visitors", {
                headers: {
                    "x-access-token": userSession.authSession.token
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.visitors.length > 0) {

                    setVisitors({...visitors, data: data.visitors});

                    setIsLoading(false);
                }else{
                  setIsLoading(false);
                }
            })
            .catch(err => console.log(err));
    },[]);
    return (
        <div className={classes.root}>
      <VisitorsTable visitors={visitors} setVisitors={setVisitors} isLoading={isloading} />
    </div>
    );
};

export default VisitorList;