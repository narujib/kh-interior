import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="bg-background fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="text-foreground-soft h-8 w-8 animate-spin" />
        <p className="text-foreground-soft animate-pulse text-xs tracking-widest uppercase">
          Loading
        </p>
      </div>
    </div>
  );
}
