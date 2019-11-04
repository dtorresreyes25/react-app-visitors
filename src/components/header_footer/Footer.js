import React from "react";
import Copyright from './copyright'

const Footer = props => {

  const showFooter = () =>
    (
     <Copyright/>
    )
  return props.user ? showFooter() : null;
};

export default Footer;
