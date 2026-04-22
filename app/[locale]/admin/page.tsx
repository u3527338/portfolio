"use client";

import { checkAuthAction } from "@/lib/helper";
import ExperienceAdminForm from "@/src/component/admin/form/ExperienceAdminForm";
import LoginForm from "@/src/component/admin/form/LoginForm";
import ProjectAdminForm from "@/src/component/admin/form/ProjectAdminForm";
import SkillAdminForm from "@/src/component/admin/form/SkillAdminForm";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function AdminContent() {
    const t = useTranslations("Login");
    const searchParams = useSearchParams();
    const activeTab = searchParams.get("tab") || "projects";

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
        null
    );

    useEffect(() => {
        const initAuth = async () => {
            const authed = await checkAuthAction();
            setIsAuthenticated(authed);
        };
        initAuth();
    }, []);

    if (isAuthenticated === null) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="animate-pulse font-mono text-xs text-slate-500 uppercase tracking-widest">
                    {t("authenticating")}
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <LoginForm onLoginSuccess={() => setIsAuthenticated(true)} />;
    }

    return (
        <div className="max-w-7xl mx-auto">
            {/* <header className="mb-12">
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
            </header> */}

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
                        {activeTab === "experience" && <ExperienceAdminForm />}
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
    );
}

export default function AdminPage() {
    return (
        <main className="px-6 pb-12">
            <Suspense fallback={null}>
                <AdminContent />
            </Suspense>
        </main>
    );
}
