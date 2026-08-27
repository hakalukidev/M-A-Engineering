"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { siteConfig } from "@/config/site";

/** Site-wide welcome audio (plays once on entry) with a visible mute control (proposal 4.4). */
export function BackgroundAudioPlayer() {
  const { muted, toggleMuted } = useAudioPlayer(
    siteConfig.backgroundAudio.src,
    siteConfig.backgroundAudio.defaultMuted
  );

  return (
    <button
      type="button"
      onClick={toggleMuted}
      aria-label={muted ? "Unmute background audio" : "Mute background audio"}
      aria-pressed={!muted}
      className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900/90 text-white shadow-lg transition-transform hover:scale-105"
    >
      {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </button>
  );
}
