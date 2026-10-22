/**
 * Spamskydd i offertformuläret som kräver webbläsaren (sitecms förväntar sig
 * att sajten gör dem innan den anropar CMS:et). Delas av formuläret (klient)
 * och server actionen.
 */

/** Honeypot-fältets namn – dolt för människor, ifyllt = bot. */
export const HONEYPOT_FIELD = "webbplats";

/** Dolt fält med tidpunkten (ms sedan epoch) då formuläret renderades – tidsfälla. */
export const STARTED_FIELD = "started";

/** Snabbare än så här fyller ingen människa i tre steg. */
export const MIN_FILL_TIME_MS = 3_000;
