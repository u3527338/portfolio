"use server";

import { connectDB } from "@/lib/mongodb";
import ExperienceModel from "@/models/Experience";
import { revalidatePath } from "next/cache";
import { uploadImageAction } from "./upload";

export async function upsertExperience(data: any, file?: File | null) {
    try {
        await connectDB();

        let finalData = { ...data };

        if (file && file.size > 0) {
            const uploadedUrl = await uploadImageAction(file, "experience");
            finalData.bgImage = uploadedUrl;
        }

        let result;
        if (data._id) {
            const { _id, ...updateData } = finalData;
            result = await ExperienceModel.findByIdAndUpdate(_id, updateData, {
                new: true,
            });
        } else {
            result = await ExperienceModel.create(finalData);
        }

        revalidatePath("/admin");
        revalidatePath("/experiences");
        return { success: true, data: JSON.parse(JSON.stringify(result)) };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteExperience(id: string) {
    try {
        await connectDB();
        await ExperienceModel.findByIdAndDelete(id);
        
        revalidatePath("/admin");
        revalidatePath("/experiences");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
