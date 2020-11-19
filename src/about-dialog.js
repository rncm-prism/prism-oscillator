import React from "react";
import "./style.css";

import { Button, DialogContentText, Link } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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

const AboutDialog = (props) => {
  const { isOpen, handleClose } = props;
  const classes = useStyles();
  const buttons = [ <Button onClick={handleClose}>Close</Button> ];
  const theme = useTheme();
  const cmLink = <Link color='secondary' href="https://www.rncm.ac.uk/people/christopher-melen/">Dr Christopher Melen</Link>;
  const prismLink = <Link color='secondary' href="https://www.rncm.ac.uk/research/research-centres-rncm/prism/">PRiSM</Link>;
  const ninaLink = <Link color='secondary' href="http://ninawhiteman.com/">Dr Nina Whiteman</Link>
  return (
    <DialogComponent title="About" isOpen={isOpen} handleClose={handleClose} buttons={buttons}>
      <img src={ theme.custom.logo } className={classes.logo}/>
      <DialogContentText className={classes.textContent}>
        <p>Designed and developed by {cmLink} of {prismLink}, from an original concept by composer {ninaLink}.</p>
        <p>With thanks to the PRiSM team, and Dr Nina Whiteman.</p>
      </DialogContentText>
    </DialogComponent>
  );
}

export default AboutDialog;