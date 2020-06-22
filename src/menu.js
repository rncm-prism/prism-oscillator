import React, { usseState } from "react";
import "./style.css";

import { Menu, MenuItem } from '@material-ui/core';

//import AboutDialog from "./dialogs";


const OptionsMenu = (props) => {
  let { anchorElem, handleClose } = props;
  let open = Boolean(anchorElem);
  return (
    <Menu
      id="options-menu"
      anchorEl={anchorElem}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>Connect...</MenuItem>
      <MenuItem onClick={handleClose}>Settings...</MenuItem>
      <MenuItem onClick={handleClose}>About</MenuItem>
   </Menu>
  )
}

export default OptionsMenu;