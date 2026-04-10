import { connectDB } from "@/lib/mongodb";
import { Experience } from "@/lib/types";
import ExperienceModel from "@/models/Experience";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const exps = await ExperienceModel.find({}).sort({ fromDate: -1 });
        return NextResponse.json(exps);
    } catch (error) {
        return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const newExp = await ExperienceModel.create(body);
        return NextResponse.json(newExp, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
