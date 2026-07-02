export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function lerp(start, end, t) {
  return start + (end - start) * t;
}

export function dbToGain(db) {
  return Math.pow(10, db / 20);
}

export function gainToDb(gain) {
  return 20 * Math.log10(gain);
}

export function freqToMidi(freq, tuningA4 = 440) {
  return 69 + 12 * Math.log2(freq / tuningA4);
}

export function formatNote(midiNote) {
  const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const noteIndex = midiNote % 12;
  const octave = Math.floor(midiNote / 12) - 1;
  return NOTE_NAMES[noteIndex] + octave;
}