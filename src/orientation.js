import { useState, useEffect } from "react";


const portraitTypes = ["portrait", "portrait-primary", "portrait-secondary"];

const isPortrait = (orientation) => {
  return portraitTypes.indexOf(orientation) > 0;
};

const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState(window.screen.orientation.type);

  useEffect(() => {
    const handleOrientationChange= () => setOrientation(window.screen.orientation.type);
    window.addEventListener('orientationchange', handleOrientationChange);
    return () => window.removeEventListener('orientationchange', handleOrientationChange);
  }, []);

  return orientation;
}

export { useScreenOrientation, isPortrait };