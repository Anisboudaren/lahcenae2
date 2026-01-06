import { cn } from "@/lib/utils";
import { ReactNode, CSSProperties, forwardRef } from "react";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
}

export const SectionContainer = forwardRef<HTMLElement, SectionContainerProps>(
  ({ children, className, id, style }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          "w-full py-16 md:py-24 lg:py-32",
          "px-4 sm:px-6 lg:px-8",
          "max-w-7xl mx-auto",
          className
        )}
        style={style}
      >
        {children}
      </section>
    );
  }
);

SectionContainer.displayName = "SectionContainer";
