"use client";

import { useState, useTransition } from "react";
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

const STEPS: StepId[] = [1, 2, 3];

function stepTitle(step: StepId): string {
  if (step === 1) return "Projektdetaljer";
  if (step === 2) return "Media & plats";
  return "Kontaktuppgifter";
}

export default function OffertPage() {
  const [currentStep, setCurrentStep] = useState<StepId>(1);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

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
      budget: "",
    },
  });

  const { register, handleSubmit, setValue, watch, trigger, formState: { errors } } = form;

  const goNext = async () => {
    const fieldsToValidate =
      STEPS[currentStep - 1] === 1
        ? (["typ", "beskrivning"] as const)
        : STEPS[currentStep - 1] === 2
          ? (["postnummer", "rot"] as const)
          : (["namn", "epost"] as const);
    const ok = await trigger(fieldsToValidate);
    if (ok && currentStep < 3) setCurrentStep((s) => (s + 1) as StepId);
  };

  const goPrev = () => {
    if (currentStep > 1) setCurrentStep((s) => (s - 1) as StepId);
  };

  const onFinalSubmit = (values: OffertFormData) => {
    setSubmitError(null);
    const formData = new FormData();
    formData.set("typ", values.typ);
    formData.set("beskrivning", values.beskrivning);
    if (values.onskatStartdatum) formData.set("onskatStartdatum", values.onskatStartdatum);
    if (values.postnummer) formData.set("postnummer", values.postnummer);
    formData.set("rot", values.rot ? "true" : "false");
    formData.set("namn", values.namn);
    formData.set("epost", values.epost);
    if (values.telefon) formData.set("telefon", values.telefon);
    if (values.kundtyp) formData.set("kundtyp", values.kundtyp);
    if (values.budget) formData.set("budget", values.budget);
    imageFiles.forEach((file) => formData.append("bilder", file));

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
      <div className="mx-auto w-full max-w-3xl space-y-8 pb-8">
        <header className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Offertförfrågan
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
            {siteContent.hero.title}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-600">
            {siteContent.hero.subtitle}
          </p>
        </header>

        <ContactInfo />

        <Stepper currentStep={currentStep} />

        <OffertPremiumCard showAccentTop={false}>
          <div className="border-b border-slate-100 px-6 py-5 md:px-8">
            <h2 className="text-xl font-bold text-slate-900">{stepTitle(currentStep)}</h2>
            <p className="mt-1 text-sm text-slate-500">
              Steg {currentStep} av 3 – fyll i uppgifterna nedan
            </p>
          </div>
          <div className="px-6 py-6 md:px-8 md:py-8">
            <form onSubmit={handleSubmit(onFinalSubmit)} className="space-y-6">
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
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  role="alert"
                >
                  {submitError}
                </p>
              )}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goPrev}
                  disabled={currentStep === 1}
                  className="border-slate-200 bg-white hover:bg-slate-50"
                >
                  Föregående
                </Button>
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    onClick={goNext}
                    className="bg-accent text-accent-foreground shadow-md hover:bg-accent/90 hover:shadow-lg"
                  >
                    Nästa steg
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-accent text-accent-foreground shadow-md hover:bg-accent/90 hover:shadow-lg"
                  >
                    {isPending ? "Skickar..." : "Skicka offertförfrågan"}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </OffertPremiumCard>

        <footer className="text-center text-sm text-slate-500">
          {siteContent.footer.companyName} – {siteContent.footer.tagline}
        </footer>
      </div>
    </OffertPageLayout>
  );
}
