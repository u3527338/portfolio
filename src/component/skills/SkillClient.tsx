import SkillSection from "./SkillSection";

async function getSkills() {
    try {
        const res = await fetch(
            `${
                process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
            }/api/skills`,
            {
                next: { revalidate: 3600 },
            }
        );
        if (!res.ok) return [];
        return res.json();
    } catch (e) {
        return [];
    }
}

export default async function SkillClient() {
    const skillGroups = await getSkills();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "SIU CHUN KIT's Technical Skills",
        description:
            "A comprehensive list of technical skills and technologies mastered by SIU CHUN KIT.",
        itemListElement: skillGroups.map((group: any, index: number) => ({
            "@type": "ListItem",
            position: index + 1,
            name: group.category,
            description: `Skills in ${group.category}: ${group.skills
                .map((s: any) => s.name)
                .join(", ")}`,
        })),
    };

    return (
        <>
            <script type="application/ld+json" id="skills-jsonld">
                {JSON.stringify(jsonLd)}
            </script>
            <SkillSection skillGroups={skillGroups} />
        </>
    );
}
