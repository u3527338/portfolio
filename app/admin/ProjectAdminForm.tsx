"use client";

import { AdminSection } from "@/component/AdminSection";
import { FormActions } from "@/component/FormActions";
import {
    InputField,
    ProjectImageUpload,
    SelectField,
} from "@/component/FormElements";
import { ListActions } from "@/component/ListActions";
import { useState } from "react";
import { useAdminData } from "../hook/useAdminData";
import ProjectCard from "../projects/ProjectCard";

export default function ProjectAdminForm() {
    const {
        data: projects,
        loading,
        upsert,
        remove,
    } = useAdminData("/api/projects");
    const { data: experiences } = useAdminData("/api/experiences");
    const { data: skillGroups } = useAdminData("/api/skills");

    const [editingId, setEditingId] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        type: "Work",
        experienceId: "",
        tech: [] as string[],
        description: "",
        image: "",
    });

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
        setFormData({
            ...p,
            experienceId: p.experienceId?._id || p.experienceId || "",
            description: p.description || "",
        });
    };

    const onReset = () => {
        setEditingId(null);
        setSelectedFile(null);
        setImagePreview(null);
        setFormData({
            title: "",
            category: "",
            type: "Work",
            experienceId: "",
            tech: [],
            description: "",
            image: "",
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let finalImageUrl = formData.image;

        if (selectedFile) {
            const uploadData = new FormData();
            uploadData.append("file", selectedFile);
            uploadData.append("folder", "project");

            const res = await fetch("/api/upload", {
                method: "POST",
                body: uploadData,
            });
            const { url } = await res.json();
            if (url) finalImageUrl = url;
        }

        const success = await upsert(
            { ...formData, image: finalImageUrl },
            editingId
        );
        if (success) onReset();
    };

    // 2. 準備 Preview 數據 (Live Preview)
    const previewProject = {
        ...formData,
        _id: "preview",
        image: imagePreview || "/image/placeholder.png",
        // 根據選取的 experienceId 搵返公司名
        source:
            experiences.find((e: any) => e._id === formData.experienceId)
                ?.company || "Personal",
        // 對應返 Skill 嘅詳細資料 (Icon, etc)
        techDetails: formData.tech
            .map((name) => allSkills.find((s: any) => s.name === name))
            .filter(Boolean),
    };

    return (
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
            <div className="flex-1">
                <AdminSection
                    title={editingId ? "Edit Project" : "Add New Project"}
                    form={
                        <form
                            onSubmit={handleSubmit}
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
                                value={formData.title}
                                onChange={(v: string) =>
                                    setFormData({ ...formData, title: v })
                                }
                            />
                            <InputField
                                label="Category"
                                value={formData.category}
                                onChange={(v: string) =>
                                    setFormData({ ...formData, category: v })
                                }
                            />

                            <SelectField
                                label="Related Experience"
                                value={formData.experienceId}
                                options={[
                                    "None",
                                    ...experiences.map((e: any) => ({
                                        label: e.company,
                                        value: e._id,
                                    })),
                                ]}
                                onChange={(v: string) =>
                                    setFormData({
                                        ...formData,
                                        experienceId: v === "None" ? "" : v,
                                    })
                                }
                            />

                            <SelectField
                                label="Type"
                                value={formData.type}
                                options={["Work", "Self-Learning"]}
                                onChange={(v: string) =>
                                    setFormData({ ...formData, type: v })
                                }
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
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    tech: prev.tech.includes(
                                                        skill.name
                                                    )
                                                        ? prev.tech.filter(
                                                              (t) =>
                                                                  t !==
                                                                  skill.name
                                                          )
                                                        : [
                                                              ...prev.tech,
                                                              skill.name,
                                                          ],
                                                }))
                                            }
                                            className={`px-3 py-1.5 rounded-lg text-[10px] transition-all border ${
                                                formData.tech.includes(
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

            {/* Sticky Live Preview */}
            <div className="w-full lg:w-[400px] shrink-0">
                <div className="sticky top-24">
                    <p className="text-xs font-mono text-slate-400 uppercase mb-4 tracking-widest italic">
                        Live Preview
                    </p>
                    <ProjectCard project={previewProject} />
                </div>
            </div>
        </div>
    );
}
