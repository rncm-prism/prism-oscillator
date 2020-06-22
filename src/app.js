import React, { useState, useLayoutEffect, useRef } from "react";
import "./style.css";

import { Typography, Container } from '@material-ui/core';

import { Sine } from "./sine";
import TopBar from "./top-bar";
import FrequencyLimitControls from "./freq-limit-ctrls";
import Canvas from "./canvas";

import { TOTAL_FREQ_RANGE } from "./constants";


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
  const initFreq = getRandFreq(freqRange);
  const sineRef = useRef( Sine(initFreq) );

  useLayoutEffect(() => {
    freq && sineRef.current.update(freq);
  }, [freq]);

  const toggleAudio = () => {
    sineRef.current.toggleAudio();
  };

  const refresh = () => {
    let newFreq = getRandFreq(freqRange);
    setFreq(newFreq);
  };

  const getWaveform = () => {
    return sineRef.current.getWaveform();
  };

  return (
    <div id="app">
      <TopBar { ...{ toggleAudio, refresh } }/>
      <Container id="content" style={{padding: "0px"}}>
        <FrequencyLimitControls { ...{ freqRange, setFreqRange } }/>
        <Typography color="textSecondary" align="center">{`${freq || initFreq} Hz`}</Typography>
        <Canvas { ...{ freq, getWaveform } }/>
      </Container>
    </div>
  );
}

export default App;