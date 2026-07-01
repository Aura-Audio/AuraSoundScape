# 🌊 Soundscape Generator

**Structured · Evolving · Non‑looping**  
A sophisticated, browser‑based noise engine that generates immersive soundscapes with organic variation, never repeating the same 5‑second loop.

---

## Overview

The **Soundscape Generator** is a self‑contained HTML/JavaScript web application that turns white noise into a living, breathing audio environment. By layering three independently modulated noise sources (with prime‑length buffer durations) and applying a network of LFOs, filters, and a custom reverb, it creates a soundscape that:

- Evolves **continuously** over minutes and hours, never settling into a fixed loop.
- Responds to **real‑time parameter controls** (volume, density, movement, reverb).
- Surprises with **stochastic structural events** every 35–90 seconds (reverb swells, filter shifts, etc.).
- Visualises the sound in a dynamic, radial spectrum canvas.

Perfect for focus, meditation, creative coding, game audio prototyping, or simply exploring the beauty of generated sound.

---

## Features

### 🎧 Three‑Layer Noise Architecture
- **Deep layer** – Brown‑ish rumble via heavy low‑pass filtering (160 Hz).
- **Mid texture** – Band‑pass filtered (1.1 kHz) for atmospheric presence.
- **Air/Sparkle** – High‑pass filtered (4.2 kHz) adding crystalline air.
- Each layer uses a noise buffer with a prime‑number duration (7.3 s, 11.2 s, 13.4 s), ensuring their combined pattern repeats only after **many hours**.

### 🎛 Real‑Time Parameters
Four sliders (0–100) that smoothly morph the sound:
- **Volume** – Master output level.
- **Density** – Balances the gain of the three noise layers.
- **Movement** – Controls LFO depth for filter cutoffs, amplitude modulation, Q‑modulation, and tremolo.
- **Reverb** – Wet/dry mix of a custom Schroeder‑style reverb.

### 🌀 Organic Modulation
- **Seven LFOs** running at irrational frequencies (0.027 Hz, 0.041 Hz, 0.059 Hz, …) modulate:
  - Filter cutoffs
  - Q factors
  - Amplitude (tremolo)
  - A slow master gain cycle (~3 minutes)
- The interplay of non‑harmonic LFOs guarantees an endless, non‑repetitive drift.

### ⚡ Stochastic Structural Events
Every 35–90 seconds, the engine triggers one of several random transformations:
- Reverb swell
- Deep layer intensification
- High‑layer brightening
- Mid‑texture frequency shift
- Movement spike
These keep the soundscape engaging without human intervention.

### 🌌 Live Visualizer
A radial frequency spectrum is drawn on an HTML canvas:
- Low frequencies glow in warm amber, highs in violet/blue.
- Center orb pulses with total energy.
- Particle trails orbit in sync with the modulation.
- The visual style adapts to the current sound character.

### 🎹 Presets & Keyboard Shortcuts
Four built‑in presets instantly reshape the sound:
- **Deep** (D key) – Oceanic, rumbling.
- **Wind** (W key) – Open, airy.
- **Crystal** (C key) – Bright, delicate.
- **Experimental** (E key) – Unpredictable, extreme modulation.
- **Space** toggles the engine on/off.

### 📱 Responsive & Self‑Contained
- Single HTML file – no dependencies, no build tools.
- Works in any modern browser (Chrome, Firefox, Edge, Safari).
- Adapts to screen sizes (desktop, tablet, mobile).
- Continues playing in background tabs.

---

## How to Use

1. **Open the HTML file** directly in your browser (or serve it via any static host).
2. Click **Begin** or press `Space` to start the soundscape.
3. Drag the sliders to shape the atmosphere.
4. Press `D`, `W`, `C`, or `E` to load a preset.
5. Let it run – structural events will happen automatically.

> **Note:** AudioContext requires a user gesture to start (click/tap/space). If nothing happens, try clicking the canvas or button.

---

## Technical Highlights

- **Noise buffers** created with `Math.random()` and stored as `AudioBuffer` sources.
- **Schroeder reverb** implemented using four parallel comb filters with prime‑length delays.
- **Audio graph** built entirely with the Web Audio API (`AudioContext`, `BiquadFilter`, `Gain`, `Delay`, `StereoPanner`).
- **Parameter smoothing** via linear interpolation on every animation frame.
- **Visualizer** uses `AnalyserNode.getFloatFrequencyData()` mapped to radial geometry.
- **Event system** runs on `setTimeout` with random intervals, applying `setTargetAtTime` ramps for click‑free transitions.

---

## Roadmap

Planned features and improvements:

- [ ] **More Sound Layers** – Add a fourth layer (e.g., resonant drone, granular texture) with independent controls.
- [ ] **MIDI / OSC Control** – Map parameters to external hardware or DAWs.
- [ ] **Audio Recording** – Ability to record the output directly in the browser (MediaRecorder + Web Audio).
- [ ] **Custom Noise Types** – Brown, pink, blue noise instead of pure white noise.
- [ ] **User‑Defined Presets** – Save/load preset configurations via localStorage.
- [ ] **Advanced Reverb** – Convolution reverb with impulse responses, or additional algorithmic reverbs.
- [ ] **Spatial Audio** – 3D panning using `PannerNode` with HRTF.
- [ ] **Web Worker Audio** – Offload noise generation to a worker for performance.
- [ ] **Dark/Light Theme** – Switchable UI appearance.
- [ ] **Frequency‑Domain Sculpting** – Allow the user to draw an EQ curve or harmonic emphasis.
- [ ] **Sequencer‑Like Evolution** – Define a timeline of parameter changes for a controlled journey.
- [ ] **Export as WAV** – Render a fixed‑length file for use in other projects.
- [ ] **Accessibility** – Improve screen‑reader support and keyboard navigation.
- [ ] **Performance Profiling** – Test on low‑power devices, optimize canvas and audio thread usage.

---

## Contributing

Contributions are welcome! Feel free to open issues or pull requests for bug fixes, new features, or documentation improvements.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

*Crafted with curiosity, noise, and a love for endless sound.*
