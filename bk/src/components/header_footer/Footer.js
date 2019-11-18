import React from "react";
import Copyright from './copyright'

const Footer = ({user}) => {


  const showFooter = () =>
    (
     <Copyright/>
    )
 return <div>{user ? showFooter() : null}</div>;
};

export default Footer;
