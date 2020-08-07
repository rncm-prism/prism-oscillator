import React from "react";
import "./style.css";

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import RefreshIcon from '@material-ui/icons/Refresh';

const useStyles = makeStyles((theme) => ({
  // mainContent here refers to the main panel.
  mainContent: {
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 50,
    paddingLeft: 0
  },
  PlaybackBar: {
    top: 'auto',
    bottom: 0,
    backgroundColor: "white",
    boxShadow: "none"
  },
  grow: {
    flexGrow: 1,
  },
  playButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: "8%",
    margin: '0 auto',
    backgroundColor:"orange"
  },
  refreshButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: "8%",
    right: 0,
    margin: '0 auto',
    backgroundColor:"orange"
  }
}));

const PlaybackBar = (props) => {
  const classes = useStyles();
  const { toggleAudio, refresh } = props
  return (
    <AppBar position="fixed" className={classes.PlaybackBar}>
      <Toolbar>
        <Fab color="secondary" aria-label="play" className={classes.playButton} onClick={toggleAudio}>
          <PlayArrowIcon />
        </Fab>
        <Fab color="secondary" aria-label="refresh" className={classes.refreshButton} onClick={refresh}>
          <RefreshIcon />
        </Fab>
      </Toolbar>
    </AppBar>
  )
}

  export default PlaybackBar;