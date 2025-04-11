"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function Spinner({
                     className,
                     size = "default",
                     ...props
                 }: React.ComponentProps<"svg"> & {
    size?: "sm" | "default" | "lg" | "xl"
}) {
    const sizeClasses = {
        sm: "h-4 w-4",
        default: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-10 w-10",
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
                "animate-spin text-muted-foreground",
                sizeClasses[size],
                className
            )}
            {...props}
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    )
}

export { Spinner }