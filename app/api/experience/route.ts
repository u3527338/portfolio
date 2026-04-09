import { connectDB } from "@/lib/mongodb";
import { Experience } from "@/lib/types";
import ExperienceModel from "@/models/Experience";
import { NextResponse } from "next/server";

export const experiences: Experience[] = [
  {
    _id: "0",
    title: "Senior Software Developer",
    company: "Hong Kong Science and Technology Parks Corporation",
    location: "Hong Kong",
    startDate: "2024-04-01",
    endDate: null,
    isCurrent: true,
    shortDesc:
      "Building scalable internal workflow solutions with React and Node.js. Translating complex business requirements into high-performance web applications across key administrative sectors.",
    bgImage: "/images/experience/hkstp.png",
  },
  {
    _id: "1",
    title: "Front-end Software Developer",
    company: "Build King - Cerebro Strategy Limited",
    location: "Hong Kong",
    startDate: "2022-12-01",
    endDate: "2024-02-01",
    isCurrent: false,
    shortDesc:
      "Developed construction-tech solutions and management dashboards using React. Focus on real-time data visualization and operational efficiency.",
    bgImage: "/images/experience/buildking.png",
  },
  {
    _id: "2",
    title: "Front-end Software Developer",
    company: "Popsible Limited",
    location: "Hong Kong",
    startDate: "2022-03-01",
    endDate: "2022-12-01",
    isCurrent: false,
    shortDesc:
      "Worked on NFT marketplace and Web3 integration projects. Implemented responsive UI components and blockchain wallet connectivity.",
    bgImage: "/images/experience/popsible.png",
  },
  {
    _id: "3",
    title: "Front-end Software Developer",
    company: "The Win Win Group",
    location: "Hong Kong",
    startDate: "2020-08-01",
    endDate: "2022-03-01",
    isCurrent: false,
    shortDesc:
      "Built marketing-focused web applications and promotional landing pages. Optimized site performance and cross-browser compatibility.",
    bgImage: "/images/experience/winwin.png",
  },
];

export async function GET() {
  try {
    await connectDB();

    // 使用模型查詢資料
    const projects = await ExperienceModel.find({});

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
  return NextResponse.json(experiences);
}
