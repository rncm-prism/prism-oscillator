import React from "react";
import "./style.css";

import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';

const sideBarWidth = 250;

const useStyles = makeStyles((theme) => ({
  sideBar: {
    width: sideBarWidth,
    flexShrink: 0,
  },
  sideBarPaper: {
    width: sideBarWidth,
  }
}));

const SideBar = (props) => {
  const classes = useStyles();
  const { open, onClose, toggleHelpDialog, toggleSettingsDialog, toggleAboutDialog } = props;

  const handleOpenHelpDialog = () => {
    toggleHelpDialog();
    onClose();
  };
  const handleOpenSettingsDialog = () => {
    toggleSettingsDialog();
    onClose();
  };
  const handleOpenAboutDialog = () => {
    toggleAboutDialog();
    onClose();
  };

  const Items = () => {
    return (
      <div role="presentation">
        <List>
        <ListItem button onClick={handleOpenHelpDialog}>
            <ListItemIcon><HelpIcon/></ListItemIcon>
            <ListItemText>Help</ListItemText>
          </ListItem>
          <ListItem button onClick={handleOpenSettingsDialog}>
            <ListItemIcon><SettingsIcon/></ListItemIcon>
            <ListItemText>Settings</ListItemText>
          </ListItem>
          <ListItem button onClick={handleOpenAboutDialog}>
            <ListItemIcon><InfoIcon/></ListItemIcon>
            <ListItemText>About</ListItemText>
          </ListItem>
        </List>
    </div>
    );
  };

  return (
    <Drawer className={classes.sideBar} classes={{ paper: classes.sideBarPaper }} open={open} onClose={onClose}>
      <Items />
    </Drawer>
  );
}

export default SideBar;