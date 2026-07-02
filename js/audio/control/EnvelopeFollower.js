export class EnvelopeFollower {
  constructor(audioContext, inputNode) {
    this.audioContext = audioContext;
    this.inputNode = inputNode;
    this.analyser = audioContext.createAnalyser();
    this.analyser.fftSize = 32;
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    inputNode.connect(this.analyser);
    this.threshold = 0.1;
    this.attack = 0.01;
    this.release = 0.1;
    this.envelope = 0;
    this._update();
  }

  _update() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    let sum = 0;
    for (let i = 0; i < this.dataArray.length; i++) {
      sum += Math.abs(this.dataArray[i] - 128);
    }
    const normalized = (sum / this.dataArray.length) / 128;
    this.envelope = normalized > this.threshold ?
      Math.min(1, this.envelope + this.attack) :
      Math.max(0, this.envelope - this.release);
    requestAnimationFrame(this._update.bind(this));
  }

  setThreshold(t) { this.threshold = t; }
  setAttack(a) { this.attack = a; }
  setRelease(r) { this.release = r; }
  getEnvelope() { return this.envelope; }

  connect(target, parameter) {
    const gain = this.audioContext.createGain();
    gain.gain.value = this.envelope;
    gain.connect(target[parameter]);
    const update = () => {
      gain.gain.value = this.envelope;
      requestAnimationFrame(update);
    };
    update();
  }
}