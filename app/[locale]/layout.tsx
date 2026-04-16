import Navbar from "@/src/component/Navbar"; // 確保你的路徑正確
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

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

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages({ locale });

    return (
        <html
            lang={locale}
            className={`${geistSans.variable} ${geistMono.variable} h-full overflow-hidden antialiased`}
        >
            <body className="h-full flex flex-col bg-slate-950 text-white overflow-hidden">
                <NextIntlClientProvider
                    key={locale}
                    messages={messages}
                    locale={locale}
                >
                    <Navbar />
                    <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
                        <div className="h-24 w-full flex-none" />
                        <div className="flex-1 relative min-h-0">
                            {children}
                        </div>
                    </main>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
