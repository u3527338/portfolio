"use client";

import { motion } from "framer-motion";
import SkillSection from "./SkillSection";

export default function Page() {
    return (
        <div className="w-full h-full max-w-6xl mx-auto flex flex-col justify-center px-4">
            <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-3xl font-bold text-white mb-6 text-center lg:text-left"
            >
                Technical <span className="text-blue-500">Skills</span>
            </motion.h2>
            <SkillSection />
        </div>
    );
}
