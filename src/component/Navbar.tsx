"use client";

import { checkAuthAction } from "@/lib/helper";
import { Link, usePathname, useRouter } from "@/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowRight,
    Briefcase,
    FolderGit2,
    Home,
    Languages,
    Menu,
    Trophy,
    X,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const locale = useLocale();
    const searchParams = useSearchParams();
    const tNavbar = useTranslations("Navbar");
    const tAdmin = useTranslations("AdminNavbar");

    const [isAuthed, setIsAuthed] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        const checkStatus = async () => {
            const authed = await checkAuthAction();
            setIsAuthed(authed);
        };
        checkStatus();
        setIsDrawerOpen(false);
    }, [pathname]);

    const isAdminMode = pathname.includes("/admin");
    const activeTab = searchParams.get("tab") || "projects";

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

    const toggleLanguage = () => {
        const nextLocale = locale === "en" ? "zh" : "en";
        startTransition(() => {
            router.replace(
                `${pathname}${
                    searchParams.toString() ? `?${searchParams.toString()}` : ""
                }`,
                { locale: nextLocale }
            );
        });
    };

    const handleTabChange = (id: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", id);
        startTransition(() => {
            router.replace(`${pathname}?${params.toString()}`, {
                scroll: false,
            });
        });
    };

    return (
        <>
            <nav className="fixed top-0 w-full z-50 flex items-center justify-between p-4 md:p-6">
                <div className="flex-1 flex justify-start">
                    {isAdminMode && (
                        <Link
                            href="/"
                            className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-slate-900/40 hover:bg-slate-800 transition-colors text-xs font-medium text-slate-300 hover:text-white"
                        >
                            <Home size={16} />
                            <span>{tNavbar("home")}</span>
                        </Link>
                    )}
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="md:hidden p-3 rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-xl text-white"
                    >
                        <Menu size={20} />
                    </button>
                </div>

                <div
                    className={`hidden md:flex items-center p-1.5 rounded-full border bg-slate-900/40 backdrop-blur-md border-white/10 relative transition-opacity duration-300 ${
                        isPending ? "opacity-70" : "opacity-100"
                    }`}
                >
                    {isAdminMode ? (
                        <div className="flex items-center gap-1">
                            {adminTabs.map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => handleTabChange(tab.id)}
                                        className={`relative flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                                            isActive
                                                ? "text-white"
                                                : "text-slate-500 hover:text-slate-300"
                                        }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTabAdmin"
                                                className="absolute inset-0 bg-blue-600 rounded-full"
                                                transition={{
                                                    type: "spring",
                                                    bounce: 0.15,
                                                    duration: 0.5,
                                                }}
                                            />
                                        )}
                                        <Icon
                                            size={16}
                                            className="relative z-10"
                                        />
                                        <span className="relative z-10">
                                            {tAdmin(tab.id)}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex items-center gap-6 px-6 py-1.5">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`text-sm font-medium transition-colors relative ${
                                            isActive
                                                ? "text-white"
                                                : "text-slate-400 hover:text-white"
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
                    )}
                </div>

                <div className="flex-1 flex justify-end">
                    <button
                        onClick={toggleLanguage}
                        disabled={isPending}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 bg-slate-900/40 hover:bg-slate-800 transition-colors text-xs font-medium text-slate-300 hover:text-white"
                    >
                        <Languages size={16} />
                        <span>{locale === "en" ? "繁中" : "EN"}</span>
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {isDrawerOpen && (
                    <div className="fixed inset-0 z-[110] md:hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDrawerOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 200,
                            }}
                            className="absolute top-0 left-0 h-full w-[280px] bg-slate-900 border-r border-white/10 flex flex-col shadow-2xl"
                        >
                            <div className="p-8 flex justify-between items-center border-b border-white/5">
                                <button
                                    onClick={() => setIsDrawerOpen(false)}
                                    className="text-slate-400 hover:text-white"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <nav className="flex-1 p-4 space-y-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center justify-between p-4 rounded-2xl ${
                                            pathname === item.href
                                                ? "bg-blue-600 text-white"
                                                : "text-slate-400 hover:bg-white/5"
                                        }`}
                                    >
                                        <span className="text-lg font-bold">
                                            {item.name}
                                        </span>
                                        <ArrowRight size={18} />
                                    </Link>
                                ))}
                            </nav>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
