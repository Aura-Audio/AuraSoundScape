import { AudioEngine, audioContext } from './audio/AudioEngine.js';

const audioEngine = new AudioEngine(audioContext);
await audioEngine.init();
audioEngine.addLayer();

// Virtual Keyboard
document.addEventListener('keydown', (e) => {
  const keyToNote = {
    'a': 60, 'w': 61, 's': 62, 'e': 63, 'd': 64, 'f': 65, 't': 66, 'g': 67,
    'y': 68, 'h': 69, 'u': 70, 'j': 71, 'k': 72, 'o': 73, 'l': 74, 'p': 75,
  };
  if (keyToNote[e.key]) {
    audioEngine.playNote(keyToNote[e.key]);
  }
});

document.addEventListener('keyup', (e) => {
  const keyToNote = {
    'a': 60, 'w': 61, 's': 62, 'e': 63, 'd': 64, 'f': 65, 't': 66, 'g': 67,
    'y': 68, 'h': 69, 'u': 70, 'j': 71, 'k': 72, 'o': 73, 'l': 74, 'p': 75,
  };
  if (keyToNote[e.key]) {
    audioEngine.stopNote(keyToNote[e.key]);
  }
});

// Arpeggiator
document.getElementById('arpeggiator-start').addEventListener('click', () => {
  audioEngine.getArpeggiator().start();
});
document.getElementById('arpeggiator-stop').addEventListener('click', () => {
  audioEngine.getArpeggiator().stop();
});

// Sequencer
document.getElementById('sequencer-start').addEventListener('click', () => {
  audioEngine.getSequencer().start();
});
document.getElementById('sequencer-stop').addEventListener('click', () => {
  audioEngine.getSequencer().stop();
});

// Visualizer
const visualizer = document.getElementById('visualizer');
const visualizerCtx = visualizer.getContext('2d');
const analyser = audioContext.createAnalyser();
audioEngine.master.connect(analyser);
analyser.fftSize = 256;

function draw() {
  requestAnimationFrame(draw);
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyser.getByteFrequencyData(dataArray);

  visualizerCtx.fillStyle = 'rgb(0, 0, 0)';
  visualizerCtx.fillRect(0, 0, visualizer.width, visualizer.height);

  const barWidth = (visualizer.width / bufferLength) * 2.5;
  let x = 0;
  for (let i = 0; i < bufferLength; i++) {
    const barHeight = (dataArray[i] / 255) * visualizer.height;
    visualizerCtx.fillStyle = `rgb(${dataArray[i]}, ${dataArray[i] * 0.7}, ${dataArray[i] * 0.3})`;
    visualizerCtx.fillRect(x, visualizer.height - barHeight, barWidth, barHeight);
    x += barWidth + 1;
  }
}
draw();

// Virtual Keyboard
document.getElementById('virtual-keyboard').innerHTML =
  ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
    .map(note => `<div class="key" data-note="${note}">${note}</div>`)
    .join('');

document.querySelectorAll('.key').forEach(key => {
  const noteIndex = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].indexOf(key.textContent);
  const midiNote = noteIndex + 60;
  key.addEventListener('mousedown', () => audioEngine.playNote(midiNote));
  key.addEventListener('mouseup', () => audioEngine.stopNote(midiNote));
});