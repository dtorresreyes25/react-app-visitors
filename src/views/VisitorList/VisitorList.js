import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/styles";

import { toast } from "react-toastify";
import {
    requestVisits,
    saveVisits,
    cloneVisit,
    addVisits,
    removeVisits
} from "../../store/";
import { connect } from "react-redux";

import { VisitorsTable } from "./components";

const useStyles = makeStyles(theme => ({
    root: {
        // padding: theme.spacing(3)
    },
    content: {
        marginTop: theme.spacing(2)
    }
}));

const mapStateToProps = state => {
    return {
        isPending: state.isPending,
        visits: state.visits,
        isSaving: state.isSaving,
        isVisitRemoved: state.isVisitRemoved,
        isVisitUpdated: state.isVisitUpdated,
        isVisitAdded: state.isVisitAdded,
        isVisitCloned: state.isVisitCloned,
        savedVisitId: state.savedVisitId,
        errorOnSave: state.errorOnSave
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRequestVisits: token => dispatch(requestVisits(token)),
        onUpdateVisits: (token, visits) => dispatch(saveVisits(token, visits)),
        onCloneVisit: (token,visit)=>dispatch(cloneVisit(token,visit)),
        onAddNewVisit: (token, visits) => dispatch(addVisits(token, visits)),
        onRemoveVisit: (token, visitId) =>
            dispatch(removeVisits(token, visitId))
    };
};

const VisitorList = props => {
    const classes = useStyles();
    const {
        isPending,
        visits,
        isUpdatingVisit,
        isVisitUpdated,
        onRequestVisits,
        onUpdateVisits,
        userSession,
        onRemoveVisit,
        onCloneVisit,
        isVisitCloned,
        isVisitRemoved,
    } = props;

    const token = userSession.authSession.token;


    const refreshList = () => {
        return onRequestVisits(token);
    };

    if (isVisitCloned) {
        toast.success("Se ha duplicado correctamente la visita", 3);
        refreshList();
    }

    if (isVisitRemoved) {
        toast.success("Se ha eliminado correctamente la visita", 1);
        refreshList();
    }

    if (isVisitUpdated) {
        toast.success("Se ha actualizado correctamente la visita", 2);
        refreshList();
    }


    useEffect(() => {
        onRequestVisits(token);
    }, [onRequestVisits]);

    const saveEditedItem = item => {
        onUpdateVisits(token, item);
    };

    const onCloneSelectedVisit = item => {
        onCloneVisit(token, item);
    };

    const removeItem = itemId => {
        onRemoveVisit(token, itemId);
    };

    return (
        <div className={classes.root}>
            <VisitorsTable
                visitors={visits}
                isLoading={isPending || isUpdatingVisit}
                onUpdateVisits={saveEditedItem}
                onCloneSelectedVisit={onCloneSelectedVisit}
                onRemoveVisit={removeItem}
            />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(VisitorList);
