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

import { MAX_IMAGE_BYTES, MAX_IMAGE_MB } from "@/lib/offert-upload";

const MAX_FILES = 10;
const ACCEPTED = "image/jpeg,image/png,image/webp,image/gif";

interface Step2Props {
  register: UseFormRegister<OffertFormData>;
  errors: FieldErrors<OffertFormData>;
  setValue: UseFormSetValue<OffertFormData>;
  watch: UseFormWatch<OffertFormData>;
  imageFiles: File[];
  onImageFilesChange: (files: File[]) => void;
}

export function Step2MediaPlats({
  register,
  errors,
  setValue,
  watch,
  imageFiles,
  onImageFilesChange,
}: Step2Props) {
  const rotValue = watch("rot");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const chosen = Array.from(e.target.files ?? []);
    const valid: File[] = [];
    for (const file of chosen) {
      if (!file.type.startsWith("image/")) continue;
      if (file.size > MAX_IMAGE_BYTES) continue;
      valid.push(file);
    }
    onImageFilesChange([...imageFiles, ...valid].slice(0, MAX_FILES));
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    onImageFilesChange(imageFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="bilder">Bilder av projektet (valfritt, max {MAX_FILES} st, {MAX_IMAGE_MB} MB per fil)</Label>
        <Input
          id="bilder"
          type="file"
          accept={ACCEPTED}
          multiple
          onChange={handleFileChange}
          className="cursor-pointer"
        />
        {imageFiles.length > 0 && (
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {imageFiles.map((file, i) => (
              <li key={i} className="flex items-center justify-between gap-2">
                <span className="truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="text-accent hover:underline"
                >
                  Ta bort
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="postnummer">Postnummer</Label>
        <Input
          id="postnummer"
          type="text"
          placeholder="T.ex. 123 45"
          {...register("postnummer")}
          aria-invalid={!!errors.postnummer}
        />
        {errors.postnummer && (
          <p className="text-sm text-red-600" role="alert">
            {errors.postnummer.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="rot">Önskar du ROT-avdrag?</Label>
        <Select
          value={rotValue ? "ja" : "nej"}
          onValueChange={(v) => setValue("rot", v === "ja")}
        >
          <SelectTrigger id="rot" aria-invalid={!!errors.rot}>
            <SelectValue placeholder="Välj" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ja">Ja</SelectItem>
            <SelectItem value="nej">Nej</SelectItem>
          </SelectContent>
        </Select>
        {errors.rot && (
          <p className="text-sm text-red-600" role="alert">
            {errors.rot.message}
          </p>
        )}
      </div>
    </div>
  );
}
