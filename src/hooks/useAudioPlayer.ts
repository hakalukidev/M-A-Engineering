"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "bg-audio-muted";
const UNLOCK_EVENTS = ["click", "keydown", "touchstart"] as const;

/**
 * Site-wide welcome-audio control. Plays once (no loop) as soon as a
 * visitor enters the site, and remembers the visitor's mute/unmute choice
 * in localStorage across page navigations.
 *
 * Browsers block audible autoplay without a prior user gesture, so if the
 * immediate `play()` attempt is rejected, playback is deferred to the
 * visitor's first click/keydown/touch anywhere on the page.
 */
export function useAudioPlayer(src: string, defaultMuted = false) {
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
    audio.loop = false;
    audio.muted = muted;
    audioRef.current = audio;

    let cancelled = false;
    const removeUnlockListeners = () => {
      UNLOCK_EVENTS.forEach((event) =>
        window.removeEventListener(event, playOnce)
      );
    };
    function playOnce() {
      removeUnlockListeners();
      if (cancelled) return;
      audio.play().then(
        () => setIsPlaying(true),
        () => setIsPlaying(false)
      );
    }

    // Try to autoplay immediately; if the browser blocks it, fall back to
    // starting playback on the visitor's first interaction with the page.
    audio.play().then(
      () => setIsPlaying(true),
      () => {
        setIsPlaying(false);
        UNLOCK_EVENTS.forEach((event) =>
          window.addEventListener(event, playOnce, { once: true })
        );
      }
    );

    return () => {
      cancelled = true;
      removeUnlockListeners();
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
