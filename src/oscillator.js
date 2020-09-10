import * as Tone from "tone";

function Oscillator(type='sine', freq=440, gain=0.6) {
  const osc = new Tone.Oscillator(freq, type)
  const waveform = new Tone.Waveform();

  const vol = new Tone.Volume(-12).toDestination();
  osc.connect(vol).start();
  vol.mute = true;
  osc.connect(waveform);

  let hasAudio = false; 

  return {

    toggleAudio: () => {
      if (!!hasAudio) {
        vol.mute = true;
      } else {
        vol.mute = false;
      }
      hasAudio = !hasAudio;
      return hasAudio;
    },
    
    kill: () => {
      osc.stop("+0.5");
    },
    
    update: (freq) => {
      osc.frequency.value = freq;
    },
    
    getWaveform: () => {
      return waveform.getValue();
    },

    setOscType: (type) => {
      osc.type = type;
    }

  };

}

export { Oscillator }