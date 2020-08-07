import React, { useState } from "react";
import "./style.css";

import { Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DialogComponent from './dialog-component';

import { DEFAULT_OSC_TYPE } from "./constants";


const useStyles = makeStyles((theme) => ({
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
}));

const OscillatorTypeSettings = (props) => {
  const { value='sine', handleChange } = props;
  const classes = useStyles();
  return (
    <form className={classes.form} noValidate>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="osc-type-select">Oscillator Type</InputLabel>
        <Select name='osc-type-select' autoFocus value={value} onChange={handleChange}>
          <MenuItem value="sine">Sine</MenuItem>
          <MenuItem value="square">Square</MenuItem>
          <MenuItem value="triangle">Triangle</MenuItem>
          <MenuItem value="sawtooth">Sawtooth</MenuItem>
        </Select>
      </FormControl>
    </form>
  )
}

const SettingsDialog = (props) => {
  let { isOpen, handleClose, handleChangeOscType } = props;
  const initOscType = localStorage.getItem('oscType') || DEFAULT_OSC_TYPE;
  const [oscType, setOscType] = useState(initOscType);
  const handleApply = () => {
    handleChangeOscType(oscType);
    handleClose();
  }
  const buttons = [
    <Button onClick={handleClose}>Close</Button>,
    <Button onClick={handleApply}>Apply</Button>
  ];
  return (
    <DialogComponent title="Settings" isOpen={isOpen} handleClose={handleClose} buttons={buttons}>
      <OscillatorTypeSettings value={oscType} handleChange={(e) => setOscType(e.target.value)}/>
    </DialogComponent>
  );
}

export default SettingsDialog;