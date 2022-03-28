import React, { useLayoutEffect, useRef } from "react";
import { osc } from "./oscillator";


const Waveform = ({ hasAudio }) => {
  const canvasRef = useRef();
  const requestRef = useRef();

  const drawCentreLine = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const w = canvas.width
    const h = canvas.height
    ctx.lineWidth = 0.25;
    ctx.beginPath();
    ctx.moveTo(0, h/2);
    ctx.lineTo(w, h/2);
    ctx.stroke();
    ctx.closePath();
  }

  const drawWaveform = () => {
    requestRef.current = requestAnimationFrame(drawWaveform);

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
  
    ctx.clearRect(0, 0, w, h);

    drawCentreLine();
  
    const waveform = osc.getWaveform();
  
    ctx.lineWidth = w / 300; //1;
    ctx.strokeStyle = '#5661FA';
    ctx.beginPath();
  
    const sc =  w / waveform.length;
    
    for (let i = 0; i < waveform.length; i++) {
      const x = i * sc;
      const y = ( 0.5 + (waveform[i] / 2) ) * h;
      if (i == 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (hasAudio) {
      requestRef.current = requestAnimationFrame(drawWaveform);
    }
    else {
      cancelAnimationFrame(requestRef.current);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [hasAudio])

  return (
    <canvas id="canvas" ref={canvasRef} style={ { width: "100%", height: "100%" } }/>
  )
}
  
export default Waveform;
