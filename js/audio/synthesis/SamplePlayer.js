export class SamplePlayer {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.samples = new Map();
    this.players = [];
    this.maxVoices = 8;
    this.output = audioContext.createGain();
  }

  async loadSample(name, source) {
    if (typeof source === 'string') {
      try {
        const response = await fetch(source);
        const arrayBuffer = await response.arrayBuffer();
        this.samples.set(name, await this.audioContext.decodeAudioData(arrayBuffer));
      } catch (err) { console.error('Error loading sample:', err); }
    } else {
      const arrayBuffer = await source.arrayBuffer();
      this.samples.set(name, await this.audioContext.decodeAudioData(arrayBuffer));
    }
  }

  playNote(midiNote, velocity = 1) {
    const buffer = this.samples.values().next().value;
    if (!buffer) return;
    let player = this.players.find(p => !p.active);
    if (!player && this.players.length < this.maxVoices) {
      player = {
        source: this.audioContext.createBufferSource(),
        gain: this.audioContext.createGain(),
        active: false
      };
      player.source.connect(player.gain);
      player.gain.connect(this.output);
      this.players.push(player);
    } else if (!player) {
      player = this.players.reduce((oldest, p) =>
        !oldest || (p.startTime < oldest.startTime) ? p : oldest, null);
    }
    if (player) {
      const now = this.audioContext.currentTime;
      player.source.buffer = buffer;
      const freq = 440 * Math.pow(2, (midiNote - 69) / 12);
      player.source.playbackRate.value = freq / 440;
      player.gain.gain.setValueAtTime(velocity, now);
      player.source.start(now);
      player.active = true;
      player.startTime = now;
      player.source.onended = () => { player.active = false; };
    }
  }

  stopAll() {
    const now = this.audioContext.currentTime;
    this.players.forEach(player => {
      if (player.active) {
        player.source.stop(now);
        player.active = false;
      }
    });
  }

  getOutput() { return this.output; }
}