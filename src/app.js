import React, { useState, useLayoutEffect, useRef } from "react";
import { Box, Input, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { osc } from "./oscillator";
import Waveform from "./waveform";
import TopBar from "./top-bar";
import FrequencyLimitControls from "./freq-limit-ctrls";
import SettingsDialog from './settings-dialog';
import AboutDialog from './about-dialog';
import { TOTAL_FREQ_RANGE, DEFAULT_OSC_TYPE } from "./constants";

// See https://www.robinwieruch.de/react-useeffect-only-on-update
const useLayoutEffectOnlyOnUpdate = (callback, dependencies) => {
  const didMount = React.useRef(false);
 
  React.useLayoutEffect(() => {
    if (didMount.current) {
      callback(dependencies);
    } else {
      didMount.current = true;
    }
  }, [callback, dependencies]);
};

const useStyles = makeStyles((theme) => ({
  ctrls: {
    padding: "0px 20px"
  },
  freqCtrl: {
    width: "62px",
    marginLeft: "8px"
  },
  freqCtrlLabel: {
    display: "inline-block",
  },
  freqCtrlContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center" ,
  },
  waveformContainer: {
    position: "absolute",
    top: "180px",
    bottom: "0px",
    width: "100%",
    padding: "0px 20px",
    overflow: "hidden",
  }
}));

const getRandomValueInRange = (min, max) => {
  return Math.random() * (max - min) + min;
}

const getRandFreq = (range) => {
  let [bottomFreq, topFreq] = range;
  let freq = getRandomValueInRange(bottomFreq, topFreq + 1);
  return Math.floor(freq);
}

const App = () => {

  const classes = useStyles();

  const initFreq = 440;

  // Oscillator state.
  const [oscType, setOscType] = useState(DEFAULT_OSC_TYPE);
  const [freq, setFreq] = useState(initFreq);
  const [freqRange, setFreqRange] = useState(TOTAL_FREQ_RANGE);
  const [hasAudio, setHasAudio] = useState(false);

  // Dialogs.
  const [showSettingsDialog, toggleShowSettingsDialog] = useState(false);
  const [showAboutDialog, toggleShowAboutDialog] = useState(false);

  const handleChangeOscType = (e) => {
    setOscType(e.currentTarget.getAttribute("value"));
  }

  const handleChangeFreq = (e) => {
    setFreq(e.target.value);
  }

  const handleHasAudio = () => {
    setHasAudio(!hasAudio);
  }

  useLayoutEffect(() => {
    osc.setOscType(oscType);
  }, [oscType]);

  useLayoutEffect(() => {
    osc.setFreq(freq);
  }, [freq]);

  useLayoutEffectOnlyOnUpdate(() => {
    hasAudio ? osc.start() : osc.stop();
  }, [hasAudio]);

  const refresh = () => {
    let newFreq = getRandFreq(freqRange);
    setFreq(newFreq);
  };

  const toggleSettingsDialog = () => {
    toggleShowSettingsDialog(!showSettingsDialog);
  };

  const toggleAboutDialog = () => {
    toggleShowAboutDialog(!showAboutDialog);
  };

  return (
    <Box>
      <TopBar { ...{ toggleSettingsDialog, toggleAboutDialog, refresh, hasAudio, oscType, handleHasAudio, handleChangeOscType } }/>
      <Box className={classes.ctrls}>
        <FrequencyLimitControls { ...{ freqRange, setFreqRange } }/>
        <Box className={classes.freqCtrlContainer}>
          <InputLabel className={classes.freqCtrlLabel} htmlFor="freq">Current Frequency:</InputLabel>
          <Input
            className={classes.freqCtrl}
            id="freq"
            type="number"
            value={freq}
            min={350}
            max={1050}
            onChange={handleChangeFreq}
          />
        </Box>
      </Box>
      <Box className={classes.waveformContainer}>
        <Waveform { ...{ hasAudio } } />
      </Box>
      <SettingsDialog
        isOpen={showSettingsDialog}
        handleClose={toggleSettingsDialog}
        handleChangeOscType={handleChangeOscType}
      />
      <AboutDialog isOpen={showAboutDialog} handleClose={toggleAboutDialog}/>
    </Box>
  )
}

export default App;
