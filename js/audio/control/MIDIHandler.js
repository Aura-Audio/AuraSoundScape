export class MIDIHandler {
  constructor(audioEngine) {
    this.audioEngine = audioEngine;
    this.midiAccess = null;
    this.inputs = [];
    this.outputs = [];
  }

  async init() {
    if (!navigator.requestMIDIAccess) return false;
    try {
      this.midiAccess = await navigator.requestMIDIAccess();
      this._setupMIDI();
      this.midiAccess.onstatechange = this._handleStateChange.bind(this);
      return true;
    } catch (err) { return false; }
  }

  _setupMIDI() {
    this.inputs = Array.from(this.midiAccess.inputs.values());
    this.outputs = Array.from(this.midiAccess.outputs.values());
    this.inputs.forEach(input => {
      input.onmidimessage = this._handleMIDIMessage.bind(this);
    });
  }

  _handleStateChange(event) {
    if (event.port.state === 'connected') this._setupMIDI();
  }

  _handleMIDIMessage(event) {
    const [status, data1, data2] = event.data;
    const command = status & 0xF0;
    switch (command) {
      case 0x90: if (data2 > 0) this.audioEngine.playNote(data1, data2 / 127);
                 else this.audioEngine.stopNote(data1); break;
      case 0x80: this.audioEngine.stopNote(data1); break;
      case 0xB0: this.audioEngine.handleMIDICC(data1, data2 / 127); break;
      case 0xC0: this.audioEngine.handleProgramChange(data1); break;
    }
  }

  getInputs() { return this.inputs; }
  getOutputs() { return this.outputs; }
}