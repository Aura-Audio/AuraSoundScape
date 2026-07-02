export class FMSynth {
  constructor(audioContext, numOperators = 4) {
    this.audioContext = audioContext;
    this.operators = [];
    this.numOperators = numOperators;
    this.output = audioContext.createGain();
    this._initOperators();
  }

  _initOperators() {
    for (let i = 0; i < this.numOperators; i++) {
      const isCarrier = (i === this.numOperators - 1);
      const oscillator = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      oscillator.connect(gain);

      if (!isCarrier) {
        gain.connect(this.operators[i + 1].oscillator.frequency);
      } else {
        gain.connect(this.output);
      }

      this.operators.push({
        oscillator,
        gain,
        isCarrier,
        ratio: i === 0 ? 1 : (i + 1) * 1.5
      });
    }
    this.carrier = this.operators[this.numOperators - 1];
  }

  setFrequency(freq) {
    this.carrier.oscillator.frequency.value = freq;
    this.operators.forEach(op => {
      if (!op.isCarrier) {
        op.oscillator.frequency.value = freq * op.ratio;
      }
    });
  }

  setModulationIndex(opIndex, index) {
    if (opIndex >= 0 && opIndex < this.operators.length - 1) {
      this.operators[opIndex].gain.gain.value = index;
    }
  }

  setOperatorRatio(opIndex, ratio) {
    if (opIndex >= 0 && opIndex < this.operators.length) {
      this.operators[opIndex].ratio = ratio;
      if (!this.operators[opIndex].isCarrier) {
        this.operators[opIndex].oscillator.frequency.value =
          this.carrier.oscillator.frequency.value * ratio;
      }
    }
  }

  playNote(midiNote, velocity = 1) {
    const freq = 440 * Math.pow(2, (midiNote - 69) / 12);
    this.setFrequency(freq);
    const now = this.audioContext.currentTime;
    this.operators.forEach(op => {
      op.oscillator.start(now);
      op.gain.gain.setValueAtTime(velocity, now);
    });
  }

  stopAll() {
    const now = this.audioContext.currentTime;
    this.operators.forEach(op => {
      op.gain.gain.cancelScheduledValues(now);
      op.gain.gain.setValueAtTime(op.gain.gain.value, now);
      op.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      op.oscillator.stop(now + 0.1);
    });
  }

  getOutput() { return this.output; }
}