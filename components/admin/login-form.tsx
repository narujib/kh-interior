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
        toast.error("Invalid credentials");
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch {
      toast.error("An error occurred during login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
      <div>
        <label
          htmlFor="username"
          className="text-foreground-soft mb-2 block text-xs tracking-widest uppercase"
        >
          Username
        </label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="focus-visible:border-foreground rounded-none border-b-2 bg-transparent px-0 py-4 focus-visible:ring-0"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="text-foreground-soft mb-2 block text-xs tracking-widest uppercase"
        >
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="focus-visible:border-foreground rounded-none border-b-2 bg-transparent px-0 py-4 focus-visible:ring-0"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-foreground text-white-soft hover:bg-foreground/90 flex w-full items-center justify-center px-8 py-4 text-sm font-medium tracking-widest uppercase transition-colors disabled:opacity-50"
      >
        {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Log In"}
      </button>
    </form>
  );
}
