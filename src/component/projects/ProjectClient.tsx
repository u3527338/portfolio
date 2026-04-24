import { workFallbackImage } from "@/lib/constant";
import ProjectSection from "./ProjectSection";

async function getProjects() {
    try {
        const res = await fetch(
            `${
                process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
            }/api/projects`,
            {
                next: { tags: ["projects"] },
            }
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
    } catch (e) {
        console.error("Fetch projects error:", e);
        return [];
    }
}

export default async function ProjectClient() {
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
                keywords: Array.isArray(project.tech)
                    ? project.tech.join(", ")
                    : "",
            },
        })),
    };

    return (
        <>
            <script type="application/ld+json" id="projects-jsonld">
                {JSON.stringify(jsonLd)}
            </script>
            <ProjectSection initialProjects={projects} />
        </>
    );
}
