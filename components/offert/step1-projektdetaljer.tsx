"use client";

import type { UseFormRegister, UseFormSetValue, UseFormWatch, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { OffertFormData } from "@/lib/validations/offert";

const JOB_TYPES = [
  { value: "nybyggnad", label: "Nybyggnad" },
  { value: "renovering", label: "Renovering" },
  { value: "tilbyggnad", label: "Tillbyggnad" },
  { value: "badrum", label: "Badrumsrenovering" },
  { value: "kök", label: "Köksrenovering" },
  { value: "fasad", label: "Fasadarbete" },
  { value: "tak", label: "Takarbete" },
  { value: "annat", label: "Annat" },
];

interface Step1Props {
  register: UseFormRegister<OffertFormData>;
  errors: FieldErrors<OffertFormData>;
  setValue: UseFormSetValue<OffertFormData>;
  watch: UseFormWatch<OffertFormData>;
}

export function Step1Projektdetaljer({ register, errors, setValue, watch }: Step1Props) {
  const typValue = watch("typ") ?? "";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="typ">Typ av jobb</Label>
        <Select value={typValue || undefined} onValueChange={(v) => setValue("typ", v)}>
          <SelectTrigger id="typ" className="w-full" aria-invalid={!!errors.typ}>
            <SelectValue placeholder="Välj typ av jobb" />
          </SelectTrigger>
          <SelectContent>
            {JOB_TYPES.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.typ && (
          <p className="text-sm text-red-600" role="alert">
            {errors.typ.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="beskrivning">Beskrivning av projektet</Label>
        <Textarea
          id="beskrivning"
          placeholder="Beskriv vad du vill göra så gott du kan..."
          rows={5}
          className="resize-y"
          {...register("beskrivning", { minLength: 10 })}
          aria-invalid={!!errors.beskrivning}
        />
        {errors.beskrivning && (
          <p className="text-sm text-red-600" role="alert">
            {errors.beskrivning.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="onskatStartdatum">Önskat startdatum</Label>
        <Input
          id="onskatStartdatum"
          type="date"
          {...register("onskatStartdatum")}
          aria-invalid={!!errors.onskatStartdatum}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="budget">Ungefärlig budget (valfritt)</Label>
        <Input
          id="budget"
          type="text"
          placeholder="T.ex. 100 000 – 200 000 kr"
          {...register("budget")}
        />
      </div>
    </div>
  );
}
