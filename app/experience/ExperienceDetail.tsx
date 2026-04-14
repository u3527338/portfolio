"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const ExperienceDetail = ({ activeExp }: { activeExp: any }) => (
    <AnimatePresence mode="wait">
        <motion.div
            key={activeExp._id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="max-w-xl text-right flex flex-col items-end gap-6 pointer-events-none"
        >
            <div className="h-[2px] w-12 bg-blue-500 rounded-full" />

            <p className="text-xl md:text-3xl font-light text-slate-100 leading-tight italic tracking-tight">
                "{activeExp.shortDesc}"
            </p>

            <div className="pointer-events-auto mt-4">
                {/* 將路徑從 /experience/${id} 改為 /projects?exp=${id} */}
                <Link href={`/projects?exp=${activeExp._id}`} passHref>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-blue-600 text-white border border-white/10 rounded-full font-bold backdrop-blur-md transition-all cursor-pointer group shadow-2xl"
                    >
                        View Case Study{" "}
                        <ArrowRight
                            size={18}
                            className="group-hover:translate-x-2 transition-transform"
                        />
                    </motion.div>
                </Link>
            </div>
        </motion.div>
    </AnimatePresence>
);
