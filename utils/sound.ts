
let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0.3; // Main volume
    masterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

// Simple oscillator beep
const playTone = (freq: number, type: OscillatorType, duration: number, vol = 1) => {
  const ctx = initAudio();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  
  gain.gain.setValueAtTime(vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

  osc.connect(gain);
  gain.connect(masterGain!);

  osc.start();
  osc.stop(ctx.currentTime + duration);
};

// White noise generator
const createNoiseBuffer = (ctx: AudioContext) => {
  const bufferSize = ctx.sampleRate * 2; // 2 seconds of noise
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
};

let noiseBuffer: AudioBuffer | null = null;

export const playStatic = (duration = 0.2, vol = 0.5) => {
  const ctx = initAudio();
  if (!noiseBuffer) noiseBuffer = createNoiseBuffer(ctx);

  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  const gain = ctx.createGain();
  
  gain.gain.setValueAtTime(vol, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);
  
  noise.connect(gain);
  gain.connect(masterGain!);
  
  noise.start();
  noise.stop(ctx.currentTime + duration);
};

export const playHover = () => {
  playTone(200, 'square', 0.05, 0.1);
};

export const playClick = () => {
  playTone(800, 'square', 0.1, 0.2);
  playTone(1200, 'sawtooth', 0.1, 0.1);
};

export const playPowerOn = () => {
  const ctx = initAudio();
  
  // High pitch sweep (CRT flyback sound)
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(15000, ctx.currentTime); // Start very high (inaudible for some)
  osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 2.5); // Drop down
  
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.5);
  gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.5);
  
  osc.connect(gain);
  gain.connect(masterGain!);
  osc.start();
  osc.stop(ctx.currentTime + 2.5);

  // Static burst at the end
  setTimeout(() => {
    playStatic(0.5, 0.4);
  }, 2000);
};

export const playChannelSwitch = () => {
  playStatic(0.15, 0.2);
};
