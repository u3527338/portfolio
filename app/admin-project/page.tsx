"use client";

import { useState, useEffect } from "react";
import ProjectCard from "../projects/ProjectCard";
import { useProjectForm } from "./useProjectForm";
import { Trash2, Edit3, Plus, Building2 } from "lucide-react";
import {
    InputField,
    ProjectImageUpload,
    SelectField,
} from "@/component/FormElements";

export default function ProjectAdminForm() {
    const [projects, setProjects] = useState<any[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    const {
        formData,
        setFormData,
        loading,
        setLoading,
        availableSkills,
        experiences,
        imagePreview,
        handleFileChange,
        toggleSkill,
    } = useProjectForm();

    const fetchProjects = async () => {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const method = editingId ? "PUT" : "POST";
            const url = editingId
                ? `/api/projects/${editingId}`
                : "/api/projects";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    image: imagePreview || formData.image || "",
                }),
            });

            if (res.ok) {
                alert(editingId ? "Project updated!" : "Project created!");
                resetForm();
                fetchProjects();
            }
        } catch (err) {
            alert("Error saving project");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Confirm delete?")) return;
        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setProjects(projects.filter((p) => p._id !== id));
                alert("Deleted!");
            }
        } catch (err) {
            alert("Delete failed");
        }
    };

    const startEdit = (project: any) => {
        setEditingId(project._id);
        setFormData({
            title: project.title,
            category: project.category,
            type: project.type,
            source: project.source,
            experienceId: project.experienceId || "", // 填返入去
            tech: project.tech,
            description: project.description || "",
            image: project.image || "",
        });
        // 如果有舊圖，可以喺呢度處理預覽邏輯
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({
            title: "",
            category: "",
            type: "Work",
            source: "",
            experienceId: "",
            tech: [],
            description: "",
            image: "",
        });
    };

    const previewProject = {
        _id: "preview",
        title: formData.title || "Project Title",
        category: formData.category || "Category",
        type: formData.type,
        source:
            formData.source ||
            experiences.find((e) => e._id === formData.experienceId)?.company ||
            "Personal",
        size: "small",
        image: imagePreview || formData.image || "/image/placeholder.png",
        tech: formData.tech.length > 0 ? formData.tech : ["React", "Next.js"],
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col gap-12 text-white">
            <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[32px] p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            {editingId ? "Edit Project" : "Create Project"}
                        </h2>
                        {editingId && (
                            <button
                                onClick={resetForm}
                                className="flex items-center gap-2 text-xs text-slate-400 hover:text-white"
                            >
                                <Plus size={14} /> Switch to Create
                            </button>
                        )}
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <div className="md:col-span-2">
                            <ProjectImageUpload
                                preview={imagePreview || formData.image}
                                onFileChange={handleFileChange}
                            />
                        </div>

                        <InputField
                            label="Title"
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

                        {/* 改為 Select 揀公司 */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Building2 size={12} /> Related Experience
                            </label>
                            <select
                                value={formData.experienceId}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        experienceId: e.target.value,
                                    })
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-white appearance-none cursor-pointer"
                            >
                                <option
                                    value=""
                                    className="bg-slate-900 text-slate-400"
                                >
                                    Personal / No Company
                                </option>
                                {experiences.map((exp: any) => (
                                    <option
                                        key={exp._id}
                                        value={exp._id}
                                        className="bg-slate-900"
                                    >
                                        {exp.company}
                                    </option>
                                ))}
                            </select>
                        </div>

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
                                {availableSkills.map((name) => (
                                    <button
                                        key={name}
                                        type="button"
                                        onClick={() => toggleSkill(name)}
                                        className={`px-3 py-1.5 rounded-lg text-[10px] transition-all border ${
                                            formData.tech.includes(name)
                                                ? "bg-blue-600 border-blue-400 text-white shadow-lg"
                                                : "bg-white/5 border-white/10 text-slate-400"
                                        }`}
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="md:col-span-2 mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-xl transition-all"
                        >
                            {loading
                                ? "Processing..."
                                : editingId
                                ? "Update Project"
                                : "Create Project"}
                        </button>
                    </form>
                </div>

                <div className="w-full lg:w-[400px] flex flex-col gap-6">
                    <div className="sticky top-24">
                        <label className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4 block">
                            Live Preview
                        </label>
                        <div className="w-full max-w-[400px]">
                            <ProjectCard project={previewProject} />
                        </div>
                    </div>
                </div>
            </div>

            {/* 下方管理列表 */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[32px] p-8">
                <h3 className="text-xl font-bold mb-6">Existing Projects</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 text-slate-400 text-xs font-mono">
                                <th className="pb-4 px-4">Project</th>
                                <th className="pb-4 px-4">Company</th>
                                <th className="pb-4 px-4 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((p) => (
                                <tr
                                    key={p._id}
                                    className="border-b border-white/5 group hover:bg-white/5 transition-colors"
                                >
                                    <td className="py-4 px-4">{p.title}</td>
                                    <td className="py-4 px-4 text-slate-400">
                                        {p.source || "Personal"}
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => startEdit(p)}
                                                className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                            >
                                                <Edit3 size={16} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(p._id)
                                                }
                                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
