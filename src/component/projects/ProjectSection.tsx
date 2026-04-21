"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Layers, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectSection({
    initialProjects,
}: {
    initialProjects: any[];
}) {
    const t = useTranslations("Project");
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const filter = searchParams.get("type") || "all";
    const selectedExpId = searchParams.get("exp");

    const updateQuery = (newParams: Record<string, string | null>) => {
        const params = new URLSearchParams(searchParams.toString());
        Object.entries(newParams).forEach(([key, value]) => {
            if (value === null) {
                params.delete(key);
            } else {
                params.set(key, value);
            }
        });
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const experiences = useMemo(() => {
        const exps: Record<string, string> = {};
        (initialProjects || []).forEach((p) => {
            if (p.experienceId?._id) {
                exps[p.experienceId._id] =
                    p.experienceId.company || p.experienceId.abbrev;
            }
        });
        return Object.entries(exps).map(([id, name]) => ({ id, name }));
    }, [initialProjects]);

    const filteredProjects = (initialProjects || []).filter((p) => {
        const typeMatch =
            filter === "all" ||
            p?.type === filter ||
            p?.type?.toString().includes(filter);

        if (!typeMatch) return false;

        if (filter === "work" && selectedExpId) {
            return p.experienceId?._id === selectedExpId;
        }
        return true;
    });

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <section className="h-full w-full max-w-7xl mx-auto flex flex-col px-6">
            <div className="flex flex-col mb-8 gap-6 shrink-0">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">
                            <span className="text-blue-500">
                                {filteredProjects.length}+
                            </span>{" "}
                            {t("title")}
                        </p>
                    </motion.div>

                    <nav className="flex gap-1 p-1 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-md">
                        {["all", "work", "self_learning"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => {
                                    updateQuery({
                                        type: tab,
                                        exp:
                                            tab === "work"
                                                ? selectedExpId
                                                : null,
                                    });
                                }}
                                className={`px-5 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                                    filter === tab
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "text-slate-400 hover:text-slate-200"
                                }`}
                            >
                                {t(`categories.${tab}`)}
                            </button>
                        ))}
                    </nav>
                </div>

                <AnimatePresence mode="wait">
                    {filter === "work" && experiences.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-wrap gap-2 items-center overflow-hidden"
                        >
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter mr-2">
                                {t("filter_key")}:
                            </span>
                            {experiences.map((exp) => (
                                <button
                                    key={exp.id}
                                    onClick={() => updateQuery({ exp: exp.id })}
                                    className={`px-3 py-1 rounded-lg text-[10px] border transition-all ${
                                        selectedExpId === exp.id
                                            ? "bg-blue-500/20 border-blue-500 text-blue-400"
                                            : "bg-white/5 border-white/10 text-slate-400 hover:border-white/30"
                                    }`}
                                >
                                    {exp.name}
                                </button>
                            ))}
                            {selectedExpId && (
                                <button
                                    onClick={() => updateQuery({ exp: null })}
                                    className="p-1 text-slate-500 hover:text-white transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="relative flex-1 min-h-0">
                <div className="h-full w-full overflow-y-auto no-scrollbar py-6">
                    <motion.div
                        key={filter + selectedExpId}
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-8"
                    >
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project?._id}
                                variants={item}
                                layout
                                className="w-full"
                            >
                                <ProjectCard project={project} index={index} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <div className="py-4 flex justify-between items-center px-2 shrink-0">
                <p className="text-[10px] font-mono text-slate-600 tracking-[0.3em]">
                    TOTAL {filteredProjects.length} PROJECTS
                </p>
                <div className="flex gap-2 items-center text-slate-500">
                    <Layers size={14} />
                    <span className="text-[10px] uppercase font-mono tracking-widest italic animate-pulse">
                        {t("scroll")}
                    </span>
                </div>
            </div>
        </section>
    );
}
