import React from "react";
//import "./style.css";

import { Link } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DialogComponent from './dialog-component';

const useStyles = makeStyles((theme) => ({
  logo: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    //width: "100%", //236,
    maxWidth: "100%" //236
  },
  textContent: {
    marginTop: 24,
    fontSize: "1rem"
  },
}));

const AboutDialog = (props) => {
  const { isOpen, handleClose } = props;
  const classes = useStyles();
  const theme = useTheme();
  const cmLink = <Link color='secondary' href="https://www.rncm.ac.uk/people/christopher-melen/">Dr Christopher Melen</Link>;
  const prismLink = <Link color='secondary' href="https://www.rncm.ac.uk/research/research-centres-rncm/prism/">PRiSM</Link>;
  const ninaLink = <Link color='secondary' href="http://ninawhiteman.com/">Dr Nina Whiteman</Link>
  return (
    <DialogComponent title="About" fullScreen={true} fullWidth={false} isOpen={isOpen} handleClose={handleClose}>
      <img src={ theme.custom.logo } className={classes.logo}/>
      <div className={classes.textContent} align={"center"}>
        <p>Designed and developed by {cmLink} of {prismLink}, from an original concept by composer {ninaLink}.</p>
        <p>With thanks to the PRiSM team, and Dr Nina Whiteman.</p>
      </div>
    </DialogComponent>
  );
}

export default AboutDialog;