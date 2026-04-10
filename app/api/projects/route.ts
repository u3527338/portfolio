import { NextResponse } from "next/server";
import { allProjects, experiences, userSkills } from "../data";
import { connectDB } from "@/lib/mongodb";
import ProjectModel from "@/models/Project";


export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();

    const newProject = await ProjectModel.create({
      title: body.title,
      category: body.category,
      type: body.type,
      source: body.source,
      size: body.size || "small",
      image: body.image || "",
      tech: body.tech,
      description: body.description,
      github: body.github,
      link: body.link,
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    console.error("Create project error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create project" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
      // 1. 連接資料庫
      await connectDB();

      // 2. 從 MongoDB 攞所有 Projects (按時間倒序)
      const projectsFromDB = await ProjectModel.find({}).sort({ createdAt: -1 }).lean();

      // 3. 扁平化 Skills 方便對照
      const flatSkills = userSkills.flatMap((group) => group.skills);

      // 4. 組合數據 (把原本儲存的 string array 轉換成豐富的物件陣列)
      const enrichedProjects = projectsFromDB.map((project: any) => {
          return {
              ...project,
              // 如果你之後有 Experience Collection，呢度可以用 .populate()
              // 目前先根據你原本嘅邏輯保留結構
              techDetails: project.tech
                  .map((techName: string) => 
                      flatSkills.find((s: any) => s.name === techName)
                  )
                  .filter(Boolean),
              
              // 為了兼容你個 ProjectCard UI，保留原本的 tech string array
              tech: project.tech 
          };
      });

      return NextResponse.json(enrichedProjects, { status: 200 });
  } catch (error) {
      console.error("Fetch projects error:", error);
      return NextResponse.json(
          { error: "Failed to fetch projects from database" },
          { status: 500 }
      );
  }
}

