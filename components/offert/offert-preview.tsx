"use client";

import { createContext, useContext } from "react";

/**
 * sitecms förhandsgranskning (draft mode) för offertflödet. Sätts av
 * app/offert/layout.tsx; i förhandsgranskningen visas formuläret men kan inte
 * skickas (server action vägrar också, se app/actions/submit-offert.ts).
 */
const OffertPreviewContext = createContext(false);

export function OffertPreviewProvider({ preview, children }: { preview: boolean; children: React.ReactNode }) {
  return <OffertPreviewContext.Provider value={preview}>{children}</OffertPreviewContext.Provider>;
}

export function useOffertPreview(): boolean {
  return useContext(OffertPreviewContext);
}

export const OFFERT_PREVIEW_MESSAGE = "Formuläret är avstängt i förhandsgranskning";

export function OffertPreviewNotice() {
  return (
    <div
      role="status"
      data-testid="form-preview-notice"
      className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
    >
      <p className="font-semibold">{OFFERT_PREVIEW_MESSAGE}</p>
      <p className="mt-0.5 text-amber-800">
        Här ser du hur formuläret ser ut. Förfrågningar skickas bara från den publicerade sajten.
      </p>
    </div>
  );
}
