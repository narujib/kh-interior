import { LoginForm } from "@/components/admin/login-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Login | Khakim Interior",
  robots: "noindex, nofollow",
};

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col items-center">
        <h1 className="font-heading mb-2 text-center text-3xl md:text-4xl">
          Khakim Interior
        </h1>
        <p className="text-foreground-soft mb-12 text-center text-sm tracking-widest uppercase">
          Admin Portal
        </p>

        <LoginForm />
      </div>
    </div>
  );
}
