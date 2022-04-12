import React, { useLayoutEffect, useRef } from "react";
//import "./style.css";

import { Typography, Grid, Slider, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { TOTAL_FREQ_RANGE } from "./constants";


const useStyles = makeStyles((theme) => ({
  grid: {
    marginTop: "16px",
    fontStyle: "italic"
  },
  slider: {
    paddingTop: 16,
    paddingBottom: 16
  }
}));

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
  const sliderRef = useRef();
  const classes = useStyles();
  const { freqRange, setFreqRange, setFreq } = props;
  const range = freqRange.map(freq => freqToSliderVal(freq, TOTAL_FREQ_RANGE));
  /*
  const handleChange = (e, vals) => {
    let newFreqRange = vals.map(val => sliderValToFreq(val, TOTAL_FREQ_RANGE));
    setFreqRange(newFreqRange);
  }
  */

  const getActiveSliderThumb = () => {
    const activeThumb = sliderRef.current.querySelector(".MuiSlider-thumb.MuiSlider-active");
    if (activeThumb) {
      const thumbIndex = activeThumb.getAttribute("data-index");
      return thumbIndex;
    }
  }

  const minDistance = 1;

  const handleSelectOnChange = (newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      return [Math.min(newValue[0], range[1] - minDistance), range[1], range[2]];
    } else if (activeThumb === 2) {
      return [range[0], range[1], Math.max(newValue[2], range[1] + minDistance)];
    } else {
      return [
        range[0],
        (newValue[1] > range[0] || newValue[1] < range[2]) ? newValue[1] : range[1],
        range[2]
      ]
    }
  };

  const handleChange = (e, vals) => {
    let activeThumb = getActiveSliderThumb();
    if (activeThumb) {
      activeThumb = parseInt(activeThumb);
      let newVals = handleSelectOnChange(vals, activeThumb);
      newVals = newVals.map(val => sliderValToFreq(val, TOTAL_FREQ_RANGE));
      setFreqRange(newVals);
      activeThumb === 1 && setFreq(newVals[1]);
    }
  }

  return (
    <Grid container className={classes.grid} direction="column" justify="center" alignItems="center">
      <Typography color="textSecondary">Drag sliders to adjust range (Hz)...</Typography>
      <Slider
        className={classes.slider}
        id="freq-range-selector"
        ValueLabelComponent={ValueLabelComponent}
        value={ [ ...range ] }
        onChange={handleChange}
        step={1}
        valueLabelDisplay="auto"
        valueLabelFormat={(x)=>`${sliderValToFreq(x, TOTAL_FREQ_RANGE)}Hz`}
        ref={sliderRef}
      />
    </Grid>
  )
}

export default FrequencyLimitControls;