"use client";

import { studyFallbackImage, workFallbackImage } from "@/lib/constant";
import { motion } from "framer-motion";
import { Briefcase, ExternalLink, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { ProjectRefButton } from "./ProjectRefButton";
import { TechStackList } from "./TechStackList";

export default function ProjectCard({
    project,
    index = 0,
}: {
    project: any;
    index?: number;
}) {
    const t = useTranslations("Project");

    const isWork = project?.type?.includes("work");
    const fallbackImage = isWork ? workFallbackImage : studyFallbackImage;
    const displayImage = project?.image || fallbackImage;
    const displaySource = project?.experienceId?.abbrev || project.source || "";
    const isPriority = index < 2;

    return (
        <motion.article
            layout
            whileHover={{ y: -8 }}
            itemScope
            itemType="https://schema.org/CreativeWork"
            className={`relative rounded-[32px] overflow-hidden group border border-white/5 bg-slate-900/40 backdrop-blur-md w-full 
            aspect-[4/5] sm:aspect-square md:aspect-video min-h-[420px] md:min-h-[320px] 
            ${
                project?.size === "large"
                    ? "md:col-span-2 md:row-span-2"
                    : "md:col-span-1 md:row-span-1"
            }`}
        >
            <meta itemProp="author" content="SIU CHUN KIT" />

            <div className="absolute top-4 left-4 md:top-6 md:left-6 z-30">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
                    {isWork ? (
                        <Briefcase
                            size={10}
                            className="text-blue-400 md:w-3 md:h-3"
                            aria-hidden="true"
                        />
                    ) : (
                        <User
                            size={10}
                            className="text-purple-400 md:w-3 md:h-3"
                            aria-hidden="true"
                        />
                    )}
                    <span className="text-[9px] md:text-[10px] font-mono font-medium text-slate-200 tracking-widest uppercase">
                        {t(`categories.${project?.type}`)}
                        {isWork && displaySource && ` @ ${displaySource}`}
                    </span>
                </div>
            </div>

            <div className="absolute inset-0 z-0">
                <Image
                    src={displayImage}
                    alt={project?.title}
                    fill
                    priority={isPriority}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-40 group-hover:opacity-70 transition-all duration-700 grayscale group-hover:grayscale-0 scale-105 group-hover:scale-100"
                    itemProp="image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
            </div>

            <div className="relative z-20 h-full p-6 md:p-8 flex flex-col justify-end pt-32 pointer-events-none">
                <div className="space-y-2 md:space-y-4 w-full">
                    <span className="text-blue-500 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase block">
                        {project?.category}
                    </span>
                    <h3
                        itemProp="name"
                        className="text-xl md:text-3xl font-bold text-white leading-tight"
                    >
                        {project?.title}
                    </h3>

                    <p className="sr-only" itemProp="description">
                        {project?.description}
                    </p>

                    <div className="pt-2">
                        <TechStackList
                            id={project?._id}
                            tech={project?.techDetails || project?.tech || []}
                        />
                    </div>
                </div>
            </div>

            <div className="absolute top-4 right-4 md:top-6 md:right-6 flex gap-2 md:gap-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-40 pointer-events-auto">
                {project.githubLink && (
                    <ProjectRefButton
                        href={project.githubLink}
                        icon={<FaGithub size={16} />}
                        variant="primary"
                        title="GitHub"
                    />
                )}
                {project.referenceLink && (
                    <ProjectRefButton
                        href={project.referenceLink}
                        icon={<ExternalLink size={16} />}
                        variant="secondary"
                        title="Demo"
                    />
                )}
            </div>
        </motion.article>
    );
}
