import { Metadata } from "next";
import ExperienceClient from "./component/ExperienceClient";

async function getExperience() {
    try {
        const res = await fetch(
            `${
                process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
            }/api/experiences`,
            { cache: "no-store" }
        );
        if (!res.ok) throw new Error();
        return res.json();
    } catch (e) {
        return [];
    }
}

export async function generateMetadata(): Promise<Metadata> {
    const experiences = await getExperience();
    const latestJob = experiences[0]?.title || "Full-stack Developer";
    const latestCompany = experiences[0]?.company || "";

    return {
        title: `工作經驗 | SIU CHUN KIT - ${latestJob}${
            latestCompany ? ` @ ${latestCompany}` : ""
        }`,
        description: `探索 SIU CHUN KIT 的職業生涯。擁有 ${experiences.length} 段專業開發經驗，專注於解決複雜技術問題。`,
        openGraph: {
            title: `SIU CHUN KIT 的工作經驗`,
            description: `了解我在 ${latestCompany} 等公司的專業貢獻與技術成就。`,
        },
    };
}

export default async function Page() {
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
            <ExperienceClient experiences={experiences} />
        </>
    );
}
