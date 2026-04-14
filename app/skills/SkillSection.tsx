"use client";

import { IconMap } from "@/lib/icon";
import { SkillGroup } from "@/lib/types";
import { motion } from "framer-motion";

export default function SkillClient({
    skillGroups,
}: {
    skillGroups: SkillGroup[];
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
            {skillGroups.map((group, gIdx) => (
                <motion.div
                    key={gIdx}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: gIdx * 0.1 }}
                    className="p-4 lg:p-5 rounded-[24px] bg-slate-900/40 border border-white/5 backdrop-blur-md hover:border-blue-500/20 transition-all group"
                >
                    <h3 className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.2em] mb-4 px-1">
                        {group.category}
                    </h3>

                    <div className="space-y-3.5">
                        {group.skills.map((skill, sIdx) => (
                            <div key={sIdx} className="space-y-1.5 px-1">
                                <div className="flex justify-between items-center text-xs">
                                    <div className="flex items-center gap-2.5 text-slate-200">
                                        <span className="text-lg text-blue-500/70 group-hover:text-blue-400 transition-colors">
                                            {IconMap[skill.iconName]}
                                        </span>
                                        <span className="font-medium tracking-tight">
                                            {skill.name}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-mono text-slate-500">
                                        {skill.level}%
                                    </span>
                                </div>

                                <div className="relative h-[4px] w-full bg-slate-800/30 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.level}%` }}
                                        transition={{
                                            duration: 1.2,
                                            ease: "circOut",
                                            delay: 0.3 + gIdx * 0.1,
                                        }}
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-300 rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
