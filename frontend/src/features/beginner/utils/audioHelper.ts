/**
 * Audio helper for safe audio playback in beginner modules.
 * NEVER assumes or fakes audio files.
 */

let activeAudioInstance: HTMLAudioElement | null = null;

/**
 * Checks whether an audio URL is valid and non-empty.
 */
export function hasValidAudioUrl(url?: string | null): boolean {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (trimmed === "" || trimmed === "#" || trimmed.startsWith("javascript:")) {
    return false;
  }
  return true;
}

/**
 * Stops any currently playing audio instance across the beginner feature.
 */
export function stopActiveAudio(): void {
  if (activeAudioInstance) {
    try {
      activeAudioInstance.pause();
      activeAudioInstance.currentTime = 0;
    } catch {
      // Ignore pause failure on detached elements
    }
    activeAudioInstance = null;
  }
}

/**
 * Safely plays audio from a real URL.
 * Automatically stops previous audio.
 */
export function playSafeAudio(
  url: string,
  callbacks?: {
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (error: unknown) => void;
  },
): HTMLAudioElement | null {
  if (!hasValidAudioUrl(url)) {
    callbacks?.onError?.(new Error("Audio URL không hợp lệ hoặc chưa được cung cấp."));
    return null;
  }

  stopActiveAudio();

  try {
    const audio = new Audio(url);
    activeAudioInstance = audio;

    audio.onended = () => {
      if (activeAudioInstance === audio) {
        activeAudioInstance = null;
      }
      callbacks?.onEnd?.();
    };

    audio.onerror = (e) => {
      if (activeAudioInstance === audio) {
        activeAudioInstance = null;
      }
      callbacks?.onError?.(e);
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          callbacks?.onStart?.();
        })
        .catch((err) => {
          if (activeAudioInstance === audio) {
            activeAudioInstance = null;
          }
          callbacks?.onError?.(err);
        });
    }

    return audio;
  } catch (err) {
    callbacks?.onError?.(err);
    return null;
  }
}
