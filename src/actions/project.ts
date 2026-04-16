"use server";

import { connectDB } from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import { revalidatePath } from "next/cache";
import { uploadImageAction } from "./upload";

export async function upsertProject(data: any, file?: File | null) {
    try {
        await connectDB();
        let finalData = { ...data };

        if (file && file.size > 0) {
            const url = await uploadImageAction(file, "project");
            finalData.image = url;
        }

        if (!finalData.githubLink) delete finalData.githubLink;
        if (!finalData.referenceLink) delete finalData.referenceLink;
        if (!finalData.experienceId) finalData.experienceId = null;

        let result;
        if (data._id) {
            const { _id, ...updateData } = finalData;
            result = await ProjectModel.findByIdAndUpdate(_id, updateData, { new: true });
        } else {
            result = await ProjectModel.create(finalData);
        }

        revalidatePath("/admin");
        revalidatePath("/projects");
        return { success: true, data: JSON.parse(JSON.stringify(result)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteProject(id: string) {
    try {
        await connectDB();
        await ProjectModel.findByIdAndDelete(id);
        
        revalidatePath("/admin");
        revalidatePath("/projects");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}