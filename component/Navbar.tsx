"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // 用來標示目前在哪一頁

const navItems = [
    { name: "Home", href: "/" },
    { name: "Skills", href: "/skills" }, // 指向資料夾路徑
    { name: "Projects", href: "/projects" },
    { name: "Experience", href: "/experience" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 w-full z-50 flex justify-center p-8">
            <div className="flex items-center gap-8 px-8 py-3 rounded-full border bg-slate-900/40 backdrop-blur-md border-white/10">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`text-sm font-medium transition-colors relative ${
                            pathname === item.href
                                ? "text-white"
                                : "text-slate-400 hover:text-white"
                        }`}
                    >
                        {item.name}
                        {/* 如果在該頁面，顯示底線 */}
                        {pathname === item.href && (
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-500" />
                        )}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
