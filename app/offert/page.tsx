"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { siteContent } from "@/lib/site-content";
import { offertSchema, type OffertFormData } from "@/lib/validations/offert";
import { submitOffert } from "@/app/actions/submit-offert";
import { Stepper, type StepId } from "@/components/ui/stepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Step1Projektdetaljer } from "@/components/offert/step1-projektdetaljer";
import { Step2MediaPlats } from "@/components/offert/step2-media-plats";
import { Step3Kontakt } from "@/components/offert/step3-kontakt";

const STEPS: StepId[] = [1, 2, 3];

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
    const fieldsToValidate = STEPS[currentStep - 1] === 1
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
    return (
      <main className="min-h-screen bg-background py-12 px-4">
        <div className="mx-auto max-w-lg">
          <Card>
            <CardHeader>
              <CardTitle>Tack för din förfrågan</CardTitle>
              <CardDescription>
                Vi har tagit emot din offertförfrågan och återkommer till dig så snart vi kan.
                Du har fått en bekräftelse till din e-post.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="mx-auto max-w-xl space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-primary">{siteContent.hero.title}</h1>
          <p className="mt-2 text-muted-foreground">{siteContent.hero.subtitle}</p>
        </header>

        <Stepper currentStep={currentStep} />

        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && "Projektdetaljer"}
              {currentStep === 2 && "Media & plats"}
              {currentStep === 3 && "Kontaktuppgifter"}
            </CardTitle>
            <CardDescription>
              Steg {currentStep} av 3
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                <p className="text-sm text-red-600" role="alert">
                  {submitError}
                </p>
              )}

              <div className="flex justify-between gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goPrev}
                  disabled={currentStep === 1}
                >
                  Föregående
                </Button>
                {currentStep < 3 ? (
                  <Button type="button" onClick={goNext}>
                    Nästa
                  </Button>
                ) : (
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Skickar..." : "Skicka offertförfrågan"}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <footer className="text-center text-sm text-muted-foreground">
          {siteContent.footer.companyName} – {siteContent.footer.tagline}
        </footer>
      </div>
    </main>
  );
}
