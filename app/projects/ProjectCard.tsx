"use client";

import { motion } from "framer-motion";
import { Briefcase, ExternalLink, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { ProjectRefButton } from "./ProjectRefButton";
import { TechStackList } from "./TechStackList";

export default function ProjectCard({ project }: { project: any }) {
    const isWork = project?.type?.includes("Work");
    const displaySource = project?.experienceId?.abbrev || project.source;

    return (
        <motion.div
            layout
            whileHover={{ y: -8 }}
            className={`relative rounded-[32px] overflow-hidden group border border-white/5 bg-slate-900/40 backdrop-blur-md w-full aspect-video min-h-[320px] 
            ${
                project?.size === "large"
                    ? "md:col-span-2 md:row-span-2"
                    : "md:col-span-1 md:row-span-1"
            }`}
        >
            <Link
                href={`/projects/${project?._id}`}
                className="absolute inset-0 z-10"
            >
                <span className="sr-only">View {project?.title}</span>
            </Link>

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
                    className="object-cover opacity-30 group-hover:opacity-60 transition-all duration-700 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            </div>

            <div className="relative z-20 h-full p-8 flex flex-col justify-end pt-20 pointer-events-none">
                <div className="space-y-3 w-full">
                    <span className="text-blue-500 font-mono text-xs tracking-[0.2em] uppercase">
                        {project?.category || "Category"}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                        {project?.title || "Untitled"}
                    </h3>
                    <TechStackList
                        tech={project?.techDetails || project?.tech}
                    />
                </div>
            </div>

            <div className="absolute top-6 right-6 flex gap-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50 pointer-events-auto">
                {project.githubLink && (
                    <ProjectRefButton
                        href={project.githubLink}
                        icon={<FaGithub size={18} />}
                        variant="primary"
                        title="View GitHub"
                    />
                )}
                {project.referenceLink && (
                    <ProjectRefButton
                        href={project.referenceLink}
                        icon={<ExternalLink size={18} />}
                        variant="secondary"
                        title="Live Demo"
                    />
                )}
            </div>
        </motion.div>
    );
}
