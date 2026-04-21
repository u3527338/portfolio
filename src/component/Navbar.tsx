"use client";

import { Link, usePathname, useRouter } from "@/navigation";
import { motion } from "framer-motion";
import { Briefcase, FolderGit2, Languages, Trophy, Home } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const locale = useLocale();
    const searchParams = useSearchParams();
    const tNavbar = useTranslations("Navbar");
    const tAdmin = useTranslations("AdminNavbar");

    const isAdmin = pathname.split("/").includes("admin");

    const navItems = [
        { name: tNavbar("home"), href: "/" },
        { name: tNavbar("skills"), href: "/skills" },
        { name: tNavbar("projects"), href: "/projects" },
        { name: tNavbar("experience"), href: "/experience" },
    ];

    const adminTabs = [
        { id: "projects", icon: FolderGit2 },
        { id: "experience", icon: Briefcase },
        { id: "skills", icon: Trophy },
    ];

    const activeTab = searchParams.get("tab") || "projects";

    const toggleLanguage = () => {
        const nextLocale = locale === "en" ? "zh" : "en";
        const currentParams = searchParams.toString();
        const queryString = currentParams ? `?${currentParams}` : "";
        router.replace(`${pathname}${queryString}`, { locale: nextLocale });
    };

    const handleTabChange = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", id);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <nav className="fixed top-0 w-full z-50 flex justify-center p-8">
            {isAdmin && (
                <div className="absolute left-8 top-1/2 -translate-y-1/2">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-slate-900/40 hover:bg-slate-800 transition-colors text-xs font-medium text-slate-300 hover:text-white"
                    >
                        <Home size={16} />
                        <span>{tNavbar("home")}</span>
                    </Link>
                </div>
            )}

            <div className="flex items-center p-1.5 rounded-full border bg-slate-900/40 backdrop-blur-md border-white/10 relative">
                {!isAdmin ? (
                    <div className="flex items-center gap-6 px-6 py-1.5">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`text-sm font-medium transition-colors relative ${
                                        isActive ? "text-white" : "text-slate-400 hover:text-white"
                                    }`}
                                >
                                    {item.name}
                                    {isActive && (
                                        <motion.span 
                                            layoutId="navUnderline"
                                            className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500" 
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex items-center gap-1">
                        {adminTabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={`relative flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                                        isActive ? "text-white" : "text-slate-500 hover:text-slate-300"
                                    }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTabAdmin"
                                            className="absolute inset-0 bg-blue-600 rounded-full"
                                            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                        />
                                    )}
                                    <Icon size={16} className="relative z-10" />
                                    <span className="relative z-10">{tAdmin(tab.id)}</span>
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="absolute right-8 top-1/2 -translate-y-1/2">
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-slate-900/40 hover:bg-slate-800 transition-colors text-xs font-medium text-slate-300 hover:text-white"
                >
                    <Languages size={16} />
                    {locale === "en" ? "繁中" : "EN"}
                </button>
            </div>
        </nav>
    );
}
