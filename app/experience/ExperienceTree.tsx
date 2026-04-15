"use client";

import { TreeProps } from "@/lib/types";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export const ExperienceTree = ({
    experiences,
    activeId,
    onHover,
}: TreeProps) => {
    const scrollRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const activeElement = scrollRef.current?.querySelector(
            `[data-id="${activeId}"]`
        );
        if (activeElement) {
            activeElement.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest",
            });
        }
    }, [activeId]);

    const formatYear = (dateStr?: string) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return "";
        return date.toLocaleString("en-US", {
            month: "short",
            year: "numeric",
        });
    };

    return (
        <nav
            className="relative w-full group"
            aria-label="Job experience timeline"
        >
            <div className="lg:hidden absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-20 pointer-events-none" />

            <ul
                ref={scrollRef}
                className="relative flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar border-l-0 lg:border-l border-slate-800 ml-0 lg:ml-4 gap-4 lg:gap-12 pb-8 lg:pb-0 snap-x snap-mandatory"
            >
                {experiences.map((exp) => (
                    <li
                        key={exp._id}
                        data-id={exp._id}
                        onMouseEnter={() => onHover(exp)}
                        onClick={() => onHover(exp)}
                        aria-current={activeId === exp._id ? "true" : undefined}
                        className="relative flex-none w-[70vw] lg:w-full ml-4 lg:ml-8 cursor-pointer group snap-center list-none"
                    >
                        <motion.span
                            initial={false}
                            animate={{
                                scale: activeId === exp._id ? 1.5 : 1,
                                backgroundColor:
                                    activeId === exp._id
                                        ? "#3b82f6"
                                        : "#334155",
                            }}
                            className="hidden lg:block absolute -left-[39px] top-1.5 w-3 h-3 rounded-full ring-4 ring-slate-950 z-10"
                            aria-hidden="true"
                        />

                        <div
                            className={`p-5 lg:p-0 rounded-2xl bg-white/5 lg:bg-transparent transition-all duration-500 transform ${
                                activeId === exp._id
                                    ? "opacity-100 ring-1 ring-blue-500/50 lg:ring-0 translate-y-0"
                                    : "opacity-30 translate-y-1 lg:translate-y-0 hover:opacity-50"
                            }`}
                        >
                            <span className="text-[9px] lg:text-[10px] font-mono text-blue-500 uppercase tracking-widest block">
                                <time dateTime={exp.fromDate}>
                                    {formatYear(exp.fromDate)}
                                </time>
                                {" — "}
                                {exp.isCurrent ? (
                                    "Present"
                                ) : (
                                    <time dateTime={exp.toDate}>
                                        {formatYear(exp.toDate)}
                                    </time>
                                )}
                            </span>

                            <h3 className="text-lg lg:text-2xl font-bold text-white mt-1 leading-tight truncate lg:whitespace-normal">
                                {exp.title}
                            </h3>

                            <p className="text-xs lg:text-sm text-slate-400 mt-1 truncate">
                                {exp.company}
                            </p>

                            <div
                                className="lg:hidden w-full h-1 bg-slate-800 mt-4 rounded-full overflow-hidden"
                                aria-hidden="true"
                            >
                                <motion.div
                                    initial={false}
                                    animate={{
                                        width:
                                            activeId === exp._id
                                                ? "100%"
                                                : "0%",
                                    }}
                                    className="h-full bg-blue-500"
                                />
                            </div>
                        </div>
                    </li>
                ))}
                <li className="flex-none w-12 lg:hidden" aria-hidden="true" />
            </ul>
        </nav>
    );
};
