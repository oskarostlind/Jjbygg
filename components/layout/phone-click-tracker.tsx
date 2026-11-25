"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

/**
 * Konverteringsmätning: skickar händelsen "telefon_klick" till Vercel Analytics
 * när någon klickar på en tel:-länk, var som helst på sajten. En global
 * klicklyssnare i stället för en komponent per länk – tel:-länkarna ligger i
 * serverkomponenter och sidorna ska förbli statiska.
 */
export function PhoneClickTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (!target.closest('a[href^="tel:"]')) return;
      track("telefon_klick", { sida: window.location.pathname });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
