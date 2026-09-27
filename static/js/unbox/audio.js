import { SPINNER_CONFIG } from './config.js';

let audioCtx = null;

export function playTickSound(velocityRatio = 1.0) {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(SPINNER_CONFIG.audioTickFrequency, audioCtx.currentTime); 
    osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + SPINNER_CONFIG.audioTickDuration);

    const adjustedVolume = SPINNER_CONFIG.audioVolume * Math.max(velocityRatio, 0.15);

    gainNode.gain.setValueAtTime(adjustedVolume, audioCtx.currentTime); 
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + SPINNER_CONFIG.audioTickDuration);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + SPINNER_CONFIG.audioTickDuration);
  } catch (e) {
    console.warn("Audio Context blocked:", e);
  }
}

// 🎬 NEW: CINEMATIC REVEAL SOUND GENERATOR
export function playRevealSound() {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // Layer 1: Heavy Bass Drop Sub
    const subOsc = audioCtx.createOscillator();
    const subGain = audioCtx.createGain();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(90, now);
    subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.8);
    subGain.gain.setValueAtTime(0.3, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
    subOsc.connect(subGain);
    subGain.connect(audioCtx.destination);
    subOsc.start(now);
    subOsc.stop(now + 0.8);

    // Layer 2: Shimmering Bright Achievement Arpeggio Sweep
    const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5 (Major Chord)
    notes.forEach((freq, index) => {
      const chimeOsc = audioCtx.createOscillator();
      const chimeGain = audioCtx.createGain();
      
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(freq, now + (index * 0.06)); // Cascading arpeggio stagger
      
      chimeGain.gain.setValueAtTime(0.0, now);
      chimeGain.gain.linearRampToValueAtTime(0.12, now + (index * 0.06) + 0.02);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      
      chimeOsc.connect(chimeGain);
      chimeGain.connect(audioCtx.destination);
      chimeOsc.start(now + (index * 0.06));
      chimeOsc.stop(now + 0.6);
    });

  } catch (e) {
    console.warn("Reveal audio could not trigger:", e);
  }
}
