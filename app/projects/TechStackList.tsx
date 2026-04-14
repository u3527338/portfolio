"use client";

import { TechStackProps } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

const maxTech = 3;

export function TechStackList({ tech = [] }: TechStackProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const allTech = tech
        .map((t) => (typeof t === "string" ? t : t.name))
        .filter(Boolean);
    const visibleTech = isExpanded ? allTech : allTech.slice(0, maxTech);
    const remainingCount = allTech.length - maxTech;

    return (
        <div className="flex items-center justify-between gap-2 pt-2 w-full overflow-hidden pointer-events-auto">
            <motion.div
                ref={scrollRef}
                layout
                className={`flex flex-nowrap gap-2 no-scrollbar flex-1 ${
                    isExpanded ? "overflow-x-auto" : "overflow-hidden"
                }`}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                }}
            >
                <AnimatePresence mode="popLayout">
                    {visibleTech.map((techName, index) => (
                        <motion.span
                            key={`${techName}-${index}`}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex-shrink-0 px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-400 whitespace-nowrap cursor-pointer hover:bg-white/10 transition-colors"
                        >
                            {techName}
                        </motion.span>
                    ))}
                </AnimatePresence>
            </motion.div>

            {!isExpanded && remainingCount > 0 && (
                <motion.button
                    layoutId="plus-tag"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(true);
                    }}
                    className="flex-shrink-0 ml-auto px-2 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-400 font-mono hover:bg-blue-500/20"
                >
                    +{remainingCount}
                </motion.button>
            )}
        </div>
    );
}
