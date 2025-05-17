import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BadgeProps {
    children: ReactNode;
    className?: string;
    variant?: "default" | "outline";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium",
                variant === "default" && "bg-primary text-primary-foreground",
                variant === "outline" && "border border-input bg-transparent shadow-sm",
                className
            )}
        >
      {children}
    </span>
    );
}