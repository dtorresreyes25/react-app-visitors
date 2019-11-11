import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "../header_footer/UserAvatar";
import { headerStyles } from "../ui/styles";
import Grid from "@material-ui/core/Grid";
import Logo from "../../resources/logo-ict.png";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";



import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}



const Header = ({ auth }) => {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const classes = headerStyles();

  function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const showHeader = () => (
    <AppBar color="inherit" position="sticky" elevation={0}>
      <Toolbar>

        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <img src={Logo} alt="logo" className={classes.logo} />
          </Grid>
          <Grid item>
            <Typography color="inherit" variant="h5" component="h1">
              App Visitantes
            </Typography>
          </Grid>
          <Grid item xs />
         <Grid item>
         <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab label="Item One" icon={<PhoneIcon />} {...a11yProps(0)} />
          <Tab label="Item Two" icon={<FavoriteIcon />} {...a11yProps(1)} />
          <Tab label="Item Three" icon={<PersonPinIcon />} {...a11yProps(2)} />
          <Tab label="Item Four" icon={<HelpIcon />} {...a11yProps(3)} />
         
        </Tabs>
         </Grid>
          <Grid item>
            <UserAvatar />
            {/* {console.log(props.authTokens)} */}
            {auth.authSession ? `${auth.authSession.user} | ` : null}
            <Button onClick={auth.signOut}>Salir</Button>
          </Grid>
        </Grid>
      </Toolbar>
       <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
    </AppBar>

  );
  return <div>{auth.authSession ? showHeader() : null}</div>;
};

export default Header;


 