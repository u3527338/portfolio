"use client";
import { motion } from "framer-motion";
import { StaticImageData } from "next/image"; // 記得引入這個型別

// 修正後的介面，必須包含所有傳遞進來的屬性
interface Experience {
    id: string;
    title: string;
    company: string;
    period: string;
    shortDesc: string; // 新增這行
    bgImage: StaticImageData; // 新增這行
}

interface TreeProps {
    experiences: Experience[];
    activeId: string;
    onHover: (exp: Experience) => void;
}

export const ExperienceTree = ({
    experiences,
    activeId,
    onHover,
}: TreeProps) => (
    <div className="relative border-l border-slate-800 ml-4 space-y-12">
        {experiences.map((exp) => (
            <div
                key={exp.id}
                onMouseEnter={() => onHover(exp)} // 現在型別完全匹配了
                className="ml-8 relative cursor-pointer group shrink-0"
            >
                {/* 節點圓圈 */}
                <motion.span
                    animate={{
                        scale: activeId === exp.id ? 1.5 : 1,
                        backgroundColor:
                            activeId === exp.id ? "#3b82f6" : "#334155",
                    }}
                    className="absolute -left-[39px] top-1.5 w-3 h-3 rounded-full ring-4 ring-slate-950 transition-colors"
                />

                <div
                    className={`transition-all duration-300 ${
                        activeId === exp.id
                            ? "opacity-100 translate-x-2"
                            : "opacity-30"
                    }`}
                >
                    <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest leading-none">
                        {exp.period}
                    </span>
                    <h3 className="text-xl lg:text-2xl font-bold text-white mt-1 leading-tight">
                        {exp.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">{exp.company}</p>
                </div>
            </div>
        ))}
    </div>
);
