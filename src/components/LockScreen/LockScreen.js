import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    withMobileDialog
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import {
    Paper,
    withStyles,
    Grid,
    FormControlLabel,
    Checkbox
} from "@material-ui/core";
import { Face, Fingerprint } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";
import LockIcon from "@material-ui/icons/Lock";
import { useForm } from "../../helpers";
import { ToastContainer, toast } from "react-toastify";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "fit-content"
    },
    avatar: {
        width: 80,
        height: 80,
        margin: 10,
        color: "#fff",
        backgroundColor: deepPurple[500]
    },
    name: {
        marginTop: theme.spacing(1)
    },
    margin: {
        //margin: theme.spacing.unit * 2
        margin: theme.spacing(2)
    }
}));

const schema = {
    password: {
        presence: {
            allowEmpty: false,
            message: "^La contraseña es obligatorio rellenarla."
        },
        length: {
            maximum: 128
        }
    }
};

const LockScreen = props => {
    const {
        hasError,
        handleChange,
        handleBlur,
        handleSubmit,
        formState
    } = useForm(handleUnlock, schema, null);

    const { className, userSession, signIn, history, open, ...rest } = props;

    const [openDialog, setOpenDialog] = useState(false);

    const classes = useStyles();

    const { email, name, public_id, avatar, token } = userSession.authSession;

    function handleUnlock() {
        const isUnlocked = userSession.signIn(email, formState.values.password);

        isUnlocked.then(r => {
            if (r) {
                setOpenDialog(false);
            } else {
                toast.error("La contraseña no es correcta");
            }
        });
    }

    useEffect(() => {
        if (open) {
            setOpenDialog(true);
        }
    }, [open]);

    return (
        <Dialog open={openDialog} fullScreen={false}>
            <DialogTitle
                style={{
                    justifyContent: "center",
                    display: "flex",
                    justify: "center"
                }}
            >
                <LockIcon
                    style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "5px",
                        marginTop: "5px"
                    }}
                />
                Sesion bloqueada por inactividad
            </DialogTitle>
            <DialogContent>
                <div className={classes.margin}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid container justify="center">
                            <Grid item>
                                <Avatar
                                    alt="Person"
                                    className={classes.avatar}
                                    src={
                                        avatar
                                            ? `https://api.ict.cu/visitors/api/v1/user/image?name=${avatar}&token=${token}`
                                            : null
                                    }
                                >
                                    {!avatar ? name.substr(0, 2) : null}
                                </Avatar>
                                <Typography
                                    className={classes.name}
                                    variant="h4"
                                >
                                    {name}
                                </Typography>
                                <Typography variant="body2">{email}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        alignItems="flex-end"
                        style={{ marginTop: "40px" }}
                    >
                        <Grid
                            item
                            md={true}
                            sm={true}
                            xs={true}
                            style={{ marginTop: "10px" }}
                        >
                            <TextField
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Fingerprint />
                                        </InputAdornment>
                                    )
                                }}
                                label="contraseña"
                                name="password"
                                onChange={handleChange}
                                type="password"
                                error={hasError("password")}
                                fullWidth
                                helperText={
                                    hasError("password")
                                        ? formState.errors.email[0]
                                        : null
                                }
                                autoFocus
                            />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        justify="center"
                        style={{ marginTop: "10px" }}
                    >
                        <Button
                            variant="text"
                            color="primary"
                            style={{ textTransform: "none" }}
                            disabled={formState.values.password ? false : true}
                            onClick={handleSubmit}
                        >
                            Desbloquear
                        </Button>
                    </Grid>
                    <ToastContainer
                        position="top-center"
                        autoClose={1500}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnVisibilityChange
                        draggable
                        pauseOnHover
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default withMobileDialog()(LockScreen);
