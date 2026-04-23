"use client";

import { Skill } from "@/lib/types";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react";

interface SkillCardProps {
    category: string;
    skills: Skill[];
    index: number;
}

export const SkillCard = ({ category, skills, index }: SkillCardProps) => {
    const t = useTranslations("Skill.categories");

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="p-5 rounded-[24px] bg-slate-900/40 border border-white/5 backdrop-blur-md hover:border-blue-500/20 transition-all group"
        >
            <h2 className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.2em] mb-5 px-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                {t(category)}
            </h2>

            <ul className="space-y-5">
                {skills.map((skill, sIdx) => (
                    <li key={sIdx} className="space-y-2 px-1">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="relative flex items-center justify-center w-6 h-6">
                                    <Icon
                                        icon={skill.iconName || "ph:code-bold"}
                                        className="text-xl text-blue-400/80 group-hover:text-blue-400 transition-all duration-300 group-hover:scale-110 z-10"
                                    />
                                    <div className="absolute inset-0 bg-blue-500/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <span className="text-sm font-medium tracking-tight text-slate-200 group-hover:text-white transition-colors">
                                    {skill.name}
                                </span>
                            </div>
                            <span
                                className="text-[10px] font-mono text-slate-500 group-hover:text-blue-400/70 transition-colors"
                                aria-label={`Proficiency: ${skill.level}%`}
                            >
                                {skill.level}%
                            </span>
                        </div>

                        <div
                            className="relative h-[4px] w-full bg-slate-800/50 rounded-full overflow-hidden"
                            role="progressbar"
                            aria-valuenow={skill.level}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        >
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{
                                    duration: 1.5,
                                    ease: "circOut",
                                    delay: 0.5 + index * 0.1,
                                }}
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-300 rounded-full"
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </motion.section>
    );
};
