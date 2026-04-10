import { connectDB } from "@/lib/mongodb";
import SkillModel from "@/models/Skill";
import { NextResponse } from "next/server";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();

        const updated = await SkillModel.findByIdAndUpdate(id, body, { returnDocument: 'after' });
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
        await SkillModel.findByIdAndDelete(id);
        return NextResponse.json({ message: "Deleted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
