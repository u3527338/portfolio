"use client";

import { workFallbackImage } from "@/lib/constant";
import { AdminListCard } from "@/src/component/admin/AdminListCard";
import { AdminSection } from "@/src/component/admin/AdminSection";
import { FormActions } from "@/src/component/admin/FormActions";
import {
    InputField,
    ProjectImageUpload,
    SelectField,
} from "@/src/component/admin/FormElements";
import { ListActions } from "@/src/component/admin/ListActions";
import { useExperiences } from "@/src/hook/useExperiences";
import { useProjects } from "@/src/hook/useProjects";
import { useSkills } from "@/src/hook/useSkills";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import ProjectCard from "../../projects/ProjectCard";

const projectSchema = z.object({
    title: z.string().min(1, "Project title is required"),
    category: z.string().min(1, "Category is required"),
    type: z.string().min(1),
    experienceId: z.string().optional().or(z.literal("")),
    tech: z.array(z.string()),
    description: z.string(),
    githubLink: z.string().url().optional().or(z.literal("")),
    referenceLink: z.string().url().optional().or(z.literal("")),
    image: z.string(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function ProjectAdminForm({
    initialData,
}: {
    initialData?: any[];
}) {
    const { projects, isLoading, isPending, upsert, remove } =
        useProjects(initialData);
    const { exps: experiences } = useExperiences();
    const { groups: skillGroups } = useSkills();

    const [editingId, setEditingId] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const defaultValues: ProjectFormValues = {
        title: "",
        category: "",
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

    const onSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
        const result = await upsert({
            data: { ...data, _id: editingId },
            file: selectedFile,
        });
        if (result.success) onReset();
    };

    const onEdit = (p: any) => {
        setEditingId(p._id);
        setImagePreview(p.image || null);
        reset({
            ...p,
            experienceId: p.experienceId?._id || p.experienceId || "",
            githubLink: p.githubLink || "",
            referenceLink: p.referenceLink || "",
        });
    };

    const onReset = () => {
        setEditingId(null);
        setSelectedFile(null);
        setImagePreview(null);
        reset(defaultValues);
    };

    const toggleTech = (skillName: string) => {
        const currentTech = watchedValues.tech || [];
        const newTech = currentTech.includes(skillName)
            ? currentTech.filter((t) => t !== skillName)
            : [...currentTech, skillName];
        setValue("tech", newTech, { shouldValidate: true });
    };

    const previewProject = {
        ...watchedValues,
        _id: "preview",
        image: imagePreview || watchedValues.image,
        source:
            experiences.find((e: any) => e._id === watchedValues.experienceId)
                ?.abbrev || "",
        techDetails: watchedValues.tech
            .map((name) => allSkills.find((s: any) => s.name === name))
            .filter(Boolean),
    };

    return (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 px-6 py-10">
            <div className="flex-1 min-w-0">
                <AdminSection
                    title={editingId ? "Edit Project" : "Add Project"}
                    form={
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            <div className="md:col-span-2">
                                <ProjectImageUpload
                                    preview={imagePreview}
                                    onFileChange={(file) => {
                                        setSelectedFile(file);
                                        if (file)
                                            setImagePreview(
                                                URL.createObjectURL(file)
                                            );
                                    }}
                                />
                            </div>
                            <InputField
                                label="Title"
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
                                label="Github"
                                {...register("githubLink")}
                                error={errors.githubLink?.message}
                            />
                            <InputField
                                label="Reference"
                                {...register("referenceLink")}
                                error={errors.referenceLink?.message}
                            />

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-mono text-slate-500 uppercase">
                                    Tech Stack
                                </label>
                                <div className="flex flex-wrap gap-2 p-4 bg-white/5 rounded-2xl border border-white/10 max-h-40 overflow-y-auto">
                                    {allSkills.map((skill: any) => (
                                        <button
                                            key={skill.name}
                                            type="button"
                                            onClick={() =>
                                                toggleTech(skill.name)
                                            }
                                            className={`px-3 py-1 rounded-full text-[10px] border transition-all ${
                                                watchedValues.tech.includes(
                                                    skill.name
                                                )
                                                    ? "bg-blue-600 border-blue-400"
                                                    : "bg-white/5 border-white/10 text-slate-500"
                                            }`}
                                        >
                                            {skill.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-mono text-slate-500 uppercase">
                                    Description
                                </label>
                                <textarea
                                    {...register("description")}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white h-32 outline-none focus:border-blue-500"
                                />
                            </div>

                            <FormActions
                                loading={isPending}
                                editingId={editingId}
                                onCancel={onReset}
                            />
                        </form>
                    }
                    list={
                        <div className="space-y-2">
                            {projects.map((p: any) => (
                                <AdminListCard
                                    key={p._id}
                                    image={
                                        <img
                                            src={p.image || workFallbackImage}
                                            className="w-full h-full object-cover"
                                            alt={p.title}
                                        />
                                    }
                                    title={p.title}
                                    subtitle={`${p.category} @ ${
                                        p.experienceId?.company || "Personal"
                                    }`}
                                    actions={
                                        <ListActions
                                            onEdit={() => onEdit(p)}
                                            onDelete={() =>
                                                confirm("Confirm delete?") &&
                                                remove(p._id)
                                            }
                                        />
                                    }
                                />
                            ))}
                        </div>
                    }
                />
            </div>

            <div className="w-full lg:w-[380px]">
                <div className="sticky top-24">
                    <p className="text-[10px] font-mono text-blue-500 uppercase mb-4 tracking-[0.2em]">
                        Live Preview
                    </p>
                    <ProjectCard project={previewProject as any} />
                </div>
            </div>
        </div>
    );
}
