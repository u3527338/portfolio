import { connectDB } from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import { NextResponse } from "next/server";

const allProjects = [
  {
    _id: "e-invoice",
    title: "E-Invoice System",
    category: "Full-stack / Enterprise",
    type: "Work",
    source: "HKSTP",
    size: "large",
    image: "/image/project-1.png",
    tech: ["Next.js", "Express", "MySQL"],
  },
  {
    _id: "med-app",
    title: "Health Tracker",
    category: "Mobile App",
    type: "Self-Learning",
    size: "small",
    image: "/image/project-2.png",
    tech: ["React Native", "Firebase"],
  },
  {
    _id: "smart-card",
    title: "Smart Card Solution",
    category: "IoT / Security",
    type: "Work",
    source: "HKSTP",
    size: "small",
    image: "/image/project-3.png",
    tech: ["WebSocket", "Node.js"],
  },
];

export async function GET() {
  try {
    await connectDB();

    const projects = await ProjectModel.find({});

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    // return NextResponse.json(
    //   { error: "Failed to fetch projects" },
    //   { status: 500 },
    // );
    return NextResponse.json(allProjects);
  }
}
