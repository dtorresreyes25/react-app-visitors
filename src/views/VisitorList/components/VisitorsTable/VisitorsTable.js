import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from "@material-ui/core";
import MaterialTable from "material-table";
import { getInitials } from "helpers";

import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: "flex",
    alignItems: "center"
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: "flex-end"
  }
}));

const VisitorsTable = props => {
  const { className, visitors, setVisitors, isLoading, ...rest } = props;

  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h4" gutterBottom>
        Lista de visitas
      </Typography>
      <MaterialTable
        style={{
          boxShadow:
            "0 0 0 1px rgba(63,63,68,0.05), 0 1px 3px 0 rgba(63,63,68,0.15)",
          width: "100%"
        }}
        title=""
        options={{
          search: true,
          pageSize: 10,
          selection: true,
          grouping: false,
          searchFieldAlignment: "left",
          headerStyle: {
            backgroundColor: "#2e7031",
            color: "#FFF"
          }
        }}
        actions={[
          {
            tooltip: 'Remove All Selected Users',
            icon: 'delete',
            onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
          }
        ]}
        localization={{
          body: {
            emptyDataSourceMessage: "Aún no hay visitantes registrados",
            editRow: {
              cancelTooltip: "Cancelar",
              saveTooltip: "Guardar",
              deleteText: "Estás seguro que deseas borrar esta fila?"
            },
            editTooltip: "Editar",
            deleteTooltip: "Borrar",
            addTooltip: "Añadir"
          },
          header: {
            actions: ""
          },
          toolbar: {
            searchTooltip: "Buscar",
            searchPlaceholder: "Buscar"
          },
          pagination: {
            labelRowsSelect: "Filas",
            labelDisplayedRows: " {from}-{to} de {count}",
            firstTooltip: "Primera página",
            previousTooltip: "Página anterior",
            nextTooltip: "Próxima página",
            lastTooltip: "Última página"
          },
          grouping: {
            placeholder: "Arrastre los encabezados aquí para agrupar campos"
          }
        }}
        isLoading={isLoading}
        icons={tableIcons}
        columns={visitors.columns}
        data={visitors.data}
        editable={{
          // onRowAdd: newData =>
          //   new Promise(resolve => {
          //     setTimeout(() => {
          //       resolve();
          //       setVisitors(prevState => {
          //         const data = [...prevState.data];
          //         data.push(newData);
          //         return { ...prevState, data };
          //       });
          //     }, 600);
          //   }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setVisitors(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setVisitors(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            })
        }}
      />
    </React.Fragment>
  );
};

VisitorsTable.propTypes = {
  className: PropTypes.string,
  visitors: PropTypes.object.isRequired
};

export default VisitorsTable;
