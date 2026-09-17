"use client";

import { useState, useRef } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  folder:
    | "custom-interior/projects/covers"
    | "custom-interior/projects/gallery"
    | "custom-interior/gallery";
  disabled?: boolean;
}

export function ImageUpload({
  value,
  onChange,
  folder,
  disabled,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Ukuran file melebihi batas 10MB.");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Gagal mengunggah gambar");
      }

      onChange(result.data.imageUrl);
      toast.success("Gambar berhasil diunggah");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Gagal mengunggah gambar"
      );
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="w-full">
      {value ? (
        <div className="bg-surface-muted group border-border relative aspect-video w-full overflow-hidden border">
          <Image
            src={value}
            alt="Pratinjau unggahan"
            fill
            className="object-cover transition-opacity group-hover:opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              disabled={disabled}
              onClick={() => onChange("")}
              className="rounded-full bg-red-500 p-3 text-white shadow-lg transition-colors hover:bg-red-600 disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() =>
            !disabled && !isUploading && fileInputRef.current?.click()
          }
          className={`border-border bg-surface-muted hover:bg-surface-muted/80 flex h-48 w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed transition-colors ${
            disabled || isUploading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isUploading ? (
            <div className="text-foreground-soft flex flex-col items-center">
              <Loader2 className="mb-4 h-8 w-8 animate-spin" />
              <p className="text-sm font-medium">Mengunggah...</p>
            </div>
          ) : (
            <div className="text-foreground-soft flex flex-col items-center">
              <UploadCloud className="mb-4 h-8 w-8" />
              <p className="mb-1 text-sm font-medium">
                Klik untuk mengunggah gambar
              </p>
              <p className="text-xs">JPG, PNG, WEBP hingga 10MB</p>
            </div>
          )}
        </div>
      )}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={disabled || isUploading}
      />
    </div>
  );
}
