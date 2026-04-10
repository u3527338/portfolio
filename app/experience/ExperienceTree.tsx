"use client";

import { Experience } from "@/lib/types";
import { motion } from "framer-motion";

interface TreeProps {
    experiences: Experience[];
    activeId: string;
    onHover: (exp: Experience) => void;
}

export const ExperienceTree = ({
    experiences,
    activeId,
    onHover,
}: TreeProps) => {
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
        <div className="relative border-l border-slate-800 ml-4 space-y-12">
            {experiences.map((exp) => (
                <div
                    key={exp._id}
                    onMouseEnter={() => onHover(exp)}
                    className="ml-8 relative cursor-pointer group shrink-0"
                >
                    <motion.span
                        initial={false}
                        animate={{
                            scale: activeId === exp._id ? 1.5 : 1,
                            backgroundColor:
                                activeId === exp._id ? "#3b82f6" : "#334155",
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                        }}
                        className="absolute -left-[39px] top-1.5 w-3 h-3 rounded-full ring-4 ring-slate-950 transition-colors z-10"
                    />

                    <div
                        className={`transition-all duration-300 transform ${
                            activeId === exp._id
                                ? "opacity-100 translate-x-2"
                                : "opacity-30 hover:opacity-50"
                        }`}
                    >
                        <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest leading-none">
                            {formatYear(exp.fromDate)} —{" "}
                            {exp.isCurrent
                                ? "Present"
                                : exp.toDate
                                ? formatYear(exp.toDate)
                                : "N/A"}
                        </span>

                        <h3 className="text-xl lg:text-2xl font-bold text-white mt-1 leading-tight">
                            {exp.title}
                        </h3>

                        <p className="text-sm text-slate-400 mt-1">
                            {exp.company}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
