import React from "react";
import "./style.css";

import { Typography, Grid, Slider, Tooltip } from '@material-ui/core';

import { TOTAL_FREQ_RANGE } from "./constants";


const ValueLabelComponent = (props) => {
  const { children, open, value } = props;
  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const sliderValToFreq = (val, range) => {
  const [ bottomFreq, topFreq ] = range;
  const freqRange = topFreq-bottomFreq;
  return val * (freqRange/100) + bottomFreq;
}
  
const freqToSliderVal = (freq, range) => {
  const [ bottomFreq, topFreq ] = range;
  const freqRange = topFreq-bottomFreq;
  return (freq-bottomFreq)/freqRange * 100;
}

const FrequencyLimitControls = (props) => {
  const { freqRange, setFreqRange } = props;
  const range = freqRange.map(freq => freqToSliderVal(freq, TOTAL_FREQ_RANGE));
  const handleChange = (e, vals) => {
    let newFreqRange = vals.map(val => sliderValToFreq(val, TOTAL_FREQ_RANGE));
    setFreqRange(newFreqRange);
  }

  const style = { marginTop: "18px", fontStyle: "italic" }

  return (
    <Grid container direction="column" justify="center" alignItems="center" style={style}>
      <Typography color="textSecondary">Adjust sliders to set frequency range...</Typography>
      <Slider
        id="freq-range-selector"
        ValueLabelComponent={ValueLabelComponent}
        value={ [ ...range ] }
        onChange={handleChange}
        step={0.5}
        valueLabelDisplay="auto"
        valueLabelFormat={(x)=>`${sliderValToFreq(x, TOTAL_FREQ_RANGE)}Hz`}
      />
    </Grid>
  )
}

export default FrequencyLimitControls;