export class Arpeggiator {
  constructor(audioContext, audioEngine) {
    this.audioContext = audioContext;
    this.audioEngine = audioEngine;
    this.notes = [];
    this.mode = 'up';
    this.octaveRange = 1;
    this.speed = 120;
    this.gate = 0.5;
    this.active = false;
    this.intervalId = null;
    this.currentIndex = 0;
  }

  setMode(mode) {
    if (['up', 'down', 'random', 'upDown'].includes(mode)) this.mode = mode;
  }

  setSpeed(bpm) {
    this.speed = bpm;
    this._restart();
  }

  setGate(gate) {
    this.gate = Math.max(0.01, Math.min(0.99, gate));
  }

  setOctaveRange(octaves) {
    this.octaveRange = Math.max(1, Math.min(4, octaves));
  }

  addNote(midiNote) {
    if (!this.notes.includes(midiNote)) {
      this.notes.push(midiNote);
      this.notes.sort((a, b) => a - b);
      if (this.active) this._restart();
    }
  }

  removeNote(midiNote) {
    this.notes = this.notes.filter(n => n !== midiNote);
    if (this.active) this._restart();
  }

  clearNotes() { this.notes = []; }

  start() {
    if (this.notes.length === 0) return;
    this.active = true;
    this._scheduleNotes();
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

  _scheduleNotes() {
    const interval = (60 / this.speed) * 1000;
    this.intervalId = setInterval(() => {
      if (this.notes.length === 0) return;
      let noteIndex;
      switch (this.mode) {
        case 'up': noteIndex = this.currentIndex % this.notes.length; this.currentIndex++; break;
        case 'down': noteIndex = (this.notes.length - 1 - (this.currentIndex % this.notes.length));
                     this.currentIndex++; break;
        case 'random': noteIndex = Math.floor(Math.random() * this.notes.length); break;
        case 'upDown': noteIndex = this.currentIndex % (this.notes.length * 2);
          if (noteIndex >= this.notes.length) noteIndex = this.notes.length - (noteIndex % this.notes.length) - 1;
          this.currentIndex++; break;
      }
      const baseNote = this.notes[noteIndex];
      const octave = Math.floor(this.currentIndex / this.notes.length) % this.octaveRange;
      this.audioEngine.playNote(baseNote + (octave * 12), 0.8);
      setTimeout(() => this.audioEngine.stopNote(baseNote + (octave * 12)), interval * this.gate);
    }, interval);
  }
}