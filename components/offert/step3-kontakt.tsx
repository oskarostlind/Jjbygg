"use client";

import type { UseFormRegister, UseFormSetValue, UseFormWatch, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="namn">Namn</Label>
        <Input
          id="namn"
          type="text"
          placeholder="Ditt namn"
          {...register("namn", { minLength: 2 })}
          aria-invalid={!!errors.namn}
        />
        {errors.namn && (
          <p className="text-sm text-red-600" role="alert">
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
          {...register("epost")}
          aria-invalid={!!errors.epost}
        />
        {errors.epost && (
          <p className="text-sm text-red-600" role="alert">
            {errors.epost.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefon">Telefon (valfritt)</Label>
        <Input
          id="telefon"
          type="tel"
          placeholder="070-123 45 67"
          {...register("telefon")}
          aria-invalid={!!errors.telefon}
        />
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
    </div>
  );
}
