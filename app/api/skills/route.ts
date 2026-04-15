import { connectDB } from "@/lib/mongodb";
import SkillModel from "@/models/Skill";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectDB();
        const allSkills = await SkillModel.find({}).sort({ category: 1, level: -1 });

        const groupedSkills = allSkills.reduce((acc: any[], skill) => {
            const group = acc.find(g => g.category === skill.category);
            if (group) {
                group.skills.push(skill);
            } else {
                acc.push({ category: skill.category, skills: [skill] });
            }
            return acc;
        }, []);

        return NextResponse.json(groupedSkills);
    } catch (error) {
        return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
    }
}