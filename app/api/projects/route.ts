import { connectDB } from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import ExperienceModel from "@/models/Experience";
import { NextResponse } from "next/server";

// GET: 攞 Project 並自動填充 Experience 資料
export async function GET() {
    try {
        await connectDB();
        // 用 populate 自動攞埋 Experience Collection 嘅資料
        const projects = await ProjectModel.find({})
            .populate("experienceId")
            .sort({ createdAt: -1 })
            .lean();
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }
}

// POST: 新增 Project
export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        let sourceName = body.source;
        // 如果有 experienceId，就去搵返間公司名做 source
        if (body.experienceId) {
            const exp = await ExperienceModel.findById(body.experienceId);
            if (exp) sourceName = exp.company;
        }

        const newProject = await ProjectModel.create({
            ...body,
            source: sourceName, // 自動填入公司名
        });

        return NextResponse.json(newProject, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
