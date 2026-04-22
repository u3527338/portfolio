import QueryProvider from "@/src/provider/QueryProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Dashboard | Portfolio",
    description: "Content management system for portfolio data.",
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
        },
    },
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-full w-full overflow-y-auto custom-scrollbar bg-slate-950">
            <div className="max-w-7xl mx-auto px-6">
                <QueryProvider>{children}</QueryProvider>
            </div>
        </div>
    );
}
