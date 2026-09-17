"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      toast.success("Pesan berhasil dikirim", {
        description: "Kami akan segera menghubungi Anda kembali.",
      });

      reset();
    } catch (error) {
      toast.error("Gagal mengirim pesan", {
        description:
          error instanceof Error ? error.message : "Silakan coba lagi nanti.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div>
        <label
          htmlFor="name"
          className="text-foreground-soft mb-2 block text-xs tracking-widest uppercase"
        >
          Nama
        </label>
        <Input
          id="name"
          placeholder="Nama lengkap Anda"
          {...register("name")}
          className={`focus-visible:border-foreground rounded-none border-b-2 bg-transparent px-0 py-4 focus-visible:ring-0 ${
            errors.name ? "border-red-500" : "border-border"
          }`}
        />
        {errors.name && (
          <p className="mt-2 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="text-foreground-soft mb-2 block text-xs tracking-widest uppercase"
        >
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Alamat email Anda"
          {...register("email")}
          className={`focus-visible:border-foreground rounded-none border-b-2 bg-transparent px-0 py-4 focus-visible:ring-0 ${
            errors.email ? "border-red-500" : "border-border"
          }`}
        />
        {errors.email && (
          <p className="mt-2 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="message"
          className="text-foreground-soft mb-2 block text-xs tracking-widest uppercase"
        >
          Pesan
        </label>
        <Textarea
          id="message"
          placeholder="Ceritakan tentang proyek Anda..."
          rows={5}
          {...register("message")}
          className={`focus-visible:border-foreground resize-none rounded-none border-b-2 bg-transparent px-0 py-4 focus-visible:ring-0 ${
            errors.message ? "border-red-500" : "border-border"
          }`}
        />
        {errors.message && (
          <p className="mt-2 text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-foreground text-white-soft hover:bg-foreground/90 group inline-flex w-full items-center justify-center gap-4 px-8 py-5 text-sm font-medium tracking-widest uppercase transition-colors disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Mengirim...
          </>
        ) : (
          <>
            Kirim Pesan
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
