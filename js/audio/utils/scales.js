export const SCALES = {
  MAJOR: [0, 2, 4, 5, 7, 9, 11, 12],
  MINOR: [0, 2, 3, 5, 7, 8, 10, 12],
  PENTATONIC: [0, 2, 4, 7, 9, 12],
  CHROMATIC: Array.from({ length: 12 }, (_, i) => i),
  MICROTONAL_31TET: Array.from({ length: 31 }, (_, i) => i * (12 / 31)),
};

export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function midiToFreq(midiNote, tuningA4 = 440) {
  return tuningA4 * Math.pow(2, (midiNote - 69) / 12);
}

export function snapToScale(midiNote, scale, rootNote = 60) {
  const scaleNotes = scale.map(interval => rootNote + interval);
  let closestNote = scaleNotes[0];
  let minDistance = Math.abs(midiNote - closestNote);
  for (const note of scaleNotes) {
    const distance = Math.abs(midiNote - note);
    if (distance < minDistance) {
      minDistance = distance;
      closestNote = note;
    }
  }
  return closestNote;
}

export function generateChord(rootNote, chordType) {
  const CHORD_FORMULAS = {
    major: [0, 4, 7],
    minor: [0, 3, 7],
    '7th': [0, 4, 7, 10],
    minor7th: [0, 3, 7, 10],
    suspended: [0, 5, 7],
    diminished: [0, 3, 6],
    augmented: [0, 4, 8],
  };
  const formula = CHORD_FORMULAS[chordType] || [0, 4, 7];
  return formula.map(interval => rootNote + interval);
}