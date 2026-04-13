import Navbar from "@/component/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "SIU CHUN KIT | Portfolio",
    description: "Full-stack Developer Portfolio",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full overflow-hidden antialiased`}
        >
            <body className="h-full flex flex-col bg-slate-950 text-white overflow-hidden">
                <Navbar />

                <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
                    <div className="h-24 w-full flex-none" />
                    <div className="flex-1 relative min-h-0">{children}</div>
                </main>
            </body>
        </html>
    );
}
