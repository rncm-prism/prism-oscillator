import React, { useState } from "react";
import "./style.css";

import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import RefreshIcon from '@material-ui/icons/Refresh';

import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';

import OptionsMenu from "./menu";


const TopBar = (props) => {
  let { toggleSettingsDialog, toggleAboutDialog, toggleAudio, refresh, hasAudio } = props
  const [anchorElem, setAnchorElem] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorElem(event.currentTarget);
  }
  const handleCloseMenu = () => {
    setAnchorElem(null);
  }

  const audioBtnTitle = hasAudio==false ? "Unmute" : "Mute";

  return (
    <AppBar position="static" >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleOpenMenu}>
          <MenuIcon />
        </IconButton>
        <OptionsMenu { ...{ toggleSettingsDialog, toggleAboutDialog, anchorElem } } handleClose={handleCloseMenu}/>
        <Typography variant="h6" style={ {marginLeft: "10px", flexGrow: 1} }>PRiSM Oscillator</Typography>
        <IconButton color="inherit" aria-label="toggle-audio" title={audioBtnTitle} onClick={toggleAudio}>
          { hasAudio==false ? <VolumeOffIcon/> : <VolumeUpIcon /> }
        </IconButton>
        <IconButton color="inherit" aria-label="refresh" title="Refresh" onClick={refresh}>
          <RefreshIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

// Use this version if we put the play and
// refresh buttons at the bottom.
const TopBar2 = () => {
  const [anchorElem, setAnchorElem] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorElem(event.currentTarget);
  }
  const handleCloseMenu = () => {
    setAnchorElem(null);
  }

  return (
    <AppBar position="static" >
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleOpenMenu}>
          <MenuIcon />
        </IconButton>
        <OptionsMenu anchorElem={anchorElem} handleClose={handleCloseMenu}/>
        <Typography variant="h6" style={ {marginLeft: "10px", flexGrow: 1} }>PRiSM Oscillator</Typography>
        <IconButton color="inherit" aria-label="start" >
            <InfoIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="refresh" >
            <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar;
