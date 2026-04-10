"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, Trophy, Briefcase, Settings2 } from "lucide-react";
import ProjectAdminForm from "./ProjectAdminForm";
import ExperienceAdminForm from "./ExperienceAdminForm";
import SkillAdminForm from "./SkillAdminForm";

export default function AdminPage() {
    // 定義邊個 Tab 係 Active
    const [activeTab, setActiveTab] = useState("projects");

    const tabs = [
        { id: "projects", label: "Projects", icon: FolderGit2 },
        { id: "experiences", label: "Experience", icon: Briefcase },
        { id: "skills", label: "Skills", icon: Trophy },
    ];

    return (
        <main className="min-h-screen bg-slate-950 text-white py-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header 部分 */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent">
                            Admin Dashboard
                        </h1>
                        <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-2">
                            Manage your portfolio content
                        </p>
                    </div>

                    {/* Tab 導航列 */}
                    <div className="flex gap-1 p-1.5 rounded-2xl bg-slate-900/50 border border-white/5 backdrop-blur-xl">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                                        isActive
                                            ? "text-white"
                                            : "text-slate-500 hover:text-slate-300"
                                    }`}
                                >
                                    {isActive && (
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
                                    <Icon size={16} className="relative z-10" />
                                    <span className="relative z-10">
                                        {tab.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 內容區域：用 Switch 概念顯示對應 Form */}
                <div className="relative min-h-[600px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {activeTab === "projects" && <ProjectAdminForm/>}
                            {activeTab === "experiences" && (
                                <ExperienceAdminForm />
                            )}
                            {activeTab === "skills" && <SkillAdminForm />}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
