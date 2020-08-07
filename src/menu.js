import React, { usseState } from "react";
import "./style.css";

import { Menu, MenuItem } from '@material-ui/core';


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
      <MenuItem onClick={handleOpenSettingsDialog}>Settings...</MenuItem>
      <MenuItem onClick={handleOpenAboutDialog}>About</MenuItem>
   </Menu>
  )
}

export default OptionsMenu;