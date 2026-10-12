/** Tiny synthesized UI sounds (Web Audio) — no audio assets required. */
import { useSyncExternalStore } from "react";

const MUTE_KEY = "jlp.sound.muted";

let ctx: AudioContext | null = null;
let muted = (() => {
  try {
    return localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
})();
const listeners = new Set<() => void>();

export type SoundKind = "xp" | "success" | "levelup";

const SEQUENCES: Record<SoundKind, { f: number; t: number; d: number; type?: OscillatorType }[]> = {
  xp: [{ f: 1318.5, t: 0, d: 0.12, type: "triangle" }],
  success: [
    { f: 523.25, t: 0, d: 0.16 },
    { f: 659.25, t: 0.09, d: 0.16 },
    { f: 783.99, t: 0.18, d: 0.16 },
    { f: 1046.5, t: 0.27, d: 0.34 },
  ],
  levelup: [
    { f: 523.25, t: 0, d: 0.14 },
    { f: 659.25, t: 0.1, d: 0.14 },
    { f: 783.99, t: 0.2, d: 0.14 },
    { f: 1046.5, t: 0.3, d: 0.14 },
    { f: 1318.5, t: 0.4, d: 0.14 },
    { f: 1568, t: 0.5, d: 0.5 },
  ],
};

export function playSound(kind: SoundKind) {
  if (muted || typeof window === "undefined") return;
  const AudioCtor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtor) return;

  try {
    ctx = ctx ?? new AudioCtor();
    if (ctx.state === "suspended") void ctx.resume();
    const now = ctx.currentTime;

    for (const note of SEQUENCES[kind]) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = note.type ?? "sine";
      osc.frequency.value = note.f;
      const start = now + note.t;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(kind === "xp" ? 0.05 : 0.09, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + note.d);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + note.d + 0.05);
    }
  } catch {
    /* audio is a nice-to-have */
  }
}

export function setSoundMuted(value: boolean) {
  muted = value;
  try {
    localStorage.setItem(MUTE_KEY, value ? "1" : "0");
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

export function useSoundMuted(): boolean {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => muted,
    () => muted,
  );
}
