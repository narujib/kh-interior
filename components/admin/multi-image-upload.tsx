"use client";

import { useState, useRef } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface MultiImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  folder: "custom-interior/projects/gallery";
  disabled?: boolean;
}

export function MultiImageUpload({
  value,
  onChange,
  folder,
  disabled,
}: MultiImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Validate all files first
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 10 * 1024 * 1024) {
        toast.error(`File ${files[i].name} terlalu besar (maks 10MB)`);
        return;
      }
    }

    setIsUploading(true);
    const newUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || `Gagal mengunggah ${file.name}`);
        }

        newUrls.push(result.data.imageUrl);
      }

      onChange([...value, ...newUrls]);
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

  const handleRemove = (indexToRemove: number) => {
    const newValue = [...value];
    newValue.splice(indexToRemove, 1);
    onChange(newValue);
  };

  return (
    <div className="w-full space-y-4">
      {value.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {value.map((url, index) => (
            <div
              key={index}
              className="bg-surface-muted group border-border relative aspect-square w-full overflow-hidden border"
            >
              <Image
                src={url}
                alt={`Unggahan ${index + 1}`}
                fill
                className="object-cover transition-opacity group-hover:opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => handleRemove(index)}
                  className="rounded-full bg-red-500 p-2 text-white shadow-lg transition-colors hover:bg-red-600 disabled:opacity-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        onClick={() =>
          !disabled && !isUploading && fileInputRef.current?.click()
        }
        className={`border-border bg-surface-muted hover:bg-surface-muted/80 flex h-32 w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed transition-colors ${
          disabled || isUploading ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {isUploading ? (
          <div className="text-foreground-soft flex flex-col items-center">
            <Loader2 className="mb-2 h-6 w-6 animate-spin" />
            <p className="text-sm font-medium">Mengunggah...</p>
          </div>
        ) : (
          <div className="text-foreground-soft flex flex-col items-center">
            <UploadCloud className="mb-2 h-6 w-6" />
            <p className="mb-1 text-sm font-medium">Tambah Gambar Pendukung</p>
          </div>
        )}
      </div>
      <input
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={disabled || isUploading}
      />
    </div>
  );
}
