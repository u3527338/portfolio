import { Metadata } from "next";
import ProjectSection from "./ProjectSection";

export const metadata: Metadata = {
  title: "精選專案 | SIU CHUN KIT Portfolio",
  description:
    "探索 10+ 個全端開發專案，涵蓋 Next.js, React Native, AWS 及企業級行政系統解決方案。",
  keywords: ["Next.js", "Full-stack Developer", "React Native", "Portfolio"],
};

async function getProjects() {
  try {
    const res = await fetch("http://localhost:3000/api/projects", {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  } catch (e) {
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="h-full w-full overflow-hidden bg-slate-950 px-4">
      <ProjectSection initialProjects={projects} />
    </main>
  );
}
