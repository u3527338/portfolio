"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { workFallbackImage } from "@/lib/constant";

const projectSchema = z.object({
    title: z.string().min(1, "Project title is required"),
    category: z.string().min(1, "Category is required"),
    type: z.string().min(1),
    experienceId: z.string(),
    tech: z.array(z.string()),
    description: z.string(),
    githubLink: z.url("Must be a valid URL").optional().or(z.literal("")),
    referenceLink: z.url("Must be a valid URL").optional().or(z.literal("")),
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

    const defaultValues = {
        title: "Project Name",
        category: "Category",
        type: "Work",
        experienceId: "",
        tech: [],
        description: "",
        image: workFallbackImage,
        githubLink: "",
        referenceLink: "",
    };

    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectSchema) as any,
        defaultValues,
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
            title: p.title || defaultValues.title,
            category: p.category || defaultValues.category,
            type: p.type || defaultValues.type,
            experienceId:
                p.experienceId?._id ||
                p.experienceId ||
                defaultValues.experienceId,
            tech: p.tech || defaultValues.tech,
            description: p.description || defaultValues.description,
            image: p.image || defaultValues.image,
            githubLink: p.githubLink || defaultValues.githubLink,
            referenceLink: p.referenceLink || defaultValues.referenceLink,
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
        if (selectedFile)
            finalImageUrl = await uploadImage(selectedFile, "project");
        if (await upsert({ ...data, image: finalImageUrl }, editingId))
            onReset();
    };

    const previewProject = {
        ...watchedValues,
        _id: "preview",
        image: imagePreview || "",
        source:
            experiences.find((e: any) => e._id === watchedValues.experienceId)
                ?.abbrev || "",
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
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 px-6 py-10">
            <div className="flex-1 min-w-0">
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
                            <InputField
                                label="Github Link"
                                {...register("githubLink")}
                                error={errors.githubLink?.message}
                            />
                            <InputField
                                label="Reference Link"
                                {...register("referenceLink")}
                                error={errors.referenceLink?.message}
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
                <div className="lg:sticky lg:top-24">
                    <p className="text-xs font-mono text-slate-400 uppercase mb-4 tracking-widest italic text-center lg:text-left">
                        Live Preview
                    </p>
                    <div className="w-full flex flex-col min-h-[300px] lg:min-h-[400px]">
                        <ProjectCard project={previewProject as any} />
                    </div>
                </div>
            </div>
        </div>
    );
}
