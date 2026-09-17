"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Kredensial tidak valid");
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch {
      toast.error("Terjadi kesalahan saat login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div className="space-y-1">
        <label
          htmlFor="username"
          className="text-foreground-soft block text-xs tracking-widest uppercase"
        >
          Username
        </label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Masukkan username Anda"
          className="border-border focus-visible:border-foreground rounded-none border-0 border-b bg-transparent px-0 py-5 text-base transition-colors focus-visible:ring-0"
        />
      </div>

      <div className="space-y-1">
        <label
          htmlFor="password"
          className="text-foreground-soft block text-xs tracking-widest uppercase"
        >
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Masukkan password Anda"
          className="border-border focus-visible:border-foreground rounded-none border-0 border-b bg-transparent px-0 py-5 text-base transition-colors focus-visible:ring-0"
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-foreground text-white-soft hover:bg-foreground/90 group relative flex w-full items-center justify-center overflow-hidden px-8 py-4 text-xs font-medium tracking-widest uppercase transition-all duration-300 disabled:opacity-50"
        >
          <span className="relative z-10 flex items-center gap-2">
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Autentikasi...</span>
              </>
            ) : (
              "Masuk"
            )}
          </span>
        </button>
      </div>
    </form>
  );
}
