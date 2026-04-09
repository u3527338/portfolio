"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Layers } from "lucide-react";
import { useState } from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectSection({
  initialProjects,
}: {
  initialProjects: any[];
}) {
  const [filter, setFilter] = useState("All");

  const filteredProjects = initialProjects.filter((p) =>
    filter === "All" ? true : p.source.includes(filter),
  );

  return (
    <section className="h-screen w-full max-w-7xl mx-auto flex flex-col px-6">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6 shrink-0">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-2">
            <span className="text-blue-500">{initialProjects.length}+</span>{" "}
            Industrial & Personal Works
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
                <ProjectCard key={idx} project={project} />
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
