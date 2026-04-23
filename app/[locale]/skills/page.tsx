import PageLoader from "@/src/component/PageLoader";
import SkillClient from "@/src/component/skills/SkillClient";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Skills | SIU CHUN KIT",
    description: "探索 SIU CHUN KIT 的技術能力，涵蓋前端、後端及雲端開發工具。",
    keywords: [
        "Full-stack Developer Skills",
        "React Expert",
        "Next.js Specialist",
        "技術棧",
    ],
};

export default function SkillsPage() {
    return (
        <main className="w-full h-full max-w-6xl mx-auto flex flex-col p-4">
            <h1 className="sr-only">SIU CHUN KIT 的技術能力清單</h1>

            <Suspense fallback={<PageLoader />}>
                <SkillClient />
            </Suspense>
        </main>
    );
}
