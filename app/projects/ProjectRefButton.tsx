"use client";

import { ActionButtonProps } from "@/lib/types";

export function ProjectRefButton({
    href,
    icon,
    variant = "primary",
    title,
}: ActionButtonProps) {
    const isGithub = title?.toLowerCase().includes("github");

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            title={title}
            aria-label={title}
            itemProp={isGithub ? "codeRepository" : "url"}
            className={`p-3 rounded-full transition-all duration-300 pointer-events-auto flex items-center justify-center shadow-lg ${
                variant === "primary"
                    ? "bg-blue-600 text-white hover:bg-blue-500 hover:scale-110 active:scale-95"
                    : "bg-white/10 text-white border border-white/10 hover:bg-white/20 hover:scale-110 active:scale-95 backdrop-blur-sm"
            }`}
        >
            {icon}
        </a>
    );
}
