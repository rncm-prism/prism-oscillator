import React, { useState, useLayoutEffect, useRef } from "react";
import "./style.css";

import { Typography, Container } from '@material-ui/core';

import { Oscillator } from "./oscillator";
import TopBar from "./top-bar";
import FrequencyLimitControls from "./freq-limit-ctrls";
import Canvas from "./canvas";
import SettingsDialog from './settings-dialog';
import AboutDialog from './about-dialog';

import { TOTAL_FREQ_RANGE, DEFAULT_OSC_TYPE } from "./constants";


// https://stackoverflow.com/a/1527820/795131
const getRandomValueInRange = (min, max) => {
  return Math.random() * (max - min) + min;
}

const getRandFreq = (range, precision=3) => {
  let [bottomFreq, topFreq] = range;
  let freq = getRandomValueInRange(bottomFreq, topFreq + 1);
  return freq.toFixed(precision);
}

const App = () => {
  const [freqRange, setFreqRange] = useState(TOTAL_FREQ_RANGE);
  const [freq, setFreq] = useState();

  const initOscType = localStorage.getItem('oscType') || DEFAULT_OSC_TYPE;
  const [oscType, setOscType] = useState(initOscType);

  const initFreq = getRandFreq(freqRange);
  const oscRef = useRef( Oscillator(oscType, initFreq) );

  const [hasAudio, setHasAudio] = useState(false);

  const [showSettingsDialog, toggleShowSettingsDialog] = useState(false);
  const [showAboutDialog, toggleShowAboutDialog] = useState(false);

  useLayoutEffect(() => {
    freq && oscRef.current.update(freq);
  }, [freq]);

  useLayoutEffect(() => {
    oscType && oscRef.current.setOscType(oscType);
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

  const toggleSettingsDialog = () => {
    toggleShowSettingsDialog(!showSettingsDialog);
  };

  const toggleAboutDialog = () => {
    toggleShowAboutDialog(!showAboutDialog);
  };

  const handleChangeOscType = (type) => {
    localStorage.setItem('oscType', type);
    setOscType(type);
  };

  return (
    <div id="app">
      <TopBar { ...{ toggleSettingsDialog, toggleAboutDialog, toggleAudio, refresh, hasAudio } }/>
      <Container id="content" style={{padding: "0px"}}>
        <FrequencyLimitControls { ...{ freqRange, setFreqRange } }/>
        <Typography color="textSecondary" align="center">{`${freq || initFreq} Hz`}</Typography>
        <Canvas { ...{ freq, getWaveform } }/>
      </Container>
      <SettingsDialog
        isOpen={showSettingsDialog}
        handleClose={toggleSettingsDialog}
        handleChangeOscType={handleChangeOscType}
      />
      <AboutDialog isOpen={showAboutDialog} handleClose={toggleAboutDialog}/>
    </div>
  );
}

export default App;