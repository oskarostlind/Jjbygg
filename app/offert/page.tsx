"use client";

import { useEffect, useState, useTransition } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { siteContent } from "@/lib/site-content";
import { offertSchema, type OffertFormData } from "@/lib/validations/offert";
import { submitOffert } from "@/app/actions/submit-offert";
import { Stepper, type StepId } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { Step1Projektdetaljer } from "@/components/offert/step1-projektdetaljer";
import { Step2MediaPlats } from "@/components/offert/step2-media-plats";
import { Step3Kontakt } from "@/components/offert/step3-kontakt";
import { ContactInfo } from "@/components/contact-info";
import { OffertPageLayout } from "@/components/offert/offert-page-layout";
import { OffertPremiumCard } from "@/components/offert/offert-premium-card";
import { OffertSuccessView } from "@/components/offert/offert-success-view";
import { OffertPreviewNotice, useOffertPreview } from "@/components/offert/offert-preview";
import { HONEYPOT_FIELD, STARTED_FIELD } from "@/lib/offert-spam";

const STEPS: StepId[] = [1, 2, 3];

const LEAD_SOURCE_KEY = "jj_lead_source";

/** Första landningen i sessionen: referrer, landningssida och ev. UTM-parametrar. */
function readLeadSource(): string {
  try {
    const stored = window.sessionStorage.getItem(LEAD_SOURCE_KEY);
    if (stored) return stored;
  } catch {
    /* sessionStorage kan vara blockerat – fall tillbaka på aktuell sida */
  }
  const params = new URLSearchParams(window.location.search);
  const utm = ["utm_source", "utm_medium", "utm_campaign"]
    .map((k) => (params.get(k) ? `${k}=${params.get(k)}` : null))
    .filter(Boolean)
    .join(" ");
  const ref = document.referrer && !document.referrer.includes(window.location.host) ? document.referrer : "direkt";
  return [`referrer=${ref}`, `sida=${window.location.pathname}`, utm].filter(Boolean).join(" ").slice(0, 500);
}

function stepTitle(step: StepId): string {
  if (step === 1) return "Berätta om projektet";
  if (step === 2) return "Bilder och plats";
  return "Dina kontaktuppgifter";
}

export default function OffertPage() {
  const [currentStep, setCurrentStep] = useState<StepId>(1);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [kalla, setKalla] = useState("");
  // Spamskydd: honeypot (dolt fält som bara bottar fyller i) och tidsfälla
  // (när formuläret renderades – server actionen avvisar för snabba svar).
  const [honeypot, setHoneypot] = useState("");
  const [started, setStarted] = useState(0);
  // sitecms förhandsgranskning: formuläret går att titta på men inte skicka.
  const preview = useOffertPreview();

  // Varifrån kom besökaren? Skickas med i notifieringsmailet så att vi kan
  // mäta vilken kanal (Google, Google-profil, Facebook, annons…) som ger förfrågningar.
  useEffect(() => {
    setKalla(readLeadSource());
    setStarted(Date.now());
  }, []);

  const form = useForm<OffertFormData>({
    resolver: zodResolver(offertSchema),
    defaultValues: {
      typ: "",
      beskrivning: "",
      onskatStartdatum: "",
      postnummer: "",
      rot: false,
      namn: "",
      epost: "",
      telefon: "",
      kundtyp: undefined,
      consent: false,
      budget: "",
    },
  });

  const { register, handleSubmit, setValue, watch, trigger, formState: { errors } } = form;

  const goNext = async () => {
    const fieldsToValidate =
      STEPS[currentStep - 1] === 1
        ? (["typ", "beskrivning", "onskatStartdatum", "budget"] as const)
        : STEPS[currentStep - 1] === 2
          ? (["postnummer", "rot"] as const)
          : (["namn", "epost", "telefon", "consent"] as const);
    const ok = await trigger(fieldsToValidate);
    if (ok && currentStep < 3) setCurrentStep((s) => (s + 1) as StepId);
  };

  const goPrev = () => {
    if (currentStep > 1) setCurrentStep((s) => (s - 1) as StepId);
  };

  const onFinalSubmit = (values: OffertFormData) => {
    if (preview) return;
    setSubmitError(null);
    const formData = new FormData();
    formData.set("typ", values.typ);
    formData.set("beskrivning", values.beskrivning);
    if (values.onskatStartdatum) formData.set("onskatStartdatum", values.onskatStartdatum);
    if (values.postnummer) formData.set("postnummer", values.postnummer);
    formData.set("rot", values.rot ? "true" : "false");
    formData.set("namn", values.namn);
    formData.set("epost", values.epost);
    formData.set("telefon", values.telefon);
    if (values.kundtyp) formData.set("kundtyp", values.kundtyp);
    if (values.budget) formData.set("budget", values.budget);
    formData.set("consent", values.consent ? "true" : "false");
    imageFiles.forEach((file) => formData.append("bilder", file));
    if (kalla) formData.set("kalla", kalla);
    formData.set(HONEYPOT_FIELD, honeypot);
    formData.set(STARTED_FIELD, String(started));

    startTransition(async () => {
      const result = await submitOffert(formData);
      if (result.success) {
        setSuccess(true);
      } else {
        setSubmitError(result.error);
      }
    });
  };

  if (success) {
    return <OffertSuccessView />;
  }

  return (
    <OffertPageLayout>
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Intro + kontakt – på mobil hamnar kontakten under formuläret. */}
        <div className="lg:col-span-5">
          <header>
            <span className="mb-5 block h-1 w-12 rounded-sm bg-brand" aria-hidden />
            <h1 className="display text-display-lg text-graphite">{siteContent.hero.title}</h1>
            <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-muted">{siteContent.hero.subtitle}</p>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-graphite">
              {siteContent.hero.badges.map((badge) => (
                <li key={badge} className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-sm bg-brand" aria-hidden />
                  {badge}
                </li>
              ))}
            </ul>
          </header>
          <div className="mt-10 hidden lg:block">
            <ContactInfo />
          </div>
        </div>

        <div className="lg:col-span-7">
          <OffertPremiumCard showAccentTop={false}>
            <div className="border-b border-line bg-sand/60 px-5 pb-5 pt-5 sm:px-8 sm:pt-6">
              <Stepper currentStep={currentStep} />
            </div>
            <div className="px-5 py-6 sm:px-8 sm:py-8">
              <div className="mb-6">
                <p className="text-sm font-medium text-ink-muted">Steg {currentStep} av 3</p>
                <h2 className="mt-1 font-display text-display-sm font-bold text-graphite">{stepTitle(currentStep)}</h2>
              </div>
              <form onSubmit={handleSubmit(onFinalSubmit)} className="space-y-6">
                {preview ? <OffertPreviewNotice /> : null}
                {/* Spamskydd – osynligt för människor (och skärmläsare), bottar fyller i det. */}
                <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                  <label htmlFor={HONEYPOT_FIELD}>Webbplats (lämna tomt)</label>
                  <input
                    id={HONEYPOT_FIELD}
                    name={HONEYPOT_FIELD}
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                  <input type="hidden" name={STARTED_FIELD} value={started} readOnly />
                </div>
                {currentStep === 1 && (
                  <Step1Projektdetaljer
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    watch={watch}
                  />
                )}
                {currentStep === 2 && (
                  <Step2MediaPlats
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    watch={watch}
                    imageFiles={imageFiles}
                    onImageFilesChange={setImageFiles}
                  />
                )}
                {currentStep === 3 && (
                  <Step3Kontakt
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    watch={watch}
                  />
                )}

                {submitError && (
                  <p
                    className="rounded border border-brand-strong/40 bg-brand-tint px-4 py-3 text-sm font-medium text-brand-deep"
                    role="alert"
                  >
                    {submitError}
                  </p>
                )}

                <div className="flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                  {currentStep > 1 ? (
                    <Button type="button" variant="ghost" onClick={goPrev} className="sm:-ml-3">
                      <ArrowLeft className="h-4 w-4" aria-hidden />
                      Föregående
                    </Button>
                  ) : (
                    <p className="text-sm text-ink-muted sm:max-w-[16rem]">
                      Tar ett par minuter. Vi återkommer inom 1–2 vardagar.
                    </p>
                  )}
                  {currentStep < 3 ? (
                    <Button type="button" size="lg" onClick={goNext}>
                      Nästa steg
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Button>
                  ) : (
                    <Button type="submit" size="lg" disabled={isPending || preview}>
                      {isPending ? "Skickar…" : "Skicka offertförfrågan"}
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </OffertPremiumCard>

          <div className="mt-10 lg:hidden">
            <ContactInfo />
          </div>
        </div>
      </div>
    </OffertPageLayout>
  );
}
