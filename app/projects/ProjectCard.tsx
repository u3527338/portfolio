"use client";

import { motion } from "framer-motion";
import { Briefcase, ExternalLink, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function ProjectCard({ project }: { project: any }) {
    const isWork = project?.type?.includes("Work");

    const displaySource = project?.experience?.company || project?.source || "";

    return (
        <motion.div
            layout
            key={project?._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
                duration: 0.4,
                delay: 0.05,
            }}
            whileHover={{ y: -8 }}
            className={`relative rounded-[32px] overflow-hidden group border border-white/5 bg-slate-900/40 backdrop-blur-md 
        ${
            project?.size === "large"
                ? "md:col-span-2 md:row-span-2"
                : "md:col-span-1 md:row-span-1"
        }`}
        >
            <Link
                href={`/projects/${project?._id}`}
                className="absolute inset-0 z-30"
            />
            <div className="absolute top-6 left-6 z-20">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                    {isWork ? (
                        <Briefcase size={12} className="text-blue-400" />
                    ) : (
                        <User size={12} className="text-purple-400" />
                    )}
                    <span className="text-[10px] font-mono font-medium text-slate-200 tracking-widest">
                        {(project?.type || "").toString()}{" "}
                        {isWork && displaySource && `@ ${displaySource}`}
                    </span>
                </div>
            </div>

            <div className="absolute inset-0 z-0">
                <Image
                    src={project?.image || "/image/placeholder.png"}
                    alt={project?.title || "Project"}
                    fill
                    className="object-cover opacity-30 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            </div>

            <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                <div className="space-y-3">
                    <span className="text-blue-500 font-mono text-xs tracking-[0.2em] uppercase">
                        {project?.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                        {project?.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {(project?.techDetails || project?.tech || []).map(
                            (t: any, index: number) => {
                                const techName =
                                    typeof t === "string" ? t : t.name;
                                if (!techName) return null;

                                return (
                                    <span
                                        key={`${techName}-${index}`}
                                        className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-400"
                                    >
                                        {techName}
                                    </span>
                                );
                            }
                        )}
                    </div>
                </div>

                <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-40">
                    <a
                        href={project?.github || "#"}
                        target="_blank"
                        className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                    >
                        <FaGithub size={18} />
                    </a>
                    <Link
                        href={`/projects/${project?._id}`}
                        className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/10 hover:bg-white/20 transition-colors"
                    >
                        <ExternalLink size={18} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
