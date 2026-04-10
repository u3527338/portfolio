"use client";

import ProjectCard from "../projects/ProjectCard";
import { InputField, ProjectImageUpload, SelectField } from "./FormElements";
import { useProjectForm } from "./useProjectForm";

export default function AddProjectForm() {
    const {
        formData,
        setFormData,
        loading,
        setLoading,
        availableSkills,
        selectedFile,
        imagePreview,
        handleFileChange,
        toggleSkill,
    } = useProjectForm();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    image: imagePreview || "",
                }),
            });
            if (res.ok) alert("Project created!");
        } catch (err) {
            alert("Error saving project");
        } finally {
            setLoading(false);
        }
    };

    // 模擬一個 Project Object 傳給 ProjectCard 預覽
    const previewProject = {
        _id: "preview",
        title: formData.title || "Project Title",
        category: formData.category || "Category",
        type: formData.type,
        source: formData.source,
        size: "small", // 預覽用細 size 先
        image: imagePreview || "/image/placeholder.png",
        tech: formData.tech.length > 0 ? formData.tech : ["React", "Next.js"],
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-12 text-white">
            {/* 左邊：編輯 Form */}
            <div className="flex-1 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[32px] p-8">
                <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Create Project
                </h2>

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
                    <InputField
                        label="Source"
                        value={formData.source}
                        onChange={(v: string) =>
                            setFormData({ ...formData, source: v })
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
                            {availableSkills.map((name) => (
                                <button
                                    key={name}
                                    type="button"
                                    onClick={() => toggleSkill(name)}
                                    className={`px-3 py-1.5 rounded-lg text-[10px] transition-all border ${
                                        formData.tech.includes(name)
                                            ? "bg-blue-600 border-blue-400 text-white"
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
                        {loading ? "Saving..." : "Create Project"}
                    </button>
                </form>
            </div>

            {/* 右邊：即時預覽 */}
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
    );
}
