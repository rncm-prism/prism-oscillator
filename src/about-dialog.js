import React from "react";
import "./style.css";

import { Button, DialogContentText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DialogComponent from './dialog-component';

const useStyles = makeStyles((theme) => ({
  logo: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: 236,
    maxWidth: 236
  },
  textContent: {
    marginTop: 24
  },
}));

const cmLink = <a href="https://www.rncm.ac.uk/people/christopher-melen/">Dr Christopher Melen</a>;
const prismLink = <a href="https://www.rncm.ac.uk/research/research-centres-rncm/prism/">PRiSM</a>;
const ninaLink = <a href="http://ninawhiteman.com/">Dr Nina Whiteman</a>

const AboutDialog = (props) => {
  const { isOpen, handleClose } = props;
  const classes = useStyles();
  const buttons = [ <Button onClick={handleClose}>Close</Button> ];
  return (
    <DialogComponent title="About" isOpen={isOpen} handleClose={handleClose} buttons={buttons}>
      <img src="/PRiSM-Logo-text-01-768x329.png" className={classes.logo}/>
      <DialogContentText className={classes.textContent}>
        <p>Designed and developed by {cmLink} of {prismLink}, from an original concept by composer {ninaLink}.</p>
        <p>With thanks to the PRiSM team, and Dr Nina Whiteman.</p>
      </DialogContentText>
    </DialogComponent>
  );
}

export default AboutDialog;