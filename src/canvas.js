import React, { useEffect, useLayoutEffect, useRef } from "react";
import "./style.css";


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

  ctx.lineWidth = 3;
  ctx.strokeStyle= '#5661FA';
  ctx.beginPath();

  for(let i = 0; i < waveform.length; i++) {
    const x = i;
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

  const style = {paddingTop: "5px", paddingBottom: "5px", marginTop: "10px"};

  const canvasRef = useRef();

  useLayoutEffect(() => {
    let canvas = canvasRef.current;
    fitToParent(canvas);
  }, [])

  useEffect(() => {
    let canvas = canvasRef.current;
    drawWaveform(canvas, getWaveform);
  }, [freq])

  return (
    <canvas id="canvas" ref={canvasRef} style={style}></canvas>
  )
}
  
export default Canvas;