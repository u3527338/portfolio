import { NextResponse } from "next/server";

export const skillGroups = [
  {
    category: "Frontend Mastery",
    skills: [
      { name: "NextJS / ReactJS", level: 95, iconName: "SiNextdotjs" },
      { name: "React Native", level: 85, iconName: "SiReact" },
      { name: "Typescript", level: 90, iconName: "SiTypescript" },
      { name: "HTML / JS / CSS", level: 100, iconName: "SiTailwindcss" },
    ],
  },
  {
    category: "Backend & Real-time",
    skills: [
      { name: "Python", level: 88, iconName: "SiPython" },
      { name: "Express", level: 88, iconName: "SiExpress" },
      { name: "WebSocket", level: 80, iconName: "SiSocketdotio" },
      { name: "Message Queue", level: 75, iconName: "SiRabbitmq" },
    ],
  },
  {
    category: "Database & DevOps",
    skills: [
      { name: "SQL (MySQL)", level: 85, iconName: "SiMysql" },
      { name: "NoSQL (MongoDB)", level: 82, iconName: "SiMongodb" },
      { name: "AWS", level: 80, iconName: "FaAws" },
      { name: "Docker", level: 80, iconName: "SiDocker" },
    ],
  },
  {
    category: "Business Automation",
    skills: [
      { name: "Power Automate", level: 90, iconName: "FaBolt" },
      { name: "Microsoft Office", level: 95, iconName: "AiFillFileExcel" },
    ],
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
  return NextResponse.json(skillGroups);
}
