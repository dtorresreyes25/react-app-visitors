import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import { Sidebar, Topbar, Footer } from './components';
import Idle from 'react-idle-enhanced'
import { toast } from 'react-toastify';
import { LockScreen } from '../../components'


const useStyles = makeStyles(theme => ({
    root: {
        paddingTop: 56,
        height: '100%',
        [theme.breakpoints.up('sm')]: {
            paddingTop: 64
        }
    },
    shiftContent: {
        paddingLeft: 240
    },
    content: {
        height: '100%'
    }
}));

const Main = props => {
    const { children, userSession } = props;

    const classes = useStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true
    });

    const [openSidebar, setOpenSidebar] = useState(false);




    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };


    const shouldOpenSidebar = isDesktop ? true : openSidebar;

    return (
        <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
         
      <Topbar onSidebarOpen={handleSidebarOpen} userSession={userSession} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
        userSession={userSession}
      />
      <main className={classes.content}>  
       <Idle
          timeout={600000}
          render={ (idle) => <LockScreen userSession={userSession} open={idle.idle} /> }
        />
        {children}
        <Footer />
      </main>
    </div>
    );
};

Main.propTypes = {
    children: PropTypes.node
};

export default Main;