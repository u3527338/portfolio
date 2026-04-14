import { connectDB } from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import ExperienceModel from "@/models/Experience";
import { NextResponse } from "next/server";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();

        let sourceName = body.source;

        if (body.experienceId === "") {
            delete body.experienceId;
        }
        
        if (body.experienceId) {
            const exp = await ExperienceModel.findById(body.experienceId);
            if (exp) sourceName = exp.company;
        }

        const updated = await ProjectModel.findByIdAndUpdate(
            id,
            { ...body, source: sourceName },
            { returnDocument: 'after' }
        );

        return NextResponse.json(updated);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;

        const deletedProject = await ProjectModel.findByIdAndDelete(id);

        if (!deletedProject) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
