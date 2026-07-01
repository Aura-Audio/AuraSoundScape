<p align="center">
  <img src="docs/soundscape-hero.png" alt="Soundscape Generator UI" width="100%" />
</p>

<h1 align="center">🌊 Soundscape Generator</h1>
<p align="center">
  <b>Structured · Evolving · Non‑looping</b><br>
  A sophisticated, browser‑based generative noise engine that creates immersive, endlessly evolving audio environments.
</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"></a>
  <a href="#"><img src="https://img.shields.io/badge/Web%20Audio-API-blue" alt="Web Audio API"></a>
  <a href="#"><img src="https://img.shields.io/badge/Vanilla-JS-F7DF1E?logo=javascript&logoColor=black" alt="Vanilla JS"></a>
  <a href="#"><img src="https://img.shields.io/badge/Zero-Dependencies-success" alt="Zero Dependencies"></a>
</p>

<p align="center">
  <a href="#-quick-start"><b>Quick Start</b></a> •
  <a href="#-features"><b>Features</b></a> •
  <a href="#-the-math-behind-the-magic"><b>How it Works</b></a> •
  <a href="#-roadmap"><b>Roadmap</b></a>
</p>

---

## 📖 Overview

The **Soundscape Generator** is a self-contained, zero-dependency web application that transforms raw noise into a living, breathing audio environment. 

Designed for focus, meditation, creative coding, and game audio prototyping, it solves the "loop fatigue" problem inherent in most ambient apps. By layering independently modulated noise sources with mathematically calculated prime-length buffers and irrational LFO frequencies, it creates a soundscape that **never repeats the same pattern twice**.

> **✨ New in v2.0:** Upgraded with an ES6 Class architecture, native Web Audio parameter smoothing, click-free master fades, algorithmic Brownian noise generation, and built-in `.webm` audio recording.

---

## ✨ Features

### 🎛️ Generative Audio Engine
*   **Three-Layer Architecture:** 
    *   **Deep:** Algorithmically generated Brownian noise for a rich, clean sub-bass rumble.
    *   **Mid:** Band-passed white noise for atmospheric presence and texture.
    *   **Air:** High-passed white noise for crystalline, shimmering high-end detail.
*   **True Schroeder Reverb:** A custom-built algorithmic reverb featuring parallel comb filters, feedback damping, and a master low-pass filter to eliminate metallic ringing.
*   **Stochastic Structural Events:** Every 35–90 seconds, the engine autonomously triggers organic transformations (reverb swells, filter sweeps, density spikes) to keep the listener engaged without manual intervention.

### 🎛️ Advanced DSP & Synthesis (v3.0)
*   **Expanded Noise Palette:** Go beyond white noise. Select from mathematically generated **Pink** (Paul Kellet’s algorithm), **Brown**, **Blue** (differentiated), and **Violet** (second derivative) noise textures to sculpt the exact frequency profile of your environment.
*   **Generative Drone Synth:** A dedicated fourth layer featuring a 3-oscillator detuned supersaw architecture feeding into a resonant low-pass filter. 
    *   **Auto-Harmony:** The drone's root note automatically glides between quantized pentatonic intervals, ensuring it never clashes with the noise layers.
    *   **Tension Control:** A dedicated "Resonance" macro allows you to push the drone filter from a soft pad to a screaming, acidic lead.
*   **Dynamic Reverb Sizing:** The "Room Size" parameter now physically alters the delay line lengths within the Schroeder reverb topology, shifting the space from a tight closet to a massive cavern.

### 🎧 Real-Time Morphing Controls
Four macro-parameters that smoothly reshape the entire audio graph:
*   **Volume:** Master output level with native `setTargetAtTime` smoothing.
*   **Density:** Balances the gain staging across the three noise layers.
*   **Movement:** Scales the depth of 7 independent LFOs (modulating filter cutoffs, Q-factors, tremolo, and master gain).
*   **Reverb:** Controls the wet/dry mix and send levels of the custom reverb network.

### 🎨 Reactive Visualizer
A dynamic, radial frequency spectrum rendered on the HTML5 Canvas API:
*   **Energy Mapping:** Frequencies mapped to a 360° radial layout (Lows = Amber, Mids = Purple, Highs = Blue).
*   **Core Orb:** A central glowing orb that pulses in real-time with the sub-bass energy.
*   **Particle System:** Subtle orbital particles that drift in sync with the slow-phase accumulators.

### 🎹 Workflow & UX
*   **Instant Presets:** Four curated starting points (*Deep, Wind, Crystal, Experimental*).
*   **Built-in Recording:** Capture your evolving soundscapes directly in the browser and export them as `.webm` audio files via the MediaRecorder API.
*   **Click-Free Engine:** Master fade-in/fade-out ramps ensure no speaker pops when starting or stopping the engine.
*   **Keyboard Driven:** Full control via keyboard shortcuts for hands-free operation.

---

## 🧮 The Math Behind the Magic

How does it avoid looping? The engine relies on the mathematical concept of the **Least Common Multiple (LCM)**.

1.  **Prime-Length Buffers:** The three noise loops are exactly `7.31s`, `11.17s`, and `13.43s` long. Because these are prime-adjacent numbers, their combined waveform only repeats after several hours.
2.  **Irrational LFOs:** The modulation oscillators run at frequencies like `0.027Hz`, `0.041Hz`, and `0.059Hz`. These non-harmonic, irrational rates ensure that the modulation curves never perfectly align with the buffer loops or each other.

The result is an audio stream that is structurally sound, but infinitely non-repeating.

---

## 🚀 Quick Start

Because this is a zero-dependency, single-file application, getting started is instant.

1.  Clone the repository or download the `index.html` file.
2.  Open the file directly in any modern web browser (Chrome, Firefox, Safari, Edge).
3.  Click **▶ Begin** or press `Space` to start the audio context.

### ⌨️ Keyboard Shortcuts

| Key | Action |
| :--- | :--- |
| `Space` | Toggle Engine (Start / Stop) |
| `D` | Load **Deep** Preset (Oceanic, rumbling) |
| `W` | Load **Wind** Preset (Open, airy) |
| `C` | Load **Crystal** Preset (Bright, delicate) |
| `E` | Load **Experimental** Preset (Extreme modulation) |

---

## 🗺️ Roadmap

The project is actively maintained. Here is what is planned for future releases:

### 🟢 Near Term (v2.1 - v2.5)
- [ ] **Expanded Noise Colors:** Add Pink, Blue, and Violet noise algorithms alongside White and Brown.
- [ ] **Fourth "Drone" Layer:** Introduce a resonant, pitched drone layer with independent interval controls.
- [ ] **LocalStorage Presets:** Allow users to save, name, and recall their own custom parameter states.
- [ ] **WAV Export:** Upgrade the recording feature to render and export high-fidelity `.wav` files.

### 🟡 Mid Term (v3.0)
- [ ] **Web Audio Worklet / Web Workers:** Offload complex DSP (like convolution reverb) to an audio worklet to guarantee zero UI thread blocking on low-end devices.
- [ ] **Spatial Audio (HRTF):** Implement the `PannerNode` with HRTF to allow layers to physically orbit the listener's head in 3D space.
- [ ] **MIDI / OSC Mapping:** Map physical hardware controllers (knobs/faders) to the macro parameters via the Web MIDI API.

### 🔵 Long Term (v4.0+)
- [ ] **Convolution Reverb:** Add support for loading custom Impulse Responses (IRs) for realistic room/space modeling.
- [ ] **Frequency-Domain Sculpting:** An interactive EQ canvas allowing users to draw harmonic emphasis curves.
- [ ] **Timeline Sequencer:** A visual timeline to automate parameter changes over a 10-minute "journey".

---

## 🛠️ Tech Stack

*   **Audio:** Web Audio API (`AudioContext`, `BiquadFilterNode`, `DelayNode`, `OscillatorNode`)
*   **Visuals:** HTML5 Canvas API (`requestAnimationFrame`, 2D Context)
*   **Recording:** MediaRecorder API & `MediaStreamDestination`
*   **Architecture:** Vanilla JavaScript (ES6+ Classes), CSS3 Variables.
*   **Build Tools:** None. 100% native browser technologies.

---

## 🤝 Contributing

Contributions, issues, and feature requests are highly encouraged! 
If you have an idea to improve the DSP algorithms or the visual renderer:

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/amazing-dsp`).
3.  Commit your changes (`git commit -m 'Add amazing DSP feature'`).
4.  Push to the branch (`git push origin feature/amazing-dsp`).
5.  Open a Pull Request.

*Please ensure any new audio features are tested with headphones to verify stereo imaging and prevent clipping!*

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <i>Crafted with curiosity, mathematics, and a love for endless sound.</i>
</p>
