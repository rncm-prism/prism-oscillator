import React from "react";
import "./style.css";

import { AppBar, Toolbar, IconButton, Dialog, DialogContent, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    //backgroundColor: "transparent",
    boxShadow: "none"
  },
  title: {
    flexGrow: 1
  },
}));


const DialogTitleBar = (props) => {
  const { title, handleClose } = props;
  const theme = useTheme();
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <Typography className={classes.title} variant="h6">{title}</Typography>
        <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

const DialogComponent = (props) => {
  const { title, fullScreen=true, fullWidth=true, maxWidth='xs', isOpen=false, handleClose, children } = props;
  return (
    <Dialog fullScreen={fullScreen} fullWidth={fullWidth} maxWidth={maxWidth} open={isOpen} onClose={handleClose}>
      <DialogTitleBar title={title} handleClose={handleClose} />
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export default DialogComponent;