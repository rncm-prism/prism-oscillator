import React, { useState, useLayoutEffect, useRef } from "react";
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { osc } from "./oscillator";
import Waveform from "./canvas";
import TopBar from "./top-bar";
import FrequencyLimitControls from "./freq-limit-ctrls";
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
}));

const App = () => {

  const classes = useStyles();

  const initFreq = 440;

  const [oscType, setOscType] = useState(DEFAULT_OSC_TYPE);
  const [freq, setFreq] = useState(initFreq);
  const [freqRange, setFreqRange] = useState(TOTAL_FREQ_RANGE);
  const [hasAudio, setHasAudio] = useState(false);

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

  return (
    <Box>
      <TopBar { ...{ hasAudio, oscType, handleHasAudio, handleChangeOscType } }/>
      <Box className={classes.ctrls}>
        <FrequencyLimitControls { ...{ freqRange, setFreqRange } }/>
        <Typography color="textSecondary" align="center">{`${freq || initFreq} Hz`}</Typography>
      </Box>
      <div id="toolbar">
        <label htmlFor="freq">Frequency:</label>
        <input id="freq" type="number" value={freq} min={350} max={1050} onChange={handleChangeFreq}></input>
      </div>
      <Waveform { ...{ hasAudio } }/>
    </Box>
  )
}

export default App; 
