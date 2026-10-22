"use client";

import Link from "next/link";
import type { UseFormRegister, UseFormSetValue, UseFormWatch, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { OffertFormData } from "@/lib/validations/offert";

interface Step3Props {
  register: UseFormRegister<OffertFormData>;
  errors: FieldErrors<OffertFormData>;
  setValue: UseFormSetValue<OffertFormData>;
  watch: UseFormWatch<OffertFormData>;
}

export function Step3Kontakt({ register, errors, setValue, watch }: Step3Props) {
  const kundtypValue = watch("kundtyp") ?? "";
  const consentValue = watch("consent") === true;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="namn">Namn</Label>
        <Input
          id="namn"
          type="text"
          placeholder="Ditt namn"
          autoComplete="name"
          {...register("namn", { minLength: 2 })}
          aria-invalid={!!errors.namn}
        />
        {errors.namn && (
          <p className="text-sm text-red-700" role="alert">
            {errors.namn.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="epost">E-post</Label>
        <Input
          id="epost"
          type="email"
          placeholder="din@epost.se"
          autoComplete="email"
          {...register("epost")}
          aria-invalid={!!errors.epost}
        />
        {errors.epost && (
          <p className="text-sm text-red-700" role="alert">
            {errors.epost.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefon">Telefon</Label>
        <Input
          id="telefon"
          type="tel"
          placeholder="070-123 45 67"
          autoComplete="tel"
          {...register("telefon")}
          aria-invalid={!!errors.telefon}
        />
        {errors.telefon && (
          <p className="text-sm text-red-700" role="alert">
            {errors.telefon.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="kundtyp">Jag är</Label>
        <Select
          value={kundtypValue || undefined}
          onValueChange={(v) => setValue("kundtyp", v === "privat" || v === "foretag" ? v : undefined)}
        >
          <SelectTrigger id="kundtyp" aria-invalid={!!errors.kundtyp}>
            <SelectValue placeholder="Välj" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="privat">Privatperson</SelectItem>
            <SelectItem value="foretag">Företag</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 border-t border-line pt-6">
        <div className="flex items-start gap-3">
          <Checkbox
            id="consent"
            name="consent"
            checked={consentValue}
            onCheckedChange={(checked) =>
              setValue("consent", checked === true, { shouldValidate: true, shouldDirty: true })
            }
            aria-invalid={!!errors.consent}
            aria-describedby="consent-hint"
            className="mt-0.5"
          />
          <Label htmlFor="consent" className="cursor-pointer text-sm font-normal leading-relaxed text-graphite">
            Jag godkänner att JJ Bygg &amp; Entreprenad behandlar mina uppgifter för att hantera min
            förfrågan.
          </Label>
        </div>
        <p id="consent-hint" className="pl-8 text-sm text-ink-muted">
          Läs hur vi hanterar dina uppgifter i vår{" "}
          <Link
            href="/integritet"
            target="_blank"
            rel="noopener"
            className="font-semibold text-brand-strong underline-offset-2 hover:underline"
          >
            integritetspolicy
          </Link>
          .
        </p>
        {errors.consent && (
          <p className="pl-8 text-sm text-red-700" role="alert">
            {errors.consent.message}
          </p>
        )}
      </div>
    </div>
  );
}
