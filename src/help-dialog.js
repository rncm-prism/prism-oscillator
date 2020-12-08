import React from "react";
import "./style.css";

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DialogComponent from './dialog-component';


const useStyles = makeStyles((theme) => ({

}));

const HelpDialog = (props) => {
  const { isOpen, handleClose } = props;
  const classes = useStyles();

  return (
    <DialogComponent title="Help" fullScreen={true} fullWidth={false} isOpen={isOpen} handleClose={handleClose}>
      <ul>
        <li>
          <Typography paragraph>Use the dropdown selector on the toolbar to switch between oscillator types (sine, sawtooth, square or triangle).</Typography>
        </li>
        <li>
          <Typography paragraph>The app is muted by default, use the 'speaker' button to the right of the dropdown to switch audio on.</Typography>
        </li>
        <li>
          <Typography paragraph>Oscillator frequency may be changed using the 'refresh' button on the extreme right of the toolbar. Frequencies are chosen randomly from the inclusive range 350-1050Hz. The current frequency is retained when changing oscillator type.</Typography>
        </li>
        <li>
          <Typography paragraph>Use the 'Theme' controller under in the Settings panel, available under the left hand menu, to switch beteen Dark and Light colour schemes.</Typography>
        </li>
      </ul>
    </DialogComponent>
  );
}

export default HelpDialog;