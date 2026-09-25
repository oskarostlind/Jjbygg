"use client";

import { useEffect } from "react";

const LEAD_SOURCE_KEY = "jj_lead_source";

/**
 * Sparar varifrån besökaren kom vid FÖRSTA sidvisningen i sessionen
 * (extern referrer, landningssida, UTM). Offertformuläret skickar med värdet
 * så att varje förfrågan kan kopplas till en kanal.
 */
export function LeadSourceTracker() {
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(LEAD_SOURCE_KEY)) return;
      const params = new URLSearchParams(window.location.search);
      const utm = ["utm_source", "utm_medium", "utm_campaign"]
        .map((k) => (params.get(k) ? `${k}=${params.get(k)}` : null))
        .filter(Boolean)
        .join(" ");
      const ref =
        document.referrer && !document.referrer.includes(window.location.host)
          ? document.referrer
          : "direkt";
      const value = [`referrer=${ref}`, `landning=${window.location.pathname}`, utm]
        .filter(Boolean)
        .join(" ")
        .slice(0, 500);
      window.sessionStorage.setItem(LEAD_SOURCE_KEY, value);
    } catch {
      /* sessionStorage blockerat – formuläret faller tillbaka på egen avläsning */
    }
  }, []);

  return null;
}
