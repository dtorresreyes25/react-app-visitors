import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import orderBy from "lodash/orderBy";

import { VisitorsTable } from "./components";

const useStyles = makeStyles(theme => ({
    root: {
        // padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
}));

const VisitorList = props => {
    const classes = useStyles();
    const {
        isPending,
        visits,
        error,
        token,
        isUpdatingVisit,
        isVisitUpdated,
        errorOnUpdate,
        onRequestVisits,
        onUpdateVisits,
        userSession
    } = props;

    const [visitors, setVisitors] = useState({
        columns: [
            { title: "Nombre", field: "nombre" },
            { title: "Apellidos", field: "apellidos" },
            { title: "C.I/Pasaporte", field: "carnet" },
            {
                title: "Fecha",
                field: "fecha",
                type: "datetime",
                render: rowData =>
                    format(new Date(rowData.fecha), "dd MMM yyyy hh: mm a ", {
                        locale: es
                    })
            },
            { title: "Lugar visitado", field: "visitado" },
            { title: "Motivo", field: "motivo" },
            { title: "Organismo", field: "organismo" },
            { title: "Chapa", field: "vehiculo_chapa" },
            { title: "Color", field: "vehiculo_color" },
            { title: "Marca", field: "vehiculo_marca" },
            { title: "Tipo", field: "vehiculo_tipo" }
        ],
        data: []
    });

    const modifyIdFromVisits = visits => {
        const newVisits = [];
        visits.forEach(visit => {
            newVisits.push({ ...visit, _id: visit["_id"]["$oid"] });
        });

        return newVisits;
    };

    useEffect(() => {
        console.log("effect");
        onRequestVisits(userSession.authSession.token);
        if (visits) {
            const Visits = modifyIdFromVisits(visits);
            const orderVisitsByDate = orderBy(Visits, ["fecha"], ["desc"]);
            setVisitors({ ...visitors, data: orderVisitsByDate });
        }
    }, []);

    const saveEditedItem = item => {
        onUpdateVisits(item, userSession.authSession.token);
        onRequestVisits(userSession.authSession.token)
    };

    console.log(isVisitUpdated)

    return (
        <div className={classes.root}>
            <VisitorsTable
                visitors={visitors}
                setVisitors={setVisitors}
                isLoading={isPending || isUpdatingVisit}
                onUpdateVisits={saveEditedItem}
            />
        </div>
    );
};

export default VisitorList;
