"use client";

import { Link } from "@/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export const ExperienceDetail = ({ activeExp }: { activeExp: any }) => {
    const t = useTranslations("Experience");

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={activeExp._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full flex flex-col items-end gap-3"
            >
                <div className="h-[2px] w-12 bg-blue-500 rounded-full shrink-0" />

                <div className="w-full">
                    <blockquote className="space-y-2">
                        <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extralight text-slate-100 leading-tight italic text-right break-words">
                            <span className="text-blue-500 opacity-50">"</span>
                            {activeExp.shortDesc}
                            <span className="text-blue-500 opacity-50">"</span>
                        </p>
                    </blockquote>
                </div>

                <div className="shrink-0 pt-2">
                    <Link
                        href={`/projects?type=work&exp=${activeExp._id}`}
                        className="inline-block"
                    >
                        <motion.div
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg"
                        >
                            <span className="text-[10px] tracking-widest uppercase">{t("details")}</span>
                            <ArrowRight size={16} />
                        </motion.div>
                    </Link>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};