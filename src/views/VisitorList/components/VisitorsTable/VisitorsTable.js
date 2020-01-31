import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import orderBy from "lodash/orderBy";
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
import {Typography} from '@material-ui/core'

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


const VisitorsTable = props => {
  const {
    visitors,
    isLoading,
    onUpdateVisits,
    onCloneSelectedVisit,
    onRemoveVisit,
  } = props;

  const modifyIdFromVisits = visits => {
    const newVisits = [];
    if (visits) {
      visits.forEach(visit => {
        newVisits.push({ ...visit, _id: visit["_id"]["$oid"] });
      });
    }

    return newVisits;
  };

  const removeIdPropFromVisitObj = visit => {
    if (visit) {
      delete visit._id;
      return visit;
    }
  };

  const Visits = modifyIdFromVisits(visitors);
  const orderVisitsByDate = orderBy(Visits, ["fecha"], ["desc"]);

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
          selection: false,
          grouping: false,
          searchFieldAlignment: "left",
          headerStyle: {
            backgroundColor: "#2e7031",
            color: "#FFF"
          }
        }}
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
        actions={[
          {
            icon: tableIcons.Add,
            tooltip: "Duplicar visita",
            onClick: (event, rowData) => {
              const cloneVisitWithoutId = removeIdPropFromVisitObj(rowData);
              onCloneSelectedVisit(cloneVisitWithoutId);
            }
          }
        ]}
        isLoading={isLoading}
        icons={tableIcons}
        columns={[
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
          { title: "Tipo", field: "vehiculo_tipo" },
          { title: "Chapa", field: "vehiculo_chapa" },
          { title: "Color", field: "vehiculo_color" },
          { title: "Marca", field: "vehiculo_marca" }
        ]}
        data={orderVisitsByDate}
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
                  onUpdateVisits(newData);
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                onRemoveVisit(oldData._id);
              }, 600);
            })
        }}
      />
    </React.Fragment>
  );
};

export default VisitorsTable;
