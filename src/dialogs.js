import React, { useState } from "react";
import "./style.css";

import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';


const DialogComponent = (props) => {
  const { title, isOpen, handleClose, children, buttons } = props;
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      { buttons && <DialogActions>{buttons}</DialogActions> }
    </Dialog>
  );
}

const AboutDialog = (props) => {
  let { isOpen, handleClose } = props;
  const buttons = [ <Button onClick={handleClose}>Close</Button> ];
  return (
    <DialogComponent title="About" isOpen={isOpen} handleClose={handleClose} buttons={buttons}>
      <DialogContentText>
        Designed and developed by Dr Christopher Melen of PRiSM. With thanks to the PRiSM team, and Dr Nina Whiteman.
      </DialogContentText>
    </DialogComponent>
  );
}

export { AboutDialog };