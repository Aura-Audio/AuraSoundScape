import { AudioEngine, audioContext, SCALES, midiToFreq, snapToScale, generateChord } from './audio/AudioEngine.js';

// Initialize audio context and engine
const audioEngine = new AudioEngine(audioContext);
await audioEngine.init();

// Example: Add a layer with polyphonic synth
audioEngine.addLayer();

// Example: Play a note (C4)
audioEngine.playNote(60);

// Example: Enable chord mode (major)
audioEngine.setChordMode('major');
audioEngine.setScale(SCALES.MAJOR);

// Example: Start MIDI
const midiHandler = audioEngine.getMIDIHandler();
await midiHandler.init();

// Example: Use arpeggiator
const arpeggiator = audioEngine.getArpeggiator();
arpeggiator.addNote(60); // C4
arpeggiator.addNote(64); // E4
arpeggiator.addNote(67); // G4
arpeggiator.setMode('up');
arpeggiator.start();

// Example: Use sequencer
const sequencer = audioEngine.getSequencer();
sequencer.setBPM(120);
sequencer.setStep(0, [60]); // C4 on step 0
sequencer.setStep(4, [64]); // E4 on step 4
sequencer.start();
