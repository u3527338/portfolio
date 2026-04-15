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