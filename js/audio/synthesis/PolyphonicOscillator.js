import { midiToFreq } from '../utils/scales.js';

export class PolyphonicOscillator {
  constructor(audioContext, maxVoices = 8) {
    this.audioContext = audioContext;
    this.maxVoices = maxVoices;
    this.voices = [];
    this.oscillatorTypes = ['sine', 'sawtooth', 'square', 'triangle'];
    this.type = 'sine';
    this.detune = 0;
    this.output = audioContext.createGain();
  }

  playNote(midiNote, velocity = 1) {
    let voice = this.voices.find(v => !v.active);
    if (!voice && this.voices.length < this.maxVoices) {
      voice = this._createVoice();
      this.voices.push(voice);
    } else if (!voice) {
      voice = this.voices.reduce((oldest, v) =>
        !oldest || (v.startTime < oldest.startTime) ? v : oldest, null);
    }
    if (voice) this._triggerVoice(voice, midiNote, velocity);
  }

  stopNote(midiNote) {
    const voice = this.voices.find(v => v.note === midiNote && v.active);
    if (voice) this._stopVoice(voice);
  }

  stopAll() {
    this.voices.forEach(voice => this._stopVoice(voice));
  }

  setType(type) {
    if (this.oscillatorTypes.includes(type)) {
      this.type = type;
      this.voices.forEach(voice => {
        if (voice.oscillator) voice.oscillator.type = type;
      });
    }
  }

  setDetune(detune) {
    this.detune = detune;
    this.voices.forEach(voice => {
      if (voice.oscillator) voice.oscillator.detune.value = detune;
    });
  }

  _createVoice() {
    const oscillator = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    oscillator.connect(gain);
    gain.connect(this.output);
    oscillator.type = this.type;
    oscillator.detune.value = this.detune;
    return {
      oscillator,
      gain,
      active: false,
      note: null,
      startTime: 0
    };
  }

  _triggerVoice(voice, midiNote, velocity) {
    const now = this.audioContext.currentTime;
    const freq = midiToFreq(midiNote);
    voice.oscillator.frequency.setValueAtTime(freq, now);
    voice.gain.gain.setValueAtTime(velocity, now);
    voice.oscillator.start(now);
    voice.active = true;
    voice.note = midiNote;
    voice.startTime = now;
  }

  _stopVoice(voice) {
    const now = this.audioContext.currentTime;
    voice.gain.gain.cancelScheduledValues(now);
    voice.gain.gain.setValueAtTime(voice.gain.gain.value, now);
    voice.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    voice.oscillator.stop(now + 0.1);
    voice.active = false;
    voice.note = null;
  }

  getOutput() { return this.output; }
}