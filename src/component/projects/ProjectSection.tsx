"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Layers, Loader2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";
import ProjectCard from "./ProjectCard";
import { SkeletonCard } from "./SkeletonCard";

export default function ProjectSection({
    initialProjects = [],
}: {
    initialProjects: any[];
}) {
    const t = useTranslations("Project");
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [isPending, startTransition] = useTransition();

    const [activeFilter, setActiveFilter] = useState(
        searchParams?.get("type") || "all"
    );
    const [activeExpId, setActiveExpId] = useState(
        searchParams?.get("exp") || null
    );
    useEffect(() => {
        setActiveFilter(searchParams?.get("type") || "all");
        setActiveExpId(searchParams?.get("exp") || null);
    }, [searchParams]);

    const updateQuery = (type: string, exp: string | null) => {
        setActiveFilter(type);
        setActiveExpId(exp);

        const params = new URLSearchParams(searchParams.toString());
        params.set("type", type);
        if (exp === null) {
            params.delete("exp");
        } else {
            params.set("exp", exp);
        }

        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`, {
                scroll: false,
            });
        });
    };

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

    const filteredProjects = useMemo(() => {
        if (!initialProjects.length) return [];
        return initialProjects.filter((p) => {
            const typeMatch =
                activeFilter === "all" ||
                p?.type === activeFilter ||
                p?.type?.toString().includes(activeFilter);

            if (!typeMatch) return false;

            if (activeFilter === "work" && activeExpId) {
                return p.experienceId?._id === activeExpId;
            }
            return true;
        });
    }, [initialProjects, activeFilter, activeExpId]);

    return (
        <section className="h-full w-full max-w-7xl mx-auto flex flex-col px-6">
            <div className="flex flex-col mb-8 gap-6 shrink-0">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <p className="text-slate-500 font-mono text-xs uppercase tracking-widest flex items-center gap-3">
                            {isPending ? (
                                <Loader2
                                    size={14}
                                    className="animate-spin text-blue-500"
                                />
                            ) : (
                                <span className="text-blue-500 font-bold">
                                    {filteredProjects.length}
                                </span>
                            )}
                            {t("title")}
                        </p>
                    </motion.div>

                    <nav className="flex gap-1 p-1 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-md">
                        {["all", "work", "self_learning"].map((tab) => {
                            const isCurrent = activeFilter === tab;
                            return (
                                <button
                                    key={tab}
                                    onClick={() =>
                                        updateQuery(
                                            tab,
                                            tab === "work" ? activeExpId : null
                                        )
                                    }
                                    className={`relative px-5 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                                        isCurrent
                                            ? "text-white"
                                            : "text-slate-500 hover:text-slate-300"
                                    }`}
                                >
                                    {isCurrent && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20"
                                            transition={{
                                                type: "spring",
                                                bounce: 0.2,
                                                duration: 0.6,
                                            }}
                                        />
                                    )}
                                    <span className="relative z-10">
                                        {t(`categories.${tab}`)}
                                    </span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <AnimatePresence mode="wait">
                    {activeFilter === "work" && experiences.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-wrap gap-2 items-center"
                        >
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter mr-2">
                                {t("filter_key")}:
                            </span>
                            {experiences.map((exp) => (
                                <button
                                    key={exp.id}
                                    onClick={() => updateQuery("work", exp.id)}
                                    className={`px-3 py-1 rounded-lg text-[10px] border transition-all ${
                                        activeExpId === exp.id
                                            ? "bg-blue-500/20 border-blue-500 text-blue-400"
                                            : "bg-white/5 border-white/10 text-slate-400 hover:border-white/30"
                                    }`}
                                >
                                    {exp.name}
                                </button>
                            ))}
                            {activeExpId && (
                                <button
                                    onClick={() => updateQuery("work", null)}
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
                        <AnimatePresence mode="popLayout">
                            {isPending
                                ? Array.from({ length: 6 }).map((_, i) => (
                                      <motion.div
                                          key={`skeleton-${i}`}
                                          initial={{ opacity: 0 }}
                                          animate={{ opacity: 1 }}
                                          exit={{ opacity: 0 }}
                                      >
                                          <SkeletonCard />
                                      </motion.div>
                                  ))
                                : filteredProjects.map((project, index) => (
                                      <motion.div
                                          key={project?._id}
                                          layout
                                          initial={{ opacity: 0, scale: 0.9 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          exit={{ opacity: 0, scale: 0.9 }}
                                          transition={{
                                              duration: 0.4,
                                              type: "spring",
                                              bounce: 0,
                                          }}
                                          className="w-full"
                                      >
                                          <ProjectCard
                                              project={project}
                                              index={index}
                                          />
                                      </motion.div>
                                  ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            <div className="py-4 flex justify-between items-center px-2 shrink-0 border-t border-white/5">
                <p className="text-[10px] font-mono text-slate-600 tracking-[0.3em] uppercase">
                    {isPending
                        ? "Syncing Data..."
                        : `Total Output: ${filteredProjects.length}`}
                </p>
                <div className="flex gap-2 items-center text-slate-500">
                    <Layers
                        size={14}
                        className={
                            isPending ? "animate-spin text-blue-500" : ""
                        }
                    />
                    <span className="text-[10px] uppercase font-mono tracking-widest italic">
                        {isPending ? "Loading Grid" : t("scroll")}
                    </span>
                </div>
            </div>
        </section>
    );
}
