"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Layers, X } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProjectCard from "./ProjectCard";

export default function ProjectSection({
    initialProjects,
}: {
    initialProjects: any[];
}) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const expQuery = searchParams.get("exp");
    const [filter, setFilter] = useState("All");
    const [selectedExpId, setSelectedExpId] = useState<string | null>(null);

    const experiences = useMemo(() => {
        const exps: Record<string, string> = {};
        initialProjects.forEach((p) => {
            if (p.experienceId?._id) {
                exps[p.experienceId._id] =
                    p.experienceId.company || p.experienceId.abbrev;
            }
        });
        return Object.entries(exps).map(([id, name]) => ({ id, name }));
    }, [initialProjects]);

    useEffect(() => {
        if (expQuery) {
            setFilter("Work");
            setSelectedExpId(expQuery);
        }
    }, [expQuery]);

    const filteredProjects = (initialProjects || []).filter((p) => {
        const typeMatch =
            filter === "All" ||
            p?.type === filter ||
            p?.type?.toString().includes(filter);
        if (!typeMatch) return false;

        if (filter === "Work" && selectedExpId) {
            return p.experienceId?._id === selectedExpId;
        }
        return true;
    });

    const clearExpFilter = () => {
        setSelectedExpId(null);
        router.push("/projects", { scroll: false });
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
                                {(filteredProjects || []).length}+
                            </span>{" "}
                            Industrial & Personal Works
                        </p>
                    </motion.div>

                    <div className="flex gap-1 p-1 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-md">
                        {["All", "Work", "Self-Learning"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setFilter(tab);
                                    if (tab !== "Work") setSelectedExpId(null);
                                }}
                                className={`px-5 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                                    filter === tab
                                        ? "bg-blue-600 text-white shadow-lg"
                                        : "text-slate-400 hover:text-slate-200"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence>
                    {filter === "Work" && experiences.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-wrap gap-2 items-center"
                        >
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter mr-2">
                                Filter by Company:
                            </span>
                            {experiences.map((exp) => (
                                <button
                                    key={exp.id}
                                    onClick={() => setSelectedExpId(exp.id)}
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
                                    onClick={clearExpFilter}
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
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-8"
                    >
                        <AnimatePresence mode="popLayout" initial={false}>
                            {filteredProjects.map((project) => (
                                <motion.div
                                    layout
                                    key={project?._id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full"
                                >
                                    <ProjectCard project={project} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
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
                        Scroll to explore
                    </span>
                </div>
            </div>
        </section>
    );
}
