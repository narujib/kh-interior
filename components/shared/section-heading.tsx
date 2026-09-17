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
          "mb-12 flex flex-col sm:mb-16 md:mb-20",
          {
            "items-start text-left": align === "left",
            "items-center text-center": align === "center",
          },
          className
        )}
        {...props}
      >
        {(numbering || subtitle) && (
          <div className="text-foreground-soft mb-4 flex items-center gap-4 text-xs tracking-widest uppercase sm:mb-6 sm:text-sm">
            {numbering && <span className="font-medium">{numbering}</span>}
            {numbering && subtitle && (
              <span className="bg-border h-[1px] w-8" />
            )}
            {subtitle && <span>{subtitle}</span>}
          </div>
        )}
        <h2 className="font-heading text-3xl leading-tight font-normal sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h2>
      </div>
    </FadeIn>
  );
}
