"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "bg-audio-muted";

/**
 * Background-audio control for the site-wide player.
 * Starts muted (browser autoplay policy) and remembers the visitor's
 * mute/unmute choice in localStorage across page navigations.
 */
export function useAudioPlayer(src: string, defaultMuted = true) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Start at `defaultMuted` on both server and first client render (avoids a
  // hydration mismatch), then sync the visitor's remembered choice from
  // localStorage once mounted — an external system read, not derived state.
  const [muted, setMuted] = useState(defaultMuted);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from browser storage on mount, not derived render state
    if (stored !== null) setMuted(stored === "true");
  }, []);

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.muted = muted;
    audioRef.current = audio;

    // Autoplay is allowed unmuted-or-not only after a user gesture in most
    // browsers; attempt play, but don't treat a rejection as an error.
    audio.play().then(
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );

    return () => {
      audio.pause();
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const toggleMuted = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.muted = next;
        if (!next) audioRef.current.play().catch(() => {});
      }
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, String(next));
      }
      return next;
    });
  }, []);

  return { muted, isPlaying, toggleMuted };
}
