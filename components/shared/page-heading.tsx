import { cn } from "@/lib/utils";
import React from "react";
import { FadeIn } from "./fade-in";

interface PageHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  animated?: boolean;
}

export function PageHeading({
  title,
  subtitle,
  align = "left",
  animated = true,
  className,
  ...props
}: PageHeadingProps) {
  const content = (
    <div
      className={cn(
        "flex flex-col gap-4",
        {
          "text-left": align === "left",
          "text-center items-center": align === "center",
          "text-right items-end": align === "right",
        },
        className
      )}
    >
      <h1
        className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-tight text-foreground"
        {...props}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="max-w-2xl text-base md:text-lg text-foreground-soft font-light">
          {subtitle}
        </p>
      )}
    </div>
  );

  if (!animated) return content;

  return (
    <FadeIn delay={0.1} duration={0.8}>
      {content}
    </FadeIn>
  );
}
