import React, { useLayoutEffect, useRef } from "react";
import "./style.css";

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  waveform: {
    flex: 1,
    height: "100%",
    width: "100%",
    minWidth: "100%",
    padding: 0
  }
}));

const fitToParent = (elem) => {
  let { parentNode } = elem;
  let styles = getComputedStyle(parentNode);
  let w = parseInt(styles.getPropertyValue("width"), 10);
  let h = parseInt(styles.getPropertyValue("height"), 10);
  canvas.width = w;
  canvas.height = h;
}

const drawCentreLine = (canvas) => {
  const ctx = canvas.getContext("2d");
  const w = canvas.width
  const h = canvas.height
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(0, h/2);
  ctx.lineTo(w, h/2);
  ctx.stroke();
  ctx.closePath();
}

const drawWaveform = (canvas, getWaveform) => {
  requestAnimationFrame(() => drawWaveform(canvas, getWaveform));

  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  drawCentreLine(canvas);

  const waveform = getWaveform();

  ctx.lineWidth = 1.5; //3;
  ctx.strokeStyle= '#5661FA';
  ctx.beginPath();

  const wfScale =  w / waveform.length;

  for(let i = 0; i < waveform.length; i++) {
    const x = i * wfScale;
    const y = ( 0.5 + (waveform[i] / 2) ) * h;
		if (i == 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();
}

const Canvas = ({ freq, getWaveform }) => {

  const classes = useStyles();
  const canvasRef = useRef();

  useLayoutEffect(() => {
    let canvas = canvasRef.current;
    fitToParent(canvas);
  }, [])

  useLayoutEffect(() => {
    let canvas = canvasRef.current;
    drawWaveform(canvas, getWaveform);
  }, [freq])

  return (
    <canvas className={classes.waveform} id="canvas" ref={canvasRef} ></canvas>
  )
}
  
export default Canvas;