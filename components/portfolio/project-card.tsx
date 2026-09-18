import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  slug: string;
  coverImage: string;
  clientName?: string;
  className?: string;
  priority?: boolean;
}

export function ProjectCard({
  title,
  slug,
  coverImage,
  clientName,
  className,
  priority = false,
}: ProjectCardProps) {
  return (
    <Link
      href={`/portfolio/${slug}`}
      className={cn("group block overflow-hidden", className)}
    >
      <div className="bg-surface-muted relative mb-6 aspect-[4/5] w-full overflow-hidden">
        <Image
          src={coverImage}
          alt={title}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Subtle overlay on hover */}
        <div className="bg-black-soft/0 group-hover:bg-black-soft/10 absolute inset-0 transition-colors duration-500" />
      </div>

      <div className="flex flex-col gap-1 px-1">
        <h3 className="font-heading text-foreground group-hover:text-foreground-soft text-2xl font-medium transition-colors md:text-3xl">
          {title}
        </h3>
        {clientName && (
          <p className="text-foreground-soft text-sm font-light tracking-widest uppercase">
            {clientName}
          </p>
        )}
      </div>
    </Link>
  );
}
