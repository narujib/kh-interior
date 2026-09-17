import { LoginForm } from "@/components/admin/login-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login Admin | Khakim Interior",
  robots: "noindex, nofollow",
};

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-30">
        <div className="bg-sage/20 absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl"></div>
        <div className="bg-warm-taupe/20 absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl"></div>
      </div>

      <div className="animate-fade-in bg-surface border-border/50 z-10 flex w-full max-w-[400px] flex-col items-center border p-10 shadow-sm md:p-14">
        <h1 className="font-heading text-foreground mb-3 text-center text-3xl md:text-4xl">
          Khakim Interior
        </h1>
        <p className="text-foreground-soft mb-10 text-center text-xs tracking-[0.2em] uppercase">
          Portal Admin
        </p>

        <LoginForm />
      </div>
    </div>
  );
}
