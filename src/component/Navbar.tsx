"use client";

import { Link, usePathname, useRouter } from "@/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Languages } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const locale = useLocale();
    const t = useTranslations("Navbar");

    const navItems = [
        { name: t("home"), href: "/" },
        { name: t("skills"), href: "/skills" },
        { name: t("projects"), href: "/projects" },
        { name: t("experience"), href: "/experience" },
    ];

    const toggleLanguage = () => {
        const nextLocale = locale === "en" ? "zh" : "en";
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <nav className="fixed top-0 w-full z-50 flex justify-center p-8">
            <div className="flex items-center gap-8 px-8 py-3 rounded-full border bg-slate-900/40 backdrop-blur-md border-white/10 relative">
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
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500" />
                            )}
                        </Link>
                    );
                })}
            </div>

            {/* 右上方切換按鈕 */}
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
