function Sine(freq=440, gain=0.6) {
  const audioCtx = new AudioContext();
  const osc = audioCtx.createOscillator();
  osc.frequency.value = freq;

  const masterGain = audioCtx.createGain();
  const analyser = audioCtx.createAnalyser();

  osc.connect(analyser);
  analyser.connect(masterGain);

  masterGain.gain.value = gain;

  osc.start();

  let hasAudio = false; 

  return {

    toggleAudio: () => {
      if (!!hasAudio) {
        masterGain.disconnect();
      } else {
          masterGain.connect(audioCtx.destination);
      }
      hasAudio = !hasAudio;
    },
    
    kill: () => {
      osc.stop(audioCtx.currentTime + 0.5);
    },
    
    update: (freq) => {
      osc.frequency.value = freq;
    },
    
    getWaveform: () => {
      const waveform = new Float32Array(analyser.frequencyBinCount);
      analyser.getFloatTimeDomainData(waveform);
      return waveform;
    }

  };

}

export { Sine }