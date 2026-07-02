export class Sequencer {
  constructor(audioContext, audioEngine, steps = 16) {
    this.audioContext = audioContext;
    this.audioEngine = audioEngine;
    this.steps = steps;
    this.pattern = Array(steps).fill(null).map(() => []);
    this.resolution = 16;
    this.bpm = 120;
    this.swing = 0;
    this.active = false;
    this.currentStep = 0;
    this.intervalId = null;
  }

  setBPM(bpm) {
    this.bpm = bpm;
    this._restart();
  }

  setResolution(resolution) {
    this.resolution = resolution;
    this._restart();
  }

  setSwing(swing) {
    this.swing = Math.max(0, Math.min(100, swing));
  }

  setSteps(steps) {
    this.steps = steps;
    if (steps > this.pattern.length) {
      this.pattern = [...this.pattern, ...Array(steps - this.pattern.length).fill([])];
    } else {
      this.pattern = this.pattern.slice(0, steps);
    }
    this._restart();
  }

  setStep(step, notes) {
    if (step >= 0 && step < this.steps) this.pattern[step] = notes;
  }

  clearStep(step) {
    if (step >= 0 && step < this.steps) this.pattern[step] = [];
  }

  clearAll() {
    this.pattern = Array(this.steps).fill(null).map(() => []);
  }

  start() {
    if (this.active) return;
    this.active = true;
    this.currentStep = 0;
    this._scheduleSteps();
  }

  stop() {
    this.active = false;
    if (this.intervalId) clearInterval(this.intervalId);
    this.audioEngine.stopAll();
  }

  _restart() {
    this.stop();
    if (this.active) this.start();
  }

  _scheduleSteps() {
    const stepDuration = (60 / this.bpm / this.resolution) * 1000;
    this.intervalId = setInterval(() => {
      const notes = this.pattern[this.currentStep];
      if (notes && notes.length > 0) {
        notes.forEach(note => this.audioEngine.playNote(note, 0.8));
      }
      this.currentStep = (this.currentStep + 1) % this.steps;
    }, stepDuration);
  }
}