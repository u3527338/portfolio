"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export const ExperienceBackground = ({
    activeBg,
}: {
    activeBg: string; 
}) => (
    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none">
        <AnimatePresence>
            <motion.div
                key={activeBg} 
                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                animate={{ opacity: 0.4, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0 h-full w-full"
            >
                {activeBg && (
                    <Image
                        src={activeBg}
                        alt="Work context"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent" />
            </motion.div>
        </AnimatePresence>
    </div>
);
