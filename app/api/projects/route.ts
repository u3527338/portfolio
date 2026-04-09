import { NextResponse } from "next/server";

const allProjects = [
  {
    _id: "e-invoice",
    title: "E-Invoice System",
    category: "Full-stack / Enterprise",
    source: "Work @ Company A",
    size: "large",
    image: "/image/project-1.png",
    tech: ["Next.js", "Express", "MySQL"],
  },
  {
    _id: "med-app",
    title: "Health Tracker",
    category: "Mobile App",
    source: "Self-Learning",
    size: "small",
    image: "/image/project-2.png",
    tech: ["React Native", "Firebase"],
  },
  {
    _id: "smart-card",
    title: "Smart Card Solution",
    category: "IoT / Security",
    source: "Work @ Company A",
    size: "small",
    image: "/image/project-3.png",
    tech: ["WebSocket", "Node.js"],
  },
];

export async function GET() {
  //   try {
  //     await connectDB();

  //     // 使用模型查詢資料
  //     const projects = await Project.find({});

  //     return NextResponse.json(projects, { status: 200 });
  //   } catch (error) {
  //     return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  //   }
  return NextResponse.json(allProjects);
}
