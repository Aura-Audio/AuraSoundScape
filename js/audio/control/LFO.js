export class LFO {
  constructor(audioContext, target, parameter, depth = 1, rate = 1) {
    this.audioContext = audioContext;
    this.target = target;
    this.parameter = parameter;
    this.depth = depth;
    this.rate = rate;
    this.waveform = 'sine';
    this.oscillator = audioContext.createOscillator();
    this.gain = audioContext.createGain();
    this.output = audioContext.createGain();
    this.oscillator.connect(this.gain);
    this.gain.connect(this.output);
    this.oscillator.type = this.waveform;
    this.oscillator.frequency.value = this.rate;
    this.gain.gain.value = this.depth;
    this.output.connect(this.target[this.parameter]);
    this.oscillator.start();
  }

  setWaveform(waveform) {
    if (['sine', 'sawtooth', 'square', 'triangle'].includes(waveform)) {
      this.waveform = waveform;
      this.oscillator.type = waveform;
    }
  }

  setRate(rate) {
    this.rate = rate;
    this.oscillator.frequency.value = rate;
  }

  setDepth(depth) {
    this.depth = depth;
    this.gain.gain.value = depth;
  }

  start() { this.oscillator.start(); }
  stop() { this.oscillator.stop(); }
  getOutput() { return this.output; }
}