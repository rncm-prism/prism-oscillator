import React from "react";
import "./style.css";

import { Link, Box, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DialogComponent from './dialog-component';
import { isPortrait } from "./orientation";

const useStyles = makeStyles((theme) => ({
  logoPortrait: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    //width: "100%", //236,
    maxWidth: "100%" //236
  },
  logoLandscape: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "50%"
  },
  textContent: {
    marginTop: 24,
    fontSize: "1rem"
  },
}));

const AboutDialog = (props) => {
  const { isOpen, handleClose, orientation } = props;
  const classes = useStyles();
  const theme = useTheme();
  const cmLink = <Link color='secondary' href="https://www.rncm.ac.uk/people/christopher-melen/">Dr Christopher Melen</Link>;
  const prismLink = <Link color='secondary' href="https://www.rncm.ac.uk/research/research-centres-rncm/prism/">PRiSM</Link>;
  const ninaLink = <Link color='secondary' href="http://ninawhiteman.com/">Dr Nina Whiteman</Link>
  const TextContent = () => {
    return (
      <div className={classes.textContent} align={"center"}>
        <p>Designed and developed by {cmLink} of {prismLink}, from an original concept by composer {ninaLink}.</p>
        <p>With thanks to the PRiSM team, and Dr Nina Whiteman.</p>
      </div>
    );
  };
  return (
    <DialogComponent title="About" fullScreen={true} fullWidth={false} isOpen={isOpen} handleClose={handleClose}>
      { isPortrait(orientation) ?
        <Box>
          <img src={ theme.custom.logo } className={classes.logoPortrait}/>
          <TextContent />
        </Box> :
        <Grid container direction="row">
          <img src={ theme.custom.logo } className={classes.logoLandscape}/>
          <TextContent />
        </Grid>
      }
    </DialogComponent>
  );
}

export default AboutDialog;