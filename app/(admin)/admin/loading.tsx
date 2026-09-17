import { Loader2 } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <div className="text-foreground-soft flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="font-heading text-sm tracking-widest uppercase">
          Loading...
        </p>
      </div>
    </div>
  );
}
