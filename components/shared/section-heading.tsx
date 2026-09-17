import { cn } from "@/lib/utils";
import React from "react";
import { FadeIn } from "./fade-in";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  numbering?: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  numbering,
  subtitle,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <FadeIn direction="up">
      <div
        className={cn(
          "flex flex-col mb-12 sm:mb-16 md:mb-20",
          {
            "items-start text-left": align === "left",
            "items-center text-center": align === "center",
          },
          className
        )}
        {...props}
      >
        {(numbering || subtitle) && (
          <div className="flex items-center gap-4 mb-4 sm:mb-6 text-xs sm:text-sm tracking-widest uppercase text-foreground-soft">
            {numbering && <span className="font-medium">{numbering}</span>}
            {numbering && subtitle && (
              <span className="w-8 h-[1px] bg-border" />
            )}
            {subtitle && <span>{subtitle}</span>}
          </div>
        )}
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-tight">
          {title}
        </h2>
      </div>
    </FadeIn>
  );
}
