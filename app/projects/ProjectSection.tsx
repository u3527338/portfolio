"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Briefcase, User, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function ProjectSection({
    initialProjects,
}: {
    initialProjects: any[];
}) {
    const [filter, setFilter] = useState("All");

    const filteredProjects = initialProjects.filter((p) =>
        filter === "All" ? true : p.source.includes(filter)
    );

    return (
        <section className="h-full w-full max-w-7xl mx-auto flex flex-col justify-center px-6">
            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6 shrink-0">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter">
                        Featured <span className="text-blue-500">Projects</span>
                    </h2>
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-2">
                        {initialProjects.length}+ Industrial & Personal Works
                    </p>
                </motion.div>

                <div className="flex gap-1 p-1 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-md">
                    {["All", "Work", "Self-Learning"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
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

            {/* Bento Grid Area */}
            <div className="relative h-[65vh]">
                <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-slate-950 to-transparent z-20 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-slate-950 to-transparent z-20 pointer-events-none" />

                <div className="h-full w-full overflow-y-auto no-scrollbar py-6">
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, idx) => (
                                <motion.div
                                    layout
                                    key={project.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: idx * 0.05,
                                    }}
                                    whileHover={{ y: -8 }}
                                    className={`relative rounded-[32px] overflow-hidden group border border-white/5 bg-slate-900/40 backdrop-blur-md 
                                    ${
                                        project.size === "large"
                                            ? "md:col-span-2 md:row-span-2"
                                            : "md:col-span-1 md:row-span-1"
                                    }`}
                                >
                                    {/* Link for SEO Crawler (關鍵點：讓爬蟲能順著連結走) */}
                                    <Link
                                        href={`/projects/${project.id}`}
                                        className="absolute inset-0 z-30"
                                    >
                                        <span className="sr-only">
                                            View {project.title}
                                        </span>
                                    </Link>

                                    {/* Source Tag */}
                                    <div className="absolute top-6 left-6 z-20">
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                                            {project.source.includes("Work") ? (
                                                <Briefcase
                                                    size={12}
                                                    className="text-blue-400"
                                                />
                                            ) : (
                                                <User
                                                    size={12}
                                                    className="text-purple-400"
                                                />
                                            )}
                                            <span className="text-[10px] font-mono font-medium text-slate-200 tracking-widest">
                                                {project.source}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Background Image */}
                                    <div className="absolute inset-0 z-0">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                                    </div>

                                    {/* Project Content */}
                                    <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                                        <div className="space-y-3">
                                            <span className="text-blue-500 font-mono text-xs tracking-[0.2em] uppercase">
                                                {project.category}
                                            </span>
                                            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                                                {project.title}
                                            </h3>
                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {project.tech.map(
                                                    (t: string) => (
                                                        <span
                                                            key={t}
                                                            className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-400"
                                                        >
                                                            {t}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        {/* Hover Buttons */}
                                        <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-40">
                                            <a
                                                href="#"
                                                className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                                            >
                                                <FaGithub size={18} />
                                            </a>
                                            <Link
                                                href={`/projects/${project.id}`}
                                                className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/10 hover:bg-white/20 transition-colors"
                                            >
                                                <ExternalLink size={18} />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>

            {/* Footer Tip */}
            <div className="mt-4 flex justify-between items-center px-2 shrink-0">
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
