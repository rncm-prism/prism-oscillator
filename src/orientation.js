import { useState, useEffect } from "react";


const portraitTypes = ["portrait", "portrait-primary", "portrait-secondary"];

const isPortrait = (orientation) => {
  return portraitTypes.indexOf(orientation) > 0;
};

const useScreenOrientationOLD = () => {
  const [orientation, setOrientation] = useState(window.screen.orientation.type);

  useEffect(() => {
    const handleOrientationChange = () => setOrientation(window.screen.orientation.type);
    window.addEventListener('orientationchange', handleOrientationChange);
    return () => window.removeEventListener('orientationchange', handleOrientationChange);
  }, []);

  return orientation;
}

// The version below uses matchMedia, since window.screen.orientation doesn't work on Safari.
// See https://stackoverflow.com/a/44709318/795131

const getWindowOrientation = () => {
  const mq = window.matchMedia("(orientation: portrait)");
  return (mq.matches ? "portrait" : "landscape");
}

const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState(getWindowOrientation());
  
  useEffect(() => {
    const handleOrientationChange = () => setOrientation(getWindowOrientation());
    window.addEventListener('orientationchange', handleOrientationChange);
    return () => window.removeEventListener('orientationchange', handleOrientationChange);
  }, []);
  
  return orientation;
}

export { useScreenOrientation, isPortrait };