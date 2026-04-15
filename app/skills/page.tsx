import { Metadata } from "next";
import SkillSection from "./component/SkillSection";

async function getSkills() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/skills`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const skillGroups = await getSkills();
  const categories = skillGroups.map((g: any) => g.category).join(", ");
  
  return {
    title: `技術棧 | SIU CHUN KIT - 擅長 ${categories}`,
    description: `探索 SIU CHUN KIT 的技術能力，包括 ${categories} 等領域的專業工具與框架。`,
    keywords: ["Full-stack Developer Skills", "React Expert", "Next.js Specialist", "技術棧"],
  };
}

export default async function Page() {
  const skillGroups = await getSkills();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "SIU CHUN KIT's Technical Skills",
    "description": "A comprehensive list of technical skills and technologies mastered by SIU CHUN KIT.",
    "itemListElement": skillGroups.map((group: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": group.category,
      "description": `Skills in ${group.category}: ${group.skills.map((s: any) => s.name).join(", ")}`
    }))
  };

  return (
    <div className="w-full h-full max-w-6xl mx-auto flex flex-col justify-center px-4">
      <script
        type="application/ld+json"
        id="skills-jsonld"
      >
        {JSON.stringify(jsonLd)}
      </script>
      <SkillSection skillGroups={skillGroups} />
    </div>
  );
}