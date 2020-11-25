import React, { Fragment, useState } from "react";
import "./style.css";

import { AppBar, Toolbar, IconButton, Typography, MenuItem, Button, Menu, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import RefreshIcon from '@material-ui/icons/Refresh';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';

import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';

import OptionsMenu from "./menu";
import { OSC_TYPES } from "./constants";


const useStyles = makeStyles((theme) => ({
  iconBtn: {
    paddingLeft: 8,
    paddingRight: 8
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  oscType: {
    margin: theme.spacing(0, 0.5, 0, 1)
  }
}));

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const OscillatorTypeSelector = (props) => {
  const { value, handleChange } = props;
  const classes = useStyles();

  const [anchorElem, setAnchorElem] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorElem(event.currentTarget);
  }
  const handleCloseMenu = () => {
    setAnchorElem(null);
  }

  const handleOnClick = (e) => {
    handleChange(e);
    handleCloseMenu();
  }

  const options = OSC_TYPES.map((type, i) => {
    let content = capitalizeFirstLetter(type);
    return <MenuItem value={type} key={i} onClick={handleOnClick}>{content}</MenuItem>;
  });

  return (
    <Fragment>
      <Tooltip title="Change Oscillator Type" enterDelay={300}>
        <Button id="osc-type-select" color="inherit" onClick={handleOpenMenu}>
          <span className={classes.oscType}>{ value }</span>
          <ExpandMoreIcon fontSize="small" />
        </Button>
      </Tooltip>
      <Menu
        value={value}
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
        open={Boolean(anchorElem)}
        onClose={handleCloseMenu}
      >
        { options }
      </Menu>
    </Fragment>
  )
}

const TopBar = (props) => {
  const classes = useStyles();

  let { toggleSettingsDialog, toggleAboutDialog, toggleAudio, refresh, hasAudio, oscType, handleChangeOscType } = props
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
        <Typography variant="h6" style={ {marginLeft: "5px", flexGrow: 1} }>Oscillator</Typography>
        <OscillatorTypeSelector value={oscType} handleChange={(e) => handleChangeOscType(e.target.textContent)}/>
        <IconButton className={classes.iconBtn} color="inherit" aria-label="toggle-audio" title={audioBtnTitle} onClick={toggleAudio}>
          { hasAudio==false ? <VolumeOffIcon/> : <VolumeUpIcon /> }
        </IconButton>
        <IconButton className={classes.iconBtn} color="inherit" aria-label="refresh" title="Refresh" onClick={refresh}>
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
