import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

export default class Header extends Component {
  render() {
    return (
      <div>
        <AppBar position="fixed">
          <ToolBar>
            <div className="header_logo">
              <div className="font_righteous header_logo_venue">ICT,S.A.</div>
              <div className="header_logo_title">Visitors App</div>
            </div>
          </ToolBar>
        </AppBar>
      </div>
    );
  }
}
