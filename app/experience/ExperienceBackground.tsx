"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

export const ExperienceBackground = ({
    activeBg,
}: {
    activeBg: StaticImageData;
}) => (
    <div className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
            <motion.div
                key={activeBg.src}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.4, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="relative h-full w-full"
            >
                <Image
                    src={activeBg}
                    alt="Work context"
                    fill
                    priority
                    // placeholder="blur"
                    className="object-cover object-center"
                />
            </motion.div>
        </AnimatePresence>
    </div>
);
