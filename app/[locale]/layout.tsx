import Navbar from "@/src/component/Navbar";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "SIU CHUN KIT | Portfolio",
        description: "Full-stack Developer Portfolio",
        icons: {
            icon: "/portfolio.jpg",
        },
    };
}

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
                    <Suspense fallback={null}>
                        <Navbar />
                    </Suspense>

                    <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
                        <div className="h-28 w-full flex-none" />
                        <div className="flex-1 relative min-h-0 overflow-y-auto">
                            {children}
                        </div>
                    </main>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
