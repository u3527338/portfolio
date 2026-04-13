"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { AdminSection } from "@/component/AdminSection";
import { FormActions } from "@/component/FormActions";
import {
    InputField,
    ProjectImageUpload,
    SelectField,
} from "@/component/FormElements";
import { ListActions } from "@/component/ListActions";
import { useAdminData } from "../hook/useAdminData";
import ProjectCard from "../projects/ProjectCard";

const projectSchema = z.object({
    title: z.string().min(1, "Project title is required"),
    category: z.string().min(1, "Category is required"),
    type: z.string(),
    experienceId: z.string(),
    tech: z.array(z.string()),
    description: z.string(),
    image: z.string(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectAdminForm() {
    const {
        data: projects,
        loading,
        upsert,
        uploadImage,
        remove,
    } = useAdminData("/api/projects");
    const { data: experiences = [] } = useAdminData("/api/experiences");
    const { data: skillGroups = [] } = useAdminData("/api/skills");

    const [editingId, setEditingId] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            title: "",
            category: "",
            type: "Work",
            experienceId: "",
            tech: [],
            description: "",
            image: "",
        },
    });

    const watchedValues = watch();
    const allSkills = skillGroups?.flatMap((g: any) => g.skills) || [];

    const handleFileChange = (file: File | null) => {
        setSelectedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const onEdit = (p: any) => {
        setEditingId(p._id);
        setImagePreview(p.image || null);
        reset({
            title: p.title || "",
            category: p.category || "",
            type: p.type || "Work",
            experienceId: p.experienceId?._id || p.experienceId || "",
            tech: p.tech || [],
            description: p.description || "",
            image: p.image || "",
        });
    };

    const onReset = () => {
        setEditingId(null);
        setSelectedFile(null);
        setImagePreview(null);
        reset();
    };

    const onSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
        let finalImageUrl = data.image;

        if (selectedFile) {
            finalImageUrl = await uploadImage(selectedFile, "project");
        }

        const success = await upsert(
            { ...data, image: finalImageUrl },
            editingId
        );
        if (success) onReset();
    };

    const previewProject = {
        ...watchedValues,
        _id: "preview",
        image: imagePreview || "/image/placeholder.png",
        source:
            experiences.find((e: any) => e._id === watchedValues.experienceId)
                ?.company || "Personal",
        techDetails: watchedValues.tech
            .map((name) => allSkills.find((s: any) => s.name === name))
            .filter(Boolean),
    };

    const toggleTech = (skillName: string) => {
        const currentTech = watchedValues.tech || [];
        const newTech = currentTech.includes(skillName)
            ? currentTech.filter((t) => t !== skillName)
            : [...currentTech, skillName];
        setValue("tech", newTech, { shouldValidate: true });
    };

    return (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
                <AdminSection
                    title={editingId ? "Edit Project" : "Add New Project"}
                    form={
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            <div className="md:col-span-2">
                                <ProjectImageUpload
                                    preview={imagePreview}
                                    onFileChange={handleFileChange}
                                />
                            </div>

                            <InputField
                                label="Project Title"
                                {...register("title")}
                                error={errors.title?.message}
                            />
                            <InputField
                                label="Category"
                                {...register("category")}
                                error={errors.category?.message}
                            />

                            <SelectField
                                label="Related Experience"
                                {...register("experienceId")}
                                options={[
                                    { label: "Personal Project", value: "" },
                                    ...experiences.map((e: any) => ({
                                        label: e.company,
                                        value: e._id,
                                    })),
                                ]}
                            />

                            <SelectField
                                label="Type"
                                {...register("type")}
                                options={["Work", "Self-Learning"]}
                            />

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                                    Tech Stack
                                </label>
                                <div className="flex flex-wrap gap-2 p-4 bg-black/20 rounded-2xl border border-white/5 max-h-40 overflow-y-auto no-scrollbar">
                                    {allSkills.map((skill: any) => (
                                        <button
                                            key={skill.name}
                                            type="button"
                                            onClick={() =>
                                                toggleTech(skill.name)
                                            }
                                            className={`px-3 py-1.5 rounded-lg text-[10px] transition-all border ${
                                                watchedValues.tech.includes(
                                                    skill.name
                                                )
                                                    ? "bg-blue-600 border-blue-400 text-white"
                                                    : "bg-white/5 border-white/10 text-slate-400"
                                            }`}
                                        >
                                            {skill.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <FormActions
                                loading={loading}
                                editingId={editingId}
                                onCancel={onReset}
                            />
                        </form>
                    }
                    list={
                        <div className="space-y-3">
                            {projects.map((p: any) => (
                                <div
                                    key={p._id}
                                    className="flex justify-between items-center bg-white/5 p-4 rounded-2xl group border border-transparent hover:border-white/10"
                                >
                                    <div>
                                        <h4 className="font-bold text-sm">
                                            {p.title}
                                        </h4>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-tight">
                                            {p.category} @{" "}
                                            {p.experienceId?.company ||
                                                "Personal"}
                                        </p>
                                    </div>
                                    <ListActions
                                        onEdit={() => onEdit(p)}
                                        onDelete={() => remove(p._id)}
                                    />
                                </div>
                            ))}
                        </div>
                    }
                />
            </div>

            <div className="w-full lg:w-[400px] shrink-0">
                <div className="sticky top-24">
                    <p className="text-xs font-mono text-slate-400 uppercase mb-4 tracking-widest italic">
                        Live Preview
                    </p>
                    <ProjectCard project={previewProject as any} />
                </div>
            </div>
        </div>
    );
}
