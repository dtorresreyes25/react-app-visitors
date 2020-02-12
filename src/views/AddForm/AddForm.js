import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import PersonalForm from "./components/PersonalForm";
import VehicleForm from "./components/VehicleForm";
import Review from "./components/Review";
import { makeStyles } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import esLocale from "date-fns/locale/es/index";
import DateFnsUtils from "@date-io/date-fns";
import { addVisits } from "../../store/";
import { connect } from "react-redux";
import { useForm } from "../../helpers";

const mapStateToProps = state => {
    return {
        isAddingVisit: state.isAddingVisit,
        errorOnAdd: state.errorOnAdd,
        isVisitAdded: state.isVisitAdded
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddNewVisit: (token, visits) => dispatch(addVisits(token, visits))
    };
};

const formStyles = makeStyles(theme => ({
    appBar: {
        position: "relative"
    },
    layout: {
        width: "auto",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 800,
            marginLeft: "auto",
            marginRight: "auto"
        }
    },
    paper: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(0),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3)
        }
    },
    stepper: {
        padding: theme.spacing(3, 0, 5)
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end"
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1)
    },
    logo: {
        paddingRight: 0,
        width: 50,
        height: 40,
        backgroundColor: "#fff"
    },
    listItem: {
        padding: theme.spacing(1, 0)
    },
    total: {
        fontWeight: "700"
    },
    title: {
        marginTop: theme.spacing(2)
    }
}));

const schema = {
    firstName: {
        presence: {
            allowEmpty: false,
            message: "^Debe de registrar el nombre antes de guardar."
        },
        length: {
            maximum: 128
        }
    },
    lastName: {
        presence: {
            allowEmpty: false,
            message: "^Debe de registrar el apellido antes de guardar."
        },
        length: {
            maximum: 128
        }
    },
    ci: {
        presence: {
            allowEmpty: false,
            message: "^Debe de registrar el CI/Pasaporte antes de guardar."
        },
        length: {
            maximum: 128
        }
    },
    organismo: {
        length: {
            maximum: 128
        }
    },
    visitedPlace: {
        presence: {
            allowEmpty: false,
            message: "^Debe registrar el lugar de la visita antes de guardar."
        },
        length: {
            maximum: 128
        }
    },
    visitDate: {
        presence: {
            allowEmpty: false,
            message: "^Debe registrar la fecha de la visita antes de guardar."
        }
    },
    visitReason: {
        presence: {
            allowEmpty: false,
            message: "^Debe registrar el motivo de la visita antes de guardar."
        },
        length: {
            maximum: 128
        }
    },
    vehicleType: {
        length: {
            maximum: 128
        }
    },
    vehicleBrand: {
        length: {
            maximum: 128
        }
    },
    vehicleColor: {
        length: {
            maximum: 128
        }
    },
    vehicleLicencePlate: {
        length: {
            maximum: 128
        }
    }
};

const AddForm = ({
    userSession,
    onAddNewVisit,
    isAddingVisit,
    isVisitAdded
}) => {
    const classes = formStyles();

    const [activeStep, setActiveStep] = React.useState(0);

    const {
        hasError,
        handleChange,
        handleSubmit,
        handleResetformValues,
        formState
    } = useForm(handleFormStepCompletation, schema, {});

    const steps = ["Datos personales", "Vehículo", "Resumen"];

    const getStepContent = step => {
        switch (step) {
            case 0:
                return (
                    <PersonalForm
                        formState={formState}
                        hasError={hasError}
                        handleChange={handleChange}
                    />
                );
            case 1:
                return (
                    <VehicleForm
                        formState={formState}
                        hasError={hasError}
                        handleChange={handleChange}
                    />
                );
            case 2:
                return (
                    <Review
                        formState={formState}
                        handleChange={handleChange}
                        hasError={hasError}
                    />
                );
            default:
                throw new Error("Unknown step");
        }
    };

    function handleFormStepCompletation() {
        console.log("handleFormStepCompletation");
        if (activeStep < 2) {
            if (
                Object.keys(formState.errors).length > 0 ||
                Object.keys(formState.values).length === 1
            ) {
                setActiveStep(activeStep);
            } else {
                if (activeStep <= steps.length) setActiveStep(activeStep + 1);
            }
        }
        if (activeStep === 2) {
            const dataToSubmit = {
                nombre: formState.values.firstName,
                apellidos: formState.values.lastName,
                carnet: formState.values.ci,
                organismo: formState.values.organismo,
                visitado: formState.values.visitedPlace,
                fecha: formState.values.visitDate,
                motivo: formState.values.visitReason,
                vehiculo_tipo: formState.values.vehicleType || "",
                vehiculo_marca: formState.values.vehicleBrand || "",
                vehiculo_color: formState.values.vehicleColor || "",
                vehiculo_chapa: formState.values.vehicleLicencePlate || ""
            };
            onAddNewVisit(userSession.authSession.token, dataToSubmit);
        }
    }

    function handleBack() {
        return setActiveStep(activeStep - 1);
    }

    console.log("ActiveStep", activeStep);

    function handleNewEntryForm() {
        handleResetformValues();
        setActiveStep(0);
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h2" align="center">
                        Nuevo Visitante
                    </Typography>
                    <Stepper
                        activeStep={activeStep}
                        className={classes.stepper}
                    >
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {isVisitAdded && activeStep === 2 ? (
                            <React.Fragment>
                                <Typography variant="h5" gutterBottom>
                                    Se han guardado los datos correctamente.
                                </Typography>
                                <Typography variant="subtitle1">
                                    {
                                        "Si desea registrar un nuevo visitante haga click "
                                    }
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        onClick={handleNewEntryForm}
                                    >
                                        Aquí
                                    </Button>
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <MuiPickersUtilsProvider
                                    utils={DateFnsUtils}
                                    locale={esLocale}
                                >
                                    {getStepContent(activeStep)}
                                </MuiPickersUtilsProvider>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "flex-end"
                                    }}
                                >
                                    <div>
                                        <Typography variant="caption">
                                            {activeStep !== 2
                                                ? "Los campos marcados con * son obligatorio rellenarlos."
                                                : ""}
                                        </Typography>
                                    </div>
                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                            <Button
                                                onClick={handleBack}
                                                className={classes.button}
                                            >
                                                Atrás
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleSubmit}
                                            disabled={
                                                Object.keys(formState.values)
                                                    .length === 1
                                                    ? true
                                                    : false
                                            }
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1
                                                ? "Guardar"
                                                : "Siguiente"}
                                        </Button>
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
