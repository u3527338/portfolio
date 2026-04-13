import { connectDB } from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import ExperienceModel from "@/models/Experience";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const projects = await ProjectModel.find({})
            .populate("experienceId")
            .sort({ createdAt: -1 })
            .lean();
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        let sourceName = body.source;
        if (body.experienceId) {
            const exp = await ExperienceModel.findById(body.experienceId);
            if (exp) sourceName = exp.company;
        }

        const newProject = await ProjectModel.create({
            ...body,
            source: sourceName,
        });

        return NextResponse.json(newProject, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
