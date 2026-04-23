import ExperienceSection from "./ExperienceSection";

async function getExperience() {
    try {
        const res = await fetch(
            `${
                process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
            }/api/experiences`,
            {
                next: { tags: ["experience"] },
            }
        );
        if (!res.ok) throw new Error();
        return res.json();
    } catch (e) {
        return [];
    }
}

export default async function ExperienceClient() {
    const experiences = await getExperience();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "SIU CHUN KIT's Work Experience",
        itemListElement: experiences.map((exp: any, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "Organization",
                name: exp.company,
                description: exp.description,
            },
        })),
    };

    return (
        <>
            <script type="application/ld+json" id="experience-jsonld">
                {JSON.stringify(jsonLd)}
            </script>
            <ExperienceSection experiences={experiences} />
        </>
    );
}
