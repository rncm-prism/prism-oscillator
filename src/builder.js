import React, { useState, useLayoutEffect, useRef } from "react";
import "./style.css";

import { Grid, IconButton, Typography, Slider, Tooltip } from '@material-ui/core';
import { Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DialogComponent from './dialog-component';
import Canvas from "./canvas";

import { OSC_TYPES, DEFAULT_OSC_TYPE } from "./constants";


const useStyles = makeStyles((theme) => ({}));

const Controls = (props) => {
  return (
    <div></div>
  );
}

const OscillatorGrid = (props) => {
  const items = oscillators.map(osc => {
    return <Canvas></Canvas>;
  });
  return (
  <Grid>{ items }</Grid>
  );
}

const Builder = (props) => {
  let { isOpen, handleClose, handleSave } = props;
  const classes = useStyles();
  const buttons = [
    <Button onClick={handleClose}>Close</Button>,
    <Button onClick={handleSave}>Save</Button>
  ];
  return (
    <DialogComponent title="Oscillator Builder" isOpen={isOpen} handleClose={handleClose} buttons={buttons}>
      <Grid>
        <Controls />
        <OscillatorGrid />
      </Grid>
    </DialogComponent>
  );
};

export default Builder;