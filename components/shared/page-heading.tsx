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
          "items-center text-center": align === "center",
          "items-end text-right": align === "right",
        },
        className
      )}
    >
      <h1
        className="font-heading text-foreground text-4xl leading-tight font-normal sm:text-5xl md:text-6xl lg:text-7xl"
        {...props}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="text-foreground-soft max-w-2xl text-base font-light md:text-lg">
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
