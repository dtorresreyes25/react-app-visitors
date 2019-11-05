import { makeStyles } from "@material-ui/core/styles";
import PortadaICT from "../../resources/entrada-ict.jpg";
import { amber, green, red} from "@material-ui/core/colors/";

export const signInStyles = makeStyles(theme => ({
    root: {
      height: "100vh"
    },
    logo: {
      paddingRight: 0,
      width: 50,
      height: 40
    },
    image: {
      backgroundImage: `url(${PortadaICT})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: "transparent"
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  }));


export const notifyStyles = makeStyles(theme => ({
    success: {
      backgroundColor: green[600]
    },
    error: {
      backgroundColor: red[600]
    },
    info: {
      backgroundColor: theme.palette.primary.main
    },
    warning: {
      backgroundColor: amber[700]
    },
    icon: {
      fontSize: 20
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1)
    },
    message: {
      display: "flex",
      alignItems: "center"
    },
    margin: {
      margin: theme.spacing(1)
    }
  }));

export  const headerStyles = makeStyles(theme => ({
    logo: {
      paddingRight: 0,
      width: 50,
      height: 40
    },
    avatar: {
      margin: 10
    },
    iconButtonAvatar: {
      padding: 4
    },
    bigAvatar: {
      margin: 10,
      width: 60,
      height: 60
    }
  }));


export const formStyles = makeStyles(theme => ({
    appBar: {
      position: "relative"
    },
    layout: {
      width: "auto",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: "auto",
        marginRight: "auto"
      }
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
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
      backgroundColor: '#fff'
    },
    listItem: {
      padding: theme.spacing(1, 0)
    },
    total: {
      fontWeight: "700"
    },
    title: {
      marginTop: theme.spacing(2)
    },
    
  }));

  