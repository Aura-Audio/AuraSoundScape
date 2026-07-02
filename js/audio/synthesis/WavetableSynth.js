export class WavetableSynth {
  constructor(audioContext, wavetable = null, size = 2048) {
    this.audioContext = audioContext;
    this.size = size;
    this.wavetable = wavetable || this._createDefaultWavetable();
    this.oscillators = [];
    this.maxVoices = 8;
    this.output = audioContext.createGain();
  }

  _createDefaultWavetable() {
    const table = new Float32Array(this.size);
    for (let i = 0; i < this.size; i++) {
      table[i] = Math.sin((i / this.size) * Math.PI * 2);
    }
    return table;
  }

  setWavetable(wavetable) {
    this.wavetable = wavetable;
    this.oscillators.forEach(osc => {
      if (osc.oscillator) osc.oscillator.setPeriodicWave(this._createPeriodicWave());
    });
  }

  _createPeriodicWave() {
    const real = new Float32Array(this.size / 2);
    const imag = new Float32Array(this.size / 2);
    for (let i = 0; i < this.size / 2; i++) {
      real[i] = this.wavetable[i * 2] || 0;
      imag[i] = this.wavetable[i * 2 + 1] || 0;
    }
    return this.audioContext.createPeriodicWave(real, imag);
  }

  playNote(midiNote, velocity = 1) {
    const freq = 440 * Math.pow(2, (midiNote - 69) / 12);
    let oscillator = this.oscillators.find(osc => !osc.active);
    if (!oscillator && this.oscillators.length < this.maxVoices) {
      oscillator = this.audioContext.createOscillator();
      oscillator.setPeriodicWave(this._createPeriodicWave());
      const gain = this.audioContext.createGain();
      oscillator.connect(gain);
      gain.connect(this.output);
      this.oscillators.push({ oscillator, gain, active: false });
    } else if (!oscillator) {
      oscillator = this.oscillators.reduce((oldest, osc) =>
        !oldest || (osc.startTime < oldest.startTime) ? osc : oldest, null);
    }
    if (oscillator) {
      const now = this.audioContext.currentTime;
      oscillator.oscillator.frequency.setValueAtTime(freq, now);
      oscillator.gain.gain.setValueAtTime(velocity, now);
      oscillator.oscillator.start(now);
      oscillator.active = true;
      oscillator.startTime = now;
      oscillator.note = midiNote;
    }
  }

  stopNote(midiNote) {
    const oscillator = this.oscillators.find(osc => osc.note === midiNote && osc.active);
    if (oscillator) {
      const now = this.audioContext.currentTime;
      oscillator.gain.gain.cancelScheduledValues(now);
      oscillator.gain.gain.setValueAtTime(oscillator.gain.gain.value, now);
      oscillator.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      oscillator.oscillator.stop(now + 0.1);
      oscillator.active = false;
    }
  }

  stopAll() {
    const now = this.audioContext.currentTime;
    this.oscillators.forEach(osc => {
      if (osc.active) {
        osc.gain.gain.cancelScheduledValues(now);
        osc.gain.gain.setValueAtTime(osc.gain.gain.value, now);
        osc.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.oscillator.stop(now + 0.1);
        osc.active = false;
      }
    });
  }

  getOutput() { return this.output; }
}