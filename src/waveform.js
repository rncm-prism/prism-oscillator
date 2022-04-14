import React, { useEffect, useLayoutEffect, useRef } from "react";
import { osc } from "./oscillator";


// https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da
const resizeCanvas = (canvas) => {
  // Get DPI...
  const dpi = window.devicePixelRatio;

  // Get computed width and height...
  const computedStyle = window.getComputedStyle(canvas, null);
  const width = +computedStyle.getPropertyValue('width').slice(0,-2);
  const height = +computedStyle.getPropertyValue('height').slice(0,-2);

  // Set the new width and height attributes.
  canvas.setAttribute('width', width * dpi);
  canvas.setAttribute('height', height * dpi);
}

const Waveform = ({ hasAudio }) => {
  const canvasRef = useRef();
  const requestRef = useRef();
  const renderCnt = useRef(0);

  const drawCentreLine = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const w = canvas.width
    const h = canvas.height
    ctx.lineWidth = 1;
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
  
    if (renderCnt.current >= 7) {

      const waveform = osc.getWaveform();

      ctx.lineWidth = 2.5 //w / 300;
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

    } else {
      renderCnt.current = renderCnt.current + 1;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    resizeCanvas(canvas);
    //window.addEventListener('resize', () => resizeCanvas(canvas));
  },[]);

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
