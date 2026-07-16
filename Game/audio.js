/* ================================================================
   DERELICT — audio engine
   All sound effects are synthesized with the Web Audio API, so the
   game needs zero external audio files. AI "voice" lines use the
   browser's built-in speech synthesis.
   ================================================================ */

class AudioEngine {
  constructor(){
    this.ctx = null;
    this.musicOn = true;
    this.sfxOn = true;
    this.masterGain = null;
    this.musicNodes = [];
  }

  ensureCtx(){
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.35;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
  }

  tone(freq, dur, type='sine', vol=0.2, delay=0){
    if (!this.sfxOn) return;
    this.ensureCtx();
    const t0 = this.ctx.currentTime + delay;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(vol, t0 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  footstep(){ this.tone(90 + Math.random()*20, 0.07, 'square', 0.05); }

  doorOpen(){
    this.tone(220, 0.18, 'sawtooth', 0.12);
    this.tone(440, 0.15, 'sine', 0.08, 0.05);
  }

  doorDenied(){
    this.tone(140, 0.2, 'square', 0.15);
    this.tone(100, 0.25, 'square', 0.15, 0.15);
  }

  pickup(){
    this.tone(523, 0.08, 'sine', 0.15);
    this.tone(784, 0.12, 'sine', 0.15, 0.08);
  }

  crateOpen(){
    this.tone(180, 0.1, 'square', 0.12);
    this.tone(300, 0.15, 'triangle', 0.1, 0.06);
  }

  terminalBeep(){ this.tone(880, 0.05, 'square', 0.08); }

  hackSuccess(){
    [440,554,659,880].forEach((f,i)=> this.tone(f, 0.15, 'sine', 0.14, i*0.09));
  }

  alarm(){
    this.ensureCtx();
    if (!this.sfxOn) return;
    for (let i=0;i<4;i++){
      this.tone(660, 0.25, 'sawtooth', 0.12, i*0.3);
      this.tone(440, 0.25, 'sawtooth', 0.12, i*0.3 + 0.15);
    }
  }

  click(){ this.tone(1000, 0.03, 'square', 0.06); }

  achievement(){
    [660,880,1100].forEach((f,i)=> this.tone(f, 0.18, 'triangle', 0.16, i*0.1));
  }

  /* Ambient hum + a slow drone pad, started once on first interaction */
  startMusic(){
    if (!this.musicOn) return;
    this.ensureCtx();
    if (this.musicNodes.length) return;
    const drone = this.ctx.createOscillator();
    drone.type = 'sine';
    drone.frequency.value = 55;
    const dgain = this.ctx.createGain();
    dgain.gain.value = 0.05;
    drone.connect(dgain); dgain.connect(this.masterGain);
    drone.start();

    const hum = this.ctx.createOscillator();
    hum.type = 'triangle';
    hum.frequency.value = 110;
    const hgain = this.ctx.createGain();
    hgain.gain.value = 0.02;
    hum.connect(hgain); hgain.connect(this.masterGain);
    hum.start();

    // slow LFO-modulated pad note for atmosphere
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = 0.07;
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 0.015;
    lfo.connect(lfoGain);
    lfoGain.connect(dgain.gain);
    lfo.start();

    this.musicNodes = [drone, hum, lfo];
  }

  stopMusic(){
    this.musicNodes.forEach(n => { try { n.stop(); } catch(e){} });
    this.musicNodes = [];
  }

  toggleMusic(on){
    this.musicOn = on;
    if (on) this.startMusic(); else this.stopMusic();
  }

  toggleSfx(on){ this.sfxOn = on; }

  /* AI voice lines via browser speech synthesis (no audio files needed) */
  speak(text, opts={}){
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = opts.rate ?? 0.95;
    u.pitch = opts.pitch ?? 0.6;
    u.volume = opts.volume ?? 0.9;
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v => /Google UK English Male|Daniel|Male/i.test(v.name));
    if (preferred) u.voice = preferred;
    window.speechSynthesis.speak(u);
  }
}

const AUDIO = new AudioEngine();
