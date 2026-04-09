import { Metadata } from "next";
import SkillSection from "./SkillSection";

export const metadata: Metadata = {
  title: "Technical Skills | SIU CHUN KIT",
};

async function getSkills() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/skills`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

export default async function Page() {
  const skillGroups = await getSkills();

  return (
    <div className="w-full h-full max-w-6xl mx-auto flex flex-col justify-center px-4">
      <SkillSection skillGroups={skillGroups} />
    </div>
  );
}
