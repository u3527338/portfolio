import ExperienceClient from "@/src/component/experience/ExperienceClient";
import PageLoader from "@/src/component/PageLoader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Experiences | SIU CHUN KIT",
    description: "探索 SIU CHUN KIT 的職業生涯與專業開發經驗。",
    openGraph: {
        title: "SIU CHUN KIT 的工作經驗",
        description: "了解我在全端開發領域的專業貢獻與技術成就。",
    },
};

export default function ExperiencePage() {
    return (
        <main className="h-full w-full overflow-hidden bg-slate-950 px-4">
            <h1 className="sr-only">SIU CHUN KIT 的專業工作經驗</h1>

            <Suspense fallback={<PageLoader />}>
                <ExperienceClient />
            </Suspense>
        </main>
    );
}
