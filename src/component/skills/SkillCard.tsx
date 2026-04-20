"use client";

import { IconMap } from "@/lib/icon";
import { Skill } from "@/lib/types";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface SkillCardProps {
    category: string;
    skills: Skill[];
    index: number;
}

export const SkillCard = ({ category, skills, index }: SkillCardProps) => {
    const t = useTranslations("Skill");

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="p-5 rounded-[24px] bg-slate-900/40 border border-white/5 backdrop-blur-md hover:border-blue-500/20 transition-all group"
        >
            <h2 className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.2em] mb-4 px-1">
                {category}
            </h2>

            <ul className="space-y-4">
                {skills.map((skill, sIdx) => (
                    <li key={sIdx} className="space-y-1.5 px-1">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2.5">
                                <span
                                    className="text-lg text-blue-500/70 group-hover:text-blue-400 transition-colors"
                                    aria-hidden="true"
                                >
                                    {IconMap[skill.iconName]}
                                </span>
                                <span className="text-sm font-medium tracking-tight text-slate-200">
                                    {skill.name}
                                </span>
                            </div>
                            <span
                                className="text-[10px] font-mono text-slate-500"
                                aria-label={`Proficiency: ${skill.level}%`}
                            >
                                {skill.level}%
                            </span>
                        </div>

                        <div
                            className="relative h-[4px] w-full bg-slate-800/30 rounded-full overflow-hidden"
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
