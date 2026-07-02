export class GranularSynth {
  constructor(audioContext, buffer = null, grainSize = 0.1, grainSpacing = 0.05) {
    this.audioContext = audioContext;
    this.buffer = buffer;
    this.grainSize = grainSize;
    this.grainSpacing = grainSpacing;
    this.grains = [];
    this.maxGrains = 20;
    this.output = audioContext.createGain();
    this._initGrains();
  }

  _initGrains() {
    for (let i = 0; i < this.maxGrains; i++) {
      this._createGrain();
    }
  }

  _createGrain() {
    const grainEnv = this.audioContext.createGain();
    grainEnv.gain.value = 0;
    const grainBuffer = this.audioContext.createBufferSource();
    grainBuffer.buffer = this.buffer;
    grainBuffer.connect(grainEnv);
    grainEnv.connect(this.output);
    return { source: grainBuffer, env: grainEnv, active: false };
  }

  setBuffer(buffer) {
    this.buffer = buffer;
    this.grains.forEach(grain => { grain.source.buffer = buffer; });
  }

  setGrainSize(size) { this.grainSize = size; }
  setGrainSpacing(spacing) { this.grainSpacing = spacing; }

  start() {
    if (!this.buffer) return;
    let nextGrainTime = this.audioContext.currentTime;
    const scheduleGrain = () => {
      const now = this.audioContext.currentTime;
      if (nextGrainTime < now) nextGrainTime = now;
      const grain = this.grains.find(g => !g.active);
      if (grain) {
        const startTime = nextGrainTime;
        const endTime = startTime + this.grainSize;
        const startOffset = Math.random() * (this.buffer.duration - this.grainSize);
        grain.source.start(startTime, startOffset, this.grainSize);
        grain.env.gain.setValueAtTime(0, startTime);
        grain.env.gain.linearRampToValueAtTime(1, startTime + 0.01);
        grain.env.gain.linearRampToValueAtTime(0, endTime);
        grain.source.stop(endTime);
        grain.active = true;
        nextGrainTime += this.grainSpacing;
        if (nextGrainTime < this.audioContext.currentTime + 2) {
          setTimeout(scheduleGrain, (nextGrainTime - this.audioContext.currentTime) * 1000);
        }
        setTimeout(() => { grain.active = false; }, (endTime - startTime) * 1000);
      } else {
        setTimeout(scheduleGrain, this.grainSpacing * 1000);
      }
    };
    scheduleGrain();
  }

  stop() {
    this.grains.forEach(grain => {
      grain.source.stop();
      grain.active = false;
    });
  }

  stopAll() { this.stop(); }
  playNote() { this.start(); }
  getOutput() { return this.output; }
}