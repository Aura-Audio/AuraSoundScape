import { PolyphonicOscillator } from './synthesis/PolyphonicOscillator.js';
import { FMSynth } from './synthesis/FMSynth.js';
import { GranularSynth } from './synthesis/GranularSynth.js';
import { WavetableSynth } from './synthesis/WavetableSynth.js';
import { SamplePlayer } from './synthesis/SamplePlayer.js';
import { MIDIHandler } from './control/MIDIHandler.js';
import { Arpeggiator } from './control/Arpeggiator.js';
import { Sequencer } from './control/Sequencer.js';

export class AudioEngine {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.layers = [];
    this.master = audioContext.createGain();
    this.master.gain.value = 0.7;
    this.master.connect(audioContext.destination);

    this.synthTypes = {
      polyphonic: new PolyphonicOscillator(audioContext),
      fm: new FMSynth(audioContext),
      granular: new GranularSynth(audioContext),
      wavetable: new WavetableSynth(audioContext),
      sample: new SamplePlayer(audioContext),
    };

    Object.values(this.synthTypes).forEach(synth => synth.getOutput().connect(this.master));

    this.midiHandler = new MIDIHandler(this);
    this.arpeggiator = new Arpeggiator(audioContext, this);
    this.sequencer = new Sequencer(audioContext, this);
    this.currentSynthType = 'polyphonic';
    this.currentLayerIndex = 0;
  }

  async init() {
    await this.midiHandler.init();
  }

  addLayer() {
    const layer = {
      synthType: this.currentSynthType,
      synth: this.synthTypes[this.currentSynthType],
      volume: 0.8,
      pan: 0.5,
    };
    this.layers.push(layer);
    this.currentLayerIndex = this.layers.length - 1;
    return layer;
  }

  setCurrentLayer(index) {
    if (index >= 0 && index < this.layers.length) {
      this.currentLayerIndex = index;
    }
  }

  getCurrentLayer() {
    return this.layers[this.currentLayerIndex];
  }

  setSynthType(type) {
    if (this.synthTypes[type]) {
      this.currentSynthType = type;
      const layer = this.getCurrentLayer();
      if (layer) layer.synthType = type;
    }
  }

  playNote(midiNote, velocity = 1) {
    const layer = this.getCurrentLayer();
    if (!layer) return;
    layer.synth.playNote(midiNote, velocity);
  }

  stopNote(midiNote) {
    const layer = this.getCurrentLayer();
    if (!layer) return;
    layer.synth.stopNote(midiNote);
  }

  stopAll() {
    const layer = this.getCurrentLayer();
    if (layer) layer.synth.stopAll();
  }

  getArpeggiator() { return this.arpeggiator; }
  getSequencer() { return this.sequencer; }
  getMIDIHandler() { return this.midiHandler; }
}

export const audioContext = new (window.AudioContext || window.webkitAudioContext)();