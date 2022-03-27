import React from "react";
//import "./style.css";

import { Menu, MenuItem, ListItemIcon, Typography } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';


const OptionsMenu1 = (props) => {
  const { toggleSettingsDialog, toggleAboutDialog, anchorElem, handleClose } = props;
  const open = Boolean(anchorElem);
  const handleOpenSettingsDialog = () => {
    toggleSettingsDialog();
    handleClose();
  };
  const handleOpenAboutDialog = () => {
    toggleAboutDialog();
    handleClose();
  };
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
      <MenuItem onClick={handleOpenSettingsDialog}>Settings...</MenuItem>
      <MenuItem onClick={handleOpenAboutDialog}>About</MenuItem>
   </Menu>
  )
}

// This version adds icons to the menu items.
const OptionsMenu = (props) => {
  const { toggleSettingsDialog, toggleAboutDialog, anchorElem, handleClose } = props;
  const open = Boolean(anchorElem);
  const handleOpenSettingsDialog = () => {
    toggleSettingsDialog();
    handleClose();
  };
  const handleOpenAboutDialog = () => {
    toggleAboutDialog();
    handleClose();
  };
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
      <MenuItem onClick={handleOpenSettingsDialog}>
        <ListItemIcon style={ { minWidth: 36 } }><SettingsIcon fontSize="small" /></ListItemIcon>
        <Typography variant="inherit">Settings...</Typography>
      </MenuItem>
      <MenuItem onClick={handleOpenAboutDialog}>
        <ListItemIcon style={ { minWidth: 36 } }><InfoIcon fontSize="small" /></ListItemIcon>
        <Typography variant="inherit">About...</Typography>
      </MenuItem>
   </Menu>
  )
}

export default OptionsMenu;