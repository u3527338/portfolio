"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function PageLoader({ text = "loading" }: { text?: string }) {
    const t = useTranslations("General");
    
    return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-transparent">
            <div className="relative flex items-center justify-center">
                <motion.div
                    className="h-24 w-24 rounded-full border-t-2 border-b-2 border-blue-500/50"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                <motion.div
                    className="absolute h-16 w-16 rounded-full border-l-2 border-r-2 border-cyan-400/40"
                    animate={{ rotate: -360 }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                <motion.div
                    className="absolute h-4 w-4 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            <motion.div
                className="mt-8 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <span className="text-xs font-mono tracking-[0.3em] text-blue-400 uppercase">
                    {t(text)}
                </span>
                <div className="mt-2 h-[1px] w-32 bg-slate-800 overflow-hidden">
                    <motion.div
                        className="h-full bg-blue-500"
                        animate={{ x: [-128, 128] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>
            </motion.div>
        </div>
    );
}
