"use client";

import { ReactNode } from "react";

interface ActionButtonProps {
    href: string;
    icon: ReactNode;
    variant?: "primary" | "secondary";
    title?: string;
}

export function ProjectRefButton({
    href,
    icon,
    variant = "primary",
    title,
}: ActionButtonProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title={title}
            className={`p-3 rounded-full transition-colors pointer-events-auto ${
                variant === "primary"
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "bg-white/10 text-white border border-white/10 hover:bg-white/20"
            }`}
        >
            {icon}
        </a>
    );
}
