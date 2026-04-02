import { Metadata } from "next";
import ProjectSection from "./ProjectSection";

// 這裡定義 SEO 資訊，爬蟲最看重這裡
export const metadata: Metadata = {
    title: "精選專案 | SIU CHUN KIT Portfolio",
    description:
        "探索 10+ 個全端開發專案，涵蓋 Next.js, React Native, AWS 及企業級行政系統解決方案。",
    keywords: ["Next.js", "Full-stack Developer", "React Native", "Portfolio"],
};

// 模擬從資料庫或檔案抓取的資料 (保持在 Server Side)
const allProjects = [
    {
        id: "e-invoice",
        title: "E-Invoice System",
        category: "Full-stack / Enterprise",
        source: "Work @ Company A",
        size: "large",
        image: "/image/project-1.png",
        tech: ["Next.js", "Express", "MySQL"],
    },
    {
        id: "med-app",
        title: "Health Tracker",
        category: "Mobile App",
        source: "Self-Learning",
        size: "small",
        image: "/image/project-2.png",
        tech: ["React Native", "Firebase"],
    },
    {
        id: "smart-card",
        title: "Smart Card Solution",
        category: "IoT / Security",
        source: "Work @ Company A",
        size: "small",
        image: "/image/project-3.png",
        tech: ["WebSocket", "Node.js"],
    },
    // ... 你可以繼續增加到 10 個以上
];

export default function ProjectsPage() {
    return (
        <main className="h-full w-full overflow-hidden bg-slate-950">
            {/* 將資料傳入 Client 元件，SEO 爬蟲在此時已經能抓到 HTML 中的文字 */}
            <ProjectSection initialProjects={allProjects} />
        </main>
    );
}
