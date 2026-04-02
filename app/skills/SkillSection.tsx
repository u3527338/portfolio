import { motion } from "framer-motion";
import { AiFillFileExcel } from "react-icons/ai";
import { FaAws, FaBolt } from "react-icons/fa";
import {
  SiDocker,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiPython,
  SiRabbitmq,
  SiReact,
  SiSocketdotio,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const skillGroups = [
    {
        category: "Frontend Mastery",
        skills: [
            { name: "NextJS / ReactJS", level: 95, icon: <SiNextdotjs /> },
            { name: "React Native", level: 85, icon: <SiReact /> },
            { name: "Typescript", level: 90, icon: <SiTypescript /> },
            { name: "HTML / JS / CSS", level: 100, icon: <SiTailwindcss /> },
        ],
    },
    {
        category: "Backend & Real-time",
        skills: [
            { name: "Python", level: 88, icon: <SiPython /> },
            { name: "Express", level: 88, icon: <SiExpress /> },
            { name: "WebSocket", level: 80, icon: <SiSocketdotio /> },
            { name: "Message Queue", level: 75, icon: <SiRabbitmq /> },
        ],
    },
    {
        category: "Database & DevOps",
        skills: [
            { name: "SQL (MySQL)", level: 85, icon: <SiMysql /> },
            { name: "NoSQL (MongoDB)", level: 82, icon: <SiMongodb /> },
            { name: "AWS", level: 80, icon: <FaAws /> },
            { name: "Docker", level: 80, icon: <SiDocker /> },
        ],
    },
    {
        category: "Business Automation",
        skills: [
            {
                name: "Power Automate",
                level: 90,
                icon: <FaBolt className="text-yellow-400" />,
            },
            {
                name: "Microsoft Office",
                level: 95,
                icon: <AiFillFileExcel className="text-green-600" />,
            },
        ],
    },
];

export default function SkillSection() {
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
                                            {skill.icon}
                                        </span>
                                        <span className="font-medium tracking-tight">
                                            {skill.name}
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-mono text-slate-500">
                                        {skill.level}%
                                    </span>
                                </div>

                                {/* HP Bar - 稍微變細以節省高度 */}
                                <div className="relative h-[4px] w-full bg-slate-800/30 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{
                                            width: `${skill.level}%`,
                                        }}
                                        transition={{
                                            duration: 1.2,
                                            ease: "circOut",
                                            delay: 0.3 + gIdx * 0.1,
                                        }}
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-300 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.3)]"
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
