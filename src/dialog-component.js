import React from "react";
import "./style.css";

import { Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';


const DialogComponent = (props) => {
  const { title, fullWidth=true, maxWidth='xs', isOpen=false, handleClose, children, buttons } = props;
  return (
    <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={isOpen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      { buttons && <DialogActions>{buttons}</DialogActions> }
    </Dialog>
  );
}

export default DialogComponent;