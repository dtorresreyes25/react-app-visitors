/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import { List, ListItem } from '@material-ui/core';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));

const SidebarNav = props => {
  const { pages } = props;

  return (
    <List>
      {pages.map(page => (
         <ListItem button key={page.title} component={CustomRouterLink} to={page.href} >
            <ListItemIcon>
              <div >{page.icon}</div>
             </ListItemIcon>
          <ListItemText primary={page.title} />
        </ListItem>
      ))}
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;
