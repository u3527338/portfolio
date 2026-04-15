import { workFallbackImage } from "@/lib/constant";
import { Metadata } from "next";
import ProjectSection from "./ProjectSection";

async function getProjects() {
    try {
        const res = await fetch(
            `${
                process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
            }/api/projects`,
            {
                next: { revalidate: 3600 },
            }
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
    } catch (e) {
        return [];
    }
}

export async function generateMetadata(): Promise<Metadata> {
    const projects = await getProjects();
    const techStack = Array.from(
        new Set(projects.flatMap((p: any) => p.tech || []))
    ).slice(0, 5);

    const firstProjectImage = projects[0]?.image || workFallbackImage;

    return {
        title: `精選專案 | SIU CHUN KIT Portfolio (${projects.length} 個作品)`,
        description: `探索我的全端開發作品，涵蓋 ${techStack.join(
            ", "
        )} 等技術。`,
        openGraph: {
            title: "SIU CHUN KIT | 專案作品集",
            description: `展示 ${projects.length} 個實戰開發專案。`,
            images: [
                {
                    url: firstProjectImage,
                    width: 1200,
                    height: 630,
                    alt: "SIU CHUN KIT Projects Portfolio",
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "SIU CHUN KIT | 專案作品集",
            images: [firstProjectImage],
        },
    };
}

export default async function ProjectsPage() {
    const projects = await getProjects();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "SIU CHUN KIT's Web Development Projects",
        description:
            "A collection of full-stack development projects by SIU CHUN KIT",
        itemListElement: projects.map((project: any, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "CreativeWork",
                name: project.title,
                description: project.description,
                image: project.image || workFallbackImage,
                url: project.referenceLink || project.githubLink || "",
                genre: project.category,
                keywords: project.tech?.join(", "),
            },
        })),
    };

    return (
        <main className="h-full w-full overflow-hidden bg-slate-950 px-4">
            <script type="application/ld+json" id="projects-jsonld">
                {JSON.stringify(jsonLd)}
            </script>
            <h1 className="sr-only">SIU CHUN KIT 的精選專案作品集</h1>
            
            <ProjectSection initialProjects={projects} />
        </main>
    );
}
