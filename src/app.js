import React, { useState, useLayoutEffect, useRef } from "react";
import "./style.css";

import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Oscillator } from "./oscillator";
import TopBar from "./top-bar";
import FrequencyLimitControls from "./freq-limit-ctrls";
import Canvas from "./canvas";
import HelpDialog from './help-dialog';
import SettingsDialog from './settings-dialog';
import AboutDialog from './about-dialog';
import SideBar from "./sidebar";
import { useScreenOrientation } from "./orientation";

import { TOTAL_FREQ_RANGE, DEFAULT_OSC_TYPE } from "./constants";


// https://stackoverflow.com/a/1527820/795131
const getRandomValueInRange = (min, max) => {
  return Math.random() * (max - min) + min;
}

const getRandFreqOLD = (range, precision=3) => {
  let [bottomFreq, topFreq] = range;
  let freq = getRandomValueInRange(bottomFreq, topFreq + 1);
  return freq.toFixed(precision);
}

const getRandFreq = (range, precision=3) => {
  let [bottomFreq, topFreq] = range;
  let freq = getRandomValueInRange(bottomFreq, topFreq + 1);
  return Math.floor(freq);
}

const useStyles = makeStyles((theme) => ({
  app: {
    margin: 0, //"1rem",
    padding: 0,
    fontFamily: "sans-serif",
    height: "100%",
    minHeight: "100%",
    maxHeight: "100%",
    display: "flex",
    flexDirection: "column"
  },
  ctrls: {
    padding: "0px 20px"
  },
  main: {
    display: "flex",
    flex: 1,
    padding: "10px 20px 15px",
    justifyContent: "center"
  }
}));

const App = () => {
  const orientation = useScreenOrientation();
  const classes = useStyles();

  const [freqRange, setFreqRange] = useState(TOTAL_FREQ_RANGE);
  const [freq, setFreq] = useState();

  const initOscType = localStorage.getItem('oscType') || DEFAULT_OSC_TYPE;
  const [oscType, setOscType] = useState(initOscType);

  const initFreq = getRandFreq(freqRange);
  const oscRef = useRef( Oscillator(oscType, initFreq) );

  const [hasAudio, setHasAudio] = useState(false);

  const [sideBarOpen, setSideBarOpen] = useState(false);

  const [showHelpDialog, toggleShowHelpDialog] = useState(false);
  const [showSettingsDialog, toggleShowSettingsDialog] = useState(false);
  const [showAboutDialog, toggleShowAboutDialog] = useState(false);

  useLayoutEffect(() => {
    freq && oscRef.current.update(freq);
  }, [freq]);

  useLayoutEffect(() => {
    oscType && oscRef.current.setOscType(oscType);
    localStorage.setItem('oscType', oscType);
  }, [oscType]);

  const toggleAudio = () => {
    setHasAudio(oscRef.current.toggleAudio());
  };

  const refresh = () => {
    let newFreq = getRandFreq(freqRange);
    setFreq(newFreq);
  };

  const getWaveform = () => {
    return oscRef.current.getWaveform();
  };

  const handleDrawerOpen = () => {
    setSideBarOpen(true);
  };

  const handleDrawerClose = () => {
    setSideBarOpen(false);
  };

  const toggleHelpDialog = () => {
    toggleShowHelpDialog(!showHelpDialog);
  };

  const toggleSettingsDialog = () => {
    toggleShowSettingsDialog(!showSettingsDialog);
  };

  const toggleAboutDialog = () => {
    toggleShowAboutDialog(!showAboutDialog);
  };

  const handleChangeOscType = (type) => {
    setOscType(type.toLowerCase());
    //localStorage.setItem('oscType', oscType);
  };

  return (
    <Box className={classes.app}>
      <TopBar { ...{ handleDrawerOpen, toggleAudio, refresh, hasAudio, oscType, handleChangeOscType } }/>
      <SideBar open={sideBarOpen} onClose={handleDrawerClose} { ...{ toggleHelpDialog, toggleSettingsDialog, toggleAboutDialog } } />
      <Box className={classes.ctrls}>
        <FrequencyLimitControls { ...{ freqRange, setFreqRange } }/>
        <Typography color="textSecondary" align="center">{`${freq || initFreq} Hz`}</Typography>
      </Box>
      <Box className={classes.main}>
        <Canvas { ...{ freq, getWaveform } }/>
      </Box>
      <HelpDialog isOpen={showHelpDialog} handleClose={toggleHelpDialog}/>
      <SettingsDialog
        isOpen={showSettingsDialog}
        handleClose={toggleSettingsDialog}
        handleChangeOscType={handleChangeOscType}
      />
      <AboutDialog isOpen={showAboutDialog} handleClose={toggleAboutDialog} orientation={orientation}/>
    </Box>
  );
}

export default App;