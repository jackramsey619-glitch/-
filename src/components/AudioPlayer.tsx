import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, VolumeX, Pause, Play, Sparkles } from 'lucide-react';

// Procedural gentle romantic harp/piano synthesizer for reliable offline-capable wedding ambience
class RomanticHarpSynth {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private step: number = 0;

  // Romantic progression in D Major (Canon in D style romantic harp arpeggios)
  // Chords: D - A - Bm - F#m - G - D - G - A
  private chordProgressions = [
    [146.83, 220.0, 293.66, 369.99, 440.0, 587.33], // D major
    [110.0, 164.81, 220.0, 277.18, 329.63, 440.0],  // A major
    [123.47, 185.0, 246.94, 293.66, 369.99, 493.88], // B minor
    [92.5, 146.83, 185.0, 220.0, 277.18, 369.99],   // F# minor
    [98.0, 146.83, 196.0, 246.94, 293.66, 392.0],   // G major
    [146.83, 220.0, 293.66, 369.99, 440.0, 587.33], // D major
    [98.0, 146.83, 196.0, 246.94, 329.63, 392.0],   // G major
    [110.0, 164.81, 220.0, 277.18, 329.63, 440.0],  // A major
  ];

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume * 0.22)), this.ctx.currentTime);
    }
  }

  private playPluck(freq: number, delay: number, duration: number = 2.4) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime + delay;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Soft warm triangle/sine blend
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    // Warm gentle lowpass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(320, now + duration);

    // Envelope
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.28, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.step = 0;

    const tick = () => {
      if (!this.isPlaying || !this.ctx) return;
      const chordIndex = Math.floor(this.step / 8) % this.chordProgressions.length;
      const chord = this.chordProgressions[chordIndex];
      const noteIndex = this.step % chord.length;
      const baseFreq = chord[noteIndex];

      // Add gentle arpeggio
      this.playPluck(baseFreq, 0, 2.2);

      // Random gentle bell chime highlight on measure head
      if (this.step % 8 === 0) {
        this.playPluck(chord[chord.length - 1] * 1.5, 0.15, 3.2);
      }

      this.step++;
      this.timerId = window.setTimeout(tick, 480);
    };

    tick();
  }

  stop() {
    this.isPlaying = false;
    if (this.timerId) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  get active(): boolean {
    return this.isPlaying;
  }
}

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.8);
  const harpSynthRef = useRef<RomanticHarpSynth | null>(null);
  const audioElemRef = useRef<HTMLAudioElement | null>(null);

  // High quality classical romantic piano track as primary audio, fallback to harp synth
  const AUDIO_SRC = 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-wedding-piano-112191.mp3';

  useEffect(() => {
    harpSynthRef.current = new RomanticHarpSynth();

    // Attempt autoplay if allowed
    const audio = audioElemRef.current;
    if (audio) {
      audio.volume = volume;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setShowNotification(false);
          })
          .catch(() => {
            // Autoplay blocked by browser policy; user interaction required
            setIsPlaying(false);
            setShowNotification(true);
          });
      }
    }

    return () => {
      if (harpSynthRef.current) {
        harpSynthRef.current.stop();
      }
      if (audioElemRef.current) {
        audioElemRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    setShowNotification(false);

    if (audioElemRef.current) {
      if (nextState) {
        audioElemRef.current.play().catch(() => {
          // If external audio fails, fallback to pure Web Audio romantic harp synth
          if (harpSynthRef.current) {
            harpSynthRef.current.start();
          }
        });
      } else {
        audioElemRef.current.pause();
        if (harpSynthRef.current) {
          harpSynthRef.current.stop();
        }
      }
    } else {
      if (harpSynthRef.current) {
        if (nextState) harpSynthRef.current.start();
        else harpSynthRef.current.stop();
      }
    }
  };

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (audioElemRef.current) {
      audioElemRef.current.muted = nextMute;
    }
    if (harpSynthRef.current) {
      harpSynthRef.current.setVolume(nextMute ? 0 : volume);
    }
  };

  return (
    <>
      <audio
        ref={audioElemRef}
        src={AUDIO_SRC}
        loop
        preload="auto"
        onError={() => {
          // If external stream is blocked, gracefully start synth if user wants music
          if (isPlaying && harpSynthRef.current) {
            harpSynthRef.current.start();
          }
        }}
      />

      {/* Floating Audio Toggle in Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Soft Autoplay / Romantic Music Prompt Banner */}
        {showNotification && !isPlaying && (
          <div
            id="audio-notification-pill"
            className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-[#fbcfe8] shadow-md animate-bounce duration-1000 cursor-pointer text-[#5d4037] text-xs font-sans font-semibold hover:border-[#d4af37] transition-all"
            onClick={togglePlay}
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]"></span>
            </span>
            <span className="font-sans">მუსიკის ჩართვა (Romantic Melody)</span>
            <Play className="w-3.5 h-3.5 text-[#d4af37] fill-[#d4af37]" />
          </div>
        )}

        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-[#fbcfe8] shadow-lg hover:shadow-xl transition-all">
          {/* Wave visualizer when playing */}
          {isPlaying && (
            <div className="hidden sm:flex items-center gap-0.5 px-3">
              <span className="w-1 h-3 bg-[#d4af37] rounded-full animate-pulse"></span>
              <span className="w-1 h-5 bg-[#d4af37] rounded-full animate-pulse delay-75"></span>
              <span className="w-1 h-2 bg-[#d4af37] rounded-full animate-pulse delay-150"></span>
              <span className="w-1 h-4 bg-[#d4af37] rounded-full animate-pulse delay-200"></span>
              <span className="w-1 h-2 bg-[#d4af37] rounded-full animate-pulse delay-100"></span>
              <span className="text-[11px] font-sans text-[#8d7770] ml-2 select-none">
                რომანტიკული მელოდია
              </span>
            </div>
          )}

          {/* Mute button */}
          <button
            id="audio-mute-button"
            type="button"
            onClick={toggleMute}
            title={isMuted ? 'ხმის ჩართვა' : 'ხმის გათიშვა'}
            className="p-2 text-[#8d7770] hover:text-[#d4af37] hover:bg-[#fdf6f0] rounded-full transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Main Play / Pause Button */}
          <button
            id="audio-play-toggle"
            type="button"
            onClick={togglePlay}
            title={isPlaying ? 'მუსიკის შეჩერება' : 'მუსიკის დაკვრა'}
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#5d4037] text-white shadow-md hover:bg-[#4a352e] hover:scale-105 active:scale-95 transition-all group"
          >
            {isPlaying && (
              <span className="absolute inset-0 rounded-full border-2 border-[#d4af37] animate-ping opacity-30"></span>
            )}
            {isPlaying ? (
              <Pause className="w-4 h-4 text-white" />
            ) : (
              <Music className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};
