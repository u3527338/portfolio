"use client";

import popsiblePic from "@/public/image/experiences/popsible_bg.jpeg";
import profilePic from "@/public/image/hero.png";
import { motion } from "framer-motion";
import { useState } from "react";
import { ExperienceBackground } from "./ExperienceBackground";
import { ExperienceDetail } from "./ExperienceDetail";
import { ExperienceTree } from "./ExperienceTree";

const experiences = [
    {
        id: "0",
        title: "Senior Software Developer",
        company: "Hong Kong Science and Technology Parks Corporation",
        period: "Apr 2024 - Present",
        shortDesc:
            "Building scalable internal workflow solutions with React and Node.js. Translating complex business requirements into high-performance web applications across key administrative sectors.",
        bgImage: profilePic,
    },
    {
        id: "1",
        title: "Front-end Software Developer",
        company: "Build King - Cerebro Strategy Limited",
        period: "Dec 2022 - Feb 2024",
        shortDesc: "描述內容 2...",
        bgImage: profilePic,
    },
    {
        id: "2",
        title: "Front-end Software Developer",
        company: "Popsible Limited",
        period: "Mar 2022 - Dec 2022",
        shortDesc: "描述內容 3...",
        bgImage: popsiblePic,
    },
    {
        id: "3",
        title: "Front-end Software Developer",
        company: "The Win Win Group",
        period: "Aug 2020 - Mar 2022",
        shortDesc: "描述內容 4...",
        bgImage: profilePic,
    },
];

export default function Page() {
    const [activeExp, setActiveExp] = useState(experiences[0]);

    return (
        <section className="relative h-full w-full bg-slate-950 overflow-hidden flex items-center">
            <ExperienceBackground activeBg={activeExp.bgImage} />

            <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-between px-10 lg:px-24 pt-20">
                <div className="w-full lg:w-1/3 flex flex-col justify-center h-full max-h-[70vh]">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs font-mono text-blue-500 tracking-[0.6em] uppercase mb-10 shrink-0"
                    >
                        Experience
                    </motion.h2>

                    <div className="overflow-y-auto no-scrollbar pr-4 py-4">
                        <ExperienceTree
                            experiences={experiences}
                            activeId={activeExp.id}
                            onHover={setActiveExp}
                        />
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex justify-end items-end pb-20 lg:pb-32">
                    <ExperienceDetail activeExp={activeExp} />
                </div>
            </div>
        </section>
    );
}
