import { connectDB } from "@/lib/mongodb";
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