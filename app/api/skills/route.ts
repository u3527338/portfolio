import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { userSkills } from "../data";

export async function GET() {
    try {
        await connectDB();
        return NextResponse.json(userSkills, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch skills" },
            { status: 500 }
        );
    }
}
