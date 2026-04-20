"use client";

import ExperienceAdminForm from "@/src/component/admin/form/ExperienceAdminForm";
import ProjectAdminForm from "@/src/component/admin/form/ProjectAdminForm";
import SkillAdminForm from "@/src/component/admin/form/SkillAdminForm";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, FolderGit2, ShieldCheck, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function AdminPage() {
    const t = useTranslations("AdminNavbar");
    const [activeTab, setActiveTab] = useState("projects");

    const tabs = [
        { id: "projects", icon: FolderGit2 },
        { id: "experience", icon: Briefcase },
        { id: "skills", icon: Trophy },
    ];

    return (
        <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-blue-500">
                            <ShieldCheck size={18} />
                            <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
                                Secure Admin Environment
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-white">
                            Dashboard<span className="text-blue-600">.</span>
                        </h1>
                    </div>

                    <nav className="flex gap-1 p-1.5 rounded-2xl bg-slate-900/80 border border-white/5 backdrop-blur-xl shadow-2xl">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                        isActive
                                            ? "text-white"
                                            : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                                    }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabAdmin"
                                            className="absolute inset-0 bg-blue-600 rounded-xl"
                                            transition={{
                                                type: "spring",
                                                bounce: 0.15,
                                                duration: 0.5,
                                            }}
                                        />
                                    )}
                                    <Icon size={16} className="relative z-10" />
                                    <span className="relative z-10">
                                        {t(`${tab.id}`)}
                                    </span>
                                </button>
                            );
                        })}
                    </nav>
                </header>

                <div className="relative bg-slate-900/30 border border-white/5 rounded-[32px] p-8 backdrop-blur-sm shadow-inner">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="min-h-[500px]"
                        >
                            {activeTab === "projects" && <ProjectAdminForm />}
                            {activeTab === "experience" && (
                                <ExperienceAdminForm />
                            )}
                            {activeTab === "skills" && <SkillAdminForm />}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <footer className="mt-12 text-center">
                    <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                        Confidential Data — Unauthorized Access Prohibited
                    </p>
                </footer>
            </div>
        </main>
    );
}
