"use client";

import { useEffect, useState } from "react";
import type { PopupTrigger } from "@/types";

/** Fires `true` once when a popup's configured trigger condition is met. */
export function usePopupTrigger(trigger: PopupTrigger, triggerValue?: number) {
  const [shouldShow, setShouldShow] = useState(false);
  // Latches true the first time the trigger fires and never resets — lets a
  // consumer (InquiryPopup) defer mounting its Modal until actually needed,
  // while still keeping it mounted through a later dismiss so its close
  // animation can play.
  const [everTriggered, setEverTriggered] = useState(false);

  useEffect(() => {
    if (trigger === "delay") {
      const timer = setTimeout(() => {
        setShouldShow(true);
        setEverTriggered(true);
      }, triggerValue ?? 8000);
      return () => clearTimeout(timer);
    }

    if (trigger === "scroll") {
      const threshold = triggerValue ?? 50;
      const onScroll = () => {
        const scrolled =
          (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (scrolled >= threshold) {
          setShouldShow(true);
          setEverTriggered(true);
          window.removeEventListener("scroll", onScroll);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    if (trigger === "exit-intent") {
      const onLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          setShouldShow(true);
          setEverTriggered(true);
        }
      };
      document.addEventListener("mouseleave", onLeave);
      return () => document.removeEventListener("mouseleave", onLeave);
    }
  }, [trigger, triggerValue]);

  return { shouldShow, everTriggered, dismiss: () => setShouldShow(false) };
}
