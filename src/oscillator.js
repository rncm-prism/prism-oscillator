// Workaround for Safari, get it here: https://github.com/mohayonao/get-float-time-domain-data
if (global.AnalyserNode && !global.AnalyserNode.prototype.getFloatTimeDomainData) {
  var uint8 = new Uint8Array(2048);
  global.AnalyserNode.prototype.getFloatTimeDomainData = function(array) {
    this.getByteTimeDomainData(uint8);
    for (var i = 0, imax = array.length; i < imax; i++) {
      array[i] = (uint8[i] - 128) * 0.0078125;
    }
  };
}

function Oscillator(type='sine', freq=440, gain=0.015) {

  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = audioCtx.createOscillator();
  osc.type = type;
  osc.frequency.value = freq;

  const masterGain = audioCtx.createGain();
  const analyser = audioCtx.createAnalyser();

  osc.connect(analyser);
  analyser.connect(masterGain);

  masterGain.gain.value = gain;

  osc.start();

  let waveform = new Float32Array(analyser.frequencyBinCount);
  analyser.getFloatTimeDomainData(waveform);

  return {

    start: () => {
      if (audioCtx.state != 'running') {
        audioCtx.resume();
      }
      masterGain.connect(audioCtx.destination);
    },
    
    stop: () => {
      masterGain.disconnect();
    },
    
    setFreq: (freq) => {
      osc.frequency.value = freq;
    },

    setOscType: (type) => {
      osc.type = type;
    },

    getWaveform: () => {
      analyser.getFloatTimeDomainData(waveform);
      return waveform;
    }

  };

}

export let osc = Oscillator();
