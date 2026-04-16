"use server";

import { connectDB } from "@/lib/mongodb";
import SkillModel from "@/models/Skill";
import { revalidatePath } from "next/cache";

export async function upsertSkill(data: any, id?: string | null) {
    try {
        await connectDB();
        
        let result;
        if (id) {
            result = await SkillModel.findByIdAndUpdate(id, data, { new: true });
        } else {
            result = await SkillModel.create(data);
        }

        revalidatePath("/admin");
        revalidatePath("/skills");
        return { success: true, data: JSON.parse(JSON.stringify(result)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteSkill(id: string) {
    try {
        await connectDB();
        await SkillModel.findByIdAndDelete(id);
        revalidatePath("/admin");
        revalidatePath("/skills");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}