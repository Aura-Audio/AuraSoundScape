export class AudioInput {
  constructor(audioContext) {
    this.audioContext = audioContext;
    this.stream = null;
    this.source = null;
    this.output = audioContext.createGain();
    this.analyser = audioContext.createAnalyser();
    this.analyser.fftSize = 256;
  }

  async start(constraints = { audio: true }) {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.source = this.audioContext.createMediaStreamSource(this.stream);
      this.source.connect(this.output);
      this.source.connect(this.analyser);
      return true;
    } catch (err) { return false; }
  }

  stop() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
  }

  getAnalyser() { return this.analyser; }
  getOutput() { return this.output; }
}