import PageLoader from "@/src/component/PageLoader";
import ProjectClient from "@/src/component/projects/ProjectClient";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Projects | SIU CHUN KIT`,
        description: "探索全端開發作品，展示多個實戰開發專案。",
        openGraph: {
            title: "SIU CHUN KIT | 專案作品集",
            images: ["/portfolio.png"],
        },
    };
}

export default function ProjectsPage() {
    return (
        <main className="h-full w-full overflow-hidden bg-slate-950 px-4">
            <h1 className="sr-only">SIU CHUN KIT 的精選專案作品集</h1>

            <Suspense fallback={<PageLoader />}>
                <ProjectClient />
            </Suspense>
        </main>
    );
}
